import { Switch, Route, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useAuth } from "@/hooks/useAuth";
import { AdminChat } from "@/components/admin-chat";

// Pages
import Landing from "@/pages/landing";
import ERPSelector from "@/pages/erp-selector";
import ERPDashboard from "@/pages/erp-dashboard";
import ERPEmployees from "@/pages/erp-employees";
import ERPProjects from "@/pages/erp-projects";
import ERPDocuments from "@/pages/erp-documents";
import ERPPayroll from "@/pages/erp-payroll";
import ERPOrganization from "@/pages/erp-organization";
import ERPSettings from "@/pages/erp-settings";
import ERPTenders from "@/pages/erp-tenders";
import AdminConsole from "@/pages/admin-console";
import NotFound from "@/pages/not-found";

export const ERP_CONFIG: Record<string, { id: string; name: string; subtitle: string; color: string; logo: string }> = {
  gcf: {
    id: "gcf",
    name: "GCF SPA ALGÉRIE",
    subtitle: "Holding Principal",
    color: "from-blue-600 to-blue-800",
    logo: "channels4_profile_1763910974831.jpg",
  },
  railelectr: {
    id: "railelectr",
    name: "RAILELECTR SPA",
    subtitle: "Électrification Ferroviaire",
    color: "from-yellow-600 to-yellow-800",
    logo: "IMG_20251123_161512_1763910974884.png",
  },
  infrarail: {
    id: "infrarail",
    name: "INFRARAIL SPA",
    subtitle: "Infrastructures Ferroviaires",
    color: "from-orange-600 to-orange-800",
    logo: "IMG_20251123_161512_1763910974884.png",
  },
  infrafer: {
    id: "infrafer",
    name: "INFRAFER EPE",
    subtitle: "Transport & Logistique",
    color: "from-green-600 to-green-800",
    logo: "IMG_20251123_161512_1763910974884.png",
  },
  setirail: {
    id: "setirail",
    name: "SETIRAIL SPA",
    subtitle: "Ingénierie Ferroviaire",
    color: "from-purple-600 to-purple-800",
    logo: "IMG_20251123_161512_1763910974884.png",
  },
};

export const TENDER_PLATFORMS = [
  { name: "DZ Tenders", url: "https://www.dztenders.com/fr/" },
  { name: "DZ Marchés", url: "https://dzmarches.net/" },
  { name: "Tenders-360", url: "https://www.tenders-360.com/" },
  { name: "SmartMarchés", url: "https://smartmarches.com/SmartPlus/" },
  { name: "MS Marchés", url: "https://www.msmarches.com/" },
  { name: "TopTenders", url: "https://www.toptenderspro.com/" },
  { name: "Algérie Marchés", url: "https://algeriemarches.dz/" },
];

function AuthRouter() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const [location] = useLocation();
  const [selectedERP, setSelectedERP] = useState<string | null>(() =>
    sessionStorage.getItem("selected_erp")
  );

  // Auto-redirect from "/" to ERP selector
  useEffect(() => {
    if (!selectedERP && location === "/" && !isLoading && isAuthenticated) {
      sessionStorage.removeItem("selected_erp");
      setSelectedERP(null);
    }
  }, [location, isLoading, isAuthenticated, selectedERP]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 to-slate-800">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Landing />;
  }

  // Show ERP selector if no ERP selected
  if (!selectedERP) {
    return (
      <ERPSelector
        onSelectERP={(erp) => {
          sessionStorage.setItem("selected_erp", erp);
          setSelectedERP(erp);
        }}
      />
    );
  }

  return (
    <Switch>
      <Route path="/dashboard" component={ERPDashboard} />
      <Route path="/employees" component={ERPEmployees} />
      <Route path="/projects" component={ERPProjects} />
      <Route path="/documents" component={ERPDocuments} />
      <Route path="/payroll" component={ERPPayroll} />
      <Route path="/organization" component={ERPOrganization} />
      <Route path="/tenders" component={ERPTenders} />
      <Route path="/settings" component={ERPSettings} />
      <Route path="/admin" component={AdminConsole} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthRouter />
        <AdminChat />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
