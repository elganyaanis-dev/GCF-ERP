import { 
  LayoutDashboard, 
  Users, 
  FolderKanban, 
  FileText, 
  BarChart3, 
  Settings,
  Calendar,
  DollarSign,
  GraduationCap,
  ChevronDown,
  Building2,
  MessageSquare,
  Briefcase,
  MapPin
} from "lucide-react";
import { Link, useLocation } from "wouter";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import railElectrLogo from "@assets/image_1763848297043.png";

export function AppSidebar() {
  const [location] = useLocation();
  const { user } = useAuth();

  const menuItems = [
    {
      title: "Tableau de bord",
      url: "/",
      icon: LayoutDashboard,
    },
    {
      title: "Ressources Humaines",
      icon: Users,
      items: [
        { title: "Employés", url: "/employees", icon: Users },
        { title: "Congés", url: "/leaves", icon: Calendar },
        { title: "Paie", url: "/payroll", icon: DollarSign },
        { title: "Formations", url: "/formations", icon: GraduationCap },
      ],
    },
    {
      title: "Projets",
      url: "/projects",
      icon: FolderKanban,
    },
    {
      title: "Documents",
      url: "/documents",
      icon: FileText,
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: BarChart3,
    },
    {
      title: "Gestion des Missions",
      icon: Briefcase,
      items: [
        { title: "Ordres de Mission", url: "/mission-orders", icon: Briefcase },
        { title: "Déplacements", url: "/travels", icon: MapPin },
      ],
    },
    {
      title: "Messagerie",
      url: "/messaging",
      icon: MessageSquare,
    },
    {
      title: "Organisation",
      icon: Building2,
      items: [
        { title: "Structure de Base", url: "/organization", icon: Building2 },
        { title: "Directions & Services", url: "/org-structure", icon: Building2 },
      ],
    },
    {
      title: "Paramètres",
      url: "/settings",
      icon: Settings,
    },
  ];

  return (
    <Sidebar data-testid="sidebar-main">
      <SidebarHeader className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <img 
            src={railElectrLogo} 
            alt="Rail Electr & GCF" 
            className="h-12 w-auto object-contain"
            data-testid="logo-rail-electr"
          />
        </div>
        <div className="mt-2">
          <h2 className="text-sm font-semibold text-sidebar-foreground">
            ERP Rail Electr
          </h2>
          <p className="text-xs text-muted-foreground">
            Gestion Intégrée
          </p>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                if (item.items) {
                  return (
                    <Collapsible key={item.title} asChild defaultOpen={location.startsWith('/employees') || location.startsWith('/leaves') || location.startsWith('/payroll') || location.startsWith('/formations') || location.startsWith('/mission-orders') || location.startsWith('/travels') || location.startsWith('/organization') || location.startsWith('/org-structure')}>
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton data-testid={`menu-${item.title.toLowerCase().replace(/\s+/g, '-')}`}>
                            <item.icon className="h-5 w-5" />
                            <span>{item.title}</span>
                            <ChevronDown className="ml-auto h-4 w-4 transition-transform duration-200 group-data-[state=open]:rotate-180" />
                          </SidebarMenuButton>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.url}>
                                <SidebarMenuSubButton 
                                  asChild
                                  isActive={location === subItem.url}
                                  data-testid={`submenu-${subItem.title.toLowerCase().replace(/\s+/g, '-')}`}
                                >
                                  <Link href={subItem.url}>
                                    <subItem.icon className="h-4 w-4" />
                                    <span>{subItem.title}</span>
                                  </Link>
                                </SidebarMenuSubButton>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                }

                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton 
                      asChild
                      isActive={location === item.url}
                      data-testid={`menu-${item.title.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <Link href={item.url}>
                        <item.icon className="h-5 w-5" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={user?.profileImageUrl} alt={user?.firstName || "User"} />
            <AvatarFallback className="bg-primary text-primary-foreground">
              {user?.firstName?.[0]}{user?.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-sidebar-foreground truncate" data-testid="text-user-name">
              {user?.firstName} {user?.lastName}
            </p>
            <p className="text-xs text-muted-foreground truncate" data-testid="text-user-email">
              {user?.email}
            </p>
          </div>
        </div>
        <a
          href="/api/logout"
          className="mt-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
          data-testid="link-logout"
        >
          Se déconnecter
        </a>
      </SidebarFooter>
    </Sidebar>
  );
}
