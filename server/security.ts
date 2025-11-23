import { Request, Response, NextFunction } from "express";

// RBAC Levels
export const RBAC_LEVELS = {
  USER: 0,
  MANAGER: 1,
  ADMIN: 2,
  DIRECTOR: 3,
  CEO: 4,
  SUPREME_ADMIN: 5,
};

// Authentication middleware
export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;
  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
};

// RBAC middleware
export const requireAccreditation = (level: number) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    if ((user.accreditationLevel || 0) < level) {
      return res.status(403).json({ error: "Insufficient permissions" });
    }
    next();
  };
};

// Supreme Admin only
export const requireSupremeAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;
  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  if (user.email !== "elganya.anis@gmail.com") {
    return res.status(403).json({ error: "Supreme admin access required" });
  }
  next();
};

// Subsidiary isolation - ensure user can only access their subsidiary's data
export const requireSubsidiaryAccess = (req: Request, res: Response, next: NextFunction) => {
  const user = (req as any).user;
  const subsidiaryId = req.params.subsidiaryId || req.query.subsidiaryId;

  if (!user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Supreme admin can access any subsidiary
  if (user.email === "elganya.anis@gmail.com") {
    return next();
  }

  // Check if user belongs to this subsidiary
  if (user.subsidiaryId !== subsidiaryId) {
    return res.status(403).json({ error: "Access denied to this subsidiary" });
  }

  next();
};

// Audit logging helper
export const logAction = async (
  action: string,
  userId: string,
  subsidiaryId: string,
  details: any
) => {
  console.log(`[AUDIT] ${new Date().toISOString()} - Action: ${action}, User: ${userId}, Subsidiary: ${subsidiaryId}`, details);
  // In production, store in database
};
