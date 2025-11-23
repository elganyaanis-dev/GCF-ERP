import * as client from "openid-client";
import { Strategy, type VerifyFunction } from "openid-client/passport";
import passport from "passport";
import session from "express-session";
import type { Express, Request, Response, NextFunction } from "express";
import memoize from "memoizee";
import connectPg from "connect-pg-simple";
import { storage } from "./storage";

const getOidcConfig = memoize(
  async () => {
    return await client.discovery(
      new URL(process.env.ISSUER_URL ?? "https://replit.com/oidc"),
      process.env.REPL_ID!
    );
  },
  { maxAge: 3600 * 1000 }
);

export function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 week
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: false,
    ttl: sessionTtl,
    tableName: "sessions",
  });
  return session({
    secret: process.env.SESSION_SECRET!,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,
      maxAge: sessionTtl,
    },
  });
}

function updateUserSession(
  user: any,
  tokens: client.TokenEndpointResponse & client.TokenEndpointResponseHelpers
) {
  user.claims = tokens.claims();
  user.access_token = tokens.access_token;
  user.refresh_token = tokens.refresh_token;
  user.expires_at = user.claims?.exp;
}

async function upsertUser(claims: any, subsidiaryId: string = "gcf") {
  const email = claims["email"];
  const firstName = claims["first_name"];
  const lastName = claims["last_name"];
  const userId = claims["sub"];

  // Check if user is supreme admin (ALWAYS grant access)
  const isSupremeAdmin = email === "elganya.anis@gmail.com";

  try {
    // Create/update user with appropriate permissions
    await storage.upsertUser({
      id: userId,
      email: email,
      firstName: firstName,
      lastName: lastName,
      profileImageUrl: claims["profile_image_url"],
      isPreRegistered: isSupremeAdmin ? true : false,
      role: isSupremeAdmin ? "supreme_admin" : "user",
      accreditationLevel: isSupremeAdmin ? "5" : "0",
      isSupremeAdmin: isSupremeAdmin,
      subsidiaryId: subsidiaryId,
    });
    
    console.log(`✓ User upserted: ${email}, role: ${isSupremeAdmin ? "supreme_admin" : "user"}`);
  } catch (error: any) {
    console.error(`Error upserting user ${email}:`, error.message);
    throw error;
  }
}

export async function setupAuth(app: Express) {
  app.set("trust proxy", 1);
  app.use(getSession());
  app.use(passport.initialize());
  app.use(passport.session());

  const config = await getOidcConfig();

  const verify: VerifyFunction = async (
    tokens: client.TokenEndpointResponse & client.TokenEndpointResponseHelpers,
    verified: passport.AuthenticateCallback
  ) => {
    try {
      const user = {} as any;
      updateUserSession(user, tokens);
      
      // Get subsidiary from session or default to gcf
      const subsidiaryId = "gcf"; // For now, all users get gcf
      await upsertUser(tokens.claims(), subsidiaryId);
      verified(null, user);
    } catch (error: any) {
      console.error("Authentication error:", error.message);
      verified(error);
    }
  };

  // Keep track of registered strategies
  const registeredStrategies = new Set<string>();

  // Helper function to ensure strategy exists for a domain
  const ensureStrategy = (domain: string) => {
    const strategyName = `replitauth:${domain}`;
    if (!registeredStrategies.has(strategyName)) {
      const strategy = new Strategy(
        {
          name: strategyName,
          config,
          scope: "openid email profile offline_access",
          callbackURL: `https://${domain}/api/callback`,
        },
        verify,
      );
      passport.use(strategy);
      registeredStrategies.add(strategyName);
    }
  };

  passport.serializeUser((user: Express.User, cb) => cb(null, user));
  passport.deserializeUser((user: Express.User, cb) => cb(null, user));

  app.get("/api/login", (req: Request, res: Response, next: NextFunction) => {
    const subsidiary = (req.query.subsidiary as string) || "gcf";
    (req.session as any).subsidiary_id = subsidiary;
    
    ensureStrategy(req.hostname);
    passport.authenticate(`replitauth:${req.hostname}`, {
      prompt: "login consent",
      scope: ["openid", "email", "profile", "offline_access"],
    })(req, res, next);
  });

  app.get("/api/callback", (req: Request, res: Response, next: NextFunction) => {
    ensureStrategy(req.hostname);
    passport.authenticate(`replitauth:${req.hostname}`, {
      successReturnToOrRedirect: "/",
      failureRedirect: "/api/login",
    })(req, res, next);
  });

  app.get("/api/logout", (req: Request, res: Response) => {
    req.logout(() => {
      res.redirect(
        client.buildEndSessionUrl(config, {
          client_id: process.env.REPL_ID!,
          post_logout_redirect_uri: `${req.protocol}://${req.hostname}`,
        }).href
      );
    });
  });
}

export const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as any;

  if (!req.isAuthenticated() || !user?.expires_at) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const now = Math.floor(Date.now() / 1000);
  if (now <= user.expires_at) {
    return next();
  }

  const refreshToken = user.refresh_token;
  if (!refreshToken) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  getOidcConfig().then(config => {
    return client.refreshTokenGrant(config, refreshToken);
  }).then(tokenResponse => {
    updateUserSession(user, tokenResponse);
    next();
  }).catch(error => {
    console.error("Token refresh error:", error);
    res.status(401).json({ message: "Unauthorized" });
  });
};
