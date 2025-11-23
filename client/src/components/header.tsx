import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import gcfLogo from "@assets/channels4_profile_1763910974831.jpg";
import railElectrLogo from "@assets/IMG_20251123_161512_1763910974884.png";

export function Header() {
  const { user } = useAuth();
  
  const userName = typeof user === 'object' && user ? (user as any).name : '';
  const userEmail = typeof user === 'object' && user ? (user as any).email : '';
  const userImage = typeof user === 'object' && user ? (user as any).image : '';

  return (
    <header className="flex items-center justify-between px-6 py-4 border-b border-border bg-gradient-to-r from-card/50 via-card/70 to-card/50 backdrop-blur-sm sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <SidebarTrigger data-testid="button-sidebar-toggle" className="hover-elevate" />
        
        {/* Logos Brand Section */}
        <div className="flex items-center gap-3 px-4 py-2 rounded-lg bg-white/5 border border-border/50">
          <img 
            src={railElectrLogo} 
            alt="Rail Electr" 
            className="h-8 w-auto object-contain"
            data-testid="logo-rail-electr"
          />
          <div className="w-px h-6 bg-border/50"></div>
          <img 
            src={gcfLogo} 
            alt="GCF" 
            className="h-7 w-auto object-contain"
            data-testid="logo-gcf"
          />
        </div>

        <div className="ml-2 hidden sm:block">
          <div className="flex flex-col gap-0.5">
            <h1 className="text-lg font-bold bg-gradient-to-r from-emerald-600 to-blue-600 dark:from-emerald-400 dark:to-blue-400 bg-clip-text text-transparent">
              Rail Electr & GCF
            </h1>
            <p className="text-xs text-muted-foreground font-medium">
              Système ERP Intégré
            </p>
          </div>
        </div>
      </div>

      {/* Right Section - User Info */}
      <div className="flex items-center gap-4">
        {user && userName && (
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-muted/30 border border-border/50">
            <Avatar className="h-8 w-8 border border-border/50">
              {userImage && <AvatarImage src={userImage} alt={userName} />}
              <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-blue-500 text-white text-xs">
                {userName.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="hidden md:flex flex-col gap-0.5">
              <p className="text-sm font-medium text-foreground">
                {userName}
              </p>
              <p className="text-xs text-muted-foreground">
                {userEmail}
              </p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
