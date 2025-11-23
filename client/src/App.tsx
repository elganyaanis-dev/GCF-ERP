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
import ERPCommunications from "@/pages/erp-communications";
import ERPTimesheet from "@/pages/erp-timesheet";
import ERPInventory from "@/pages/erp-inventory";
import ERPContracts from "@/pages/erp-contracts";
import ERPReports from "@/pages/erp-reports";
import AdminConsole from "@/pages/admin-console";
import NotFound from "@/pages/not-found";

function Router() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const [location, navigate] = useLocation();
  const [selectedERP, setSelectedERP] = useState<string | null>(() =>
    typeof window !== "undefined" ? sessionStorage.getItem("selected_erp") : null
  );

  // Listen to sessionStorage changes (for when user clicks "Change ERP")
  useEffect(() => {
    const handleStorageChange = () => {
      const stored = sessionStorage.getItem("selected_erp");
      setSelectedERP(stored);
      if (!stored) {
        navigate("/");
      }
    };

    window.addEventListener("storage", handleStorageChange);
    
    // Also check periodically in case storage changes in same tab
    const interval = setInterval(() => {
      const stored = sessionStorage.getItem("selected_erp");
      if (!stored && selectedERP) {
        setSelectedERP(null);
        navigate("/");
      }
    }, 500);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, [navigate, selectedERP]);

  // Auto-navigate to dashboard when ERP is selected
  useEffect(() => {
    const validPaths = ["/dashboard", "/employees", "/projects", "/documents", "/payroll", "/organization", 
                       "/tenders", "/settings", "/communications", "/timesheet", "/inventory", "/contracts", 
                       "/reports", "/admin"];
    if (selectedERP && !validPaths.some(path => location.includes(path))) {
      navigate("/dashboard");
    }
  }, [selectedERP, navigate, location]);

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
        onSelectERP={(erp: string) => {
          sessionStorage.setItem("selected_erp", erp);
          setSelectedERP(erp);
        }}
      />
    );
  }

  return (
    <Switch>
      <Route path="/" component={() => <ERPSelector onSelectERP={(erp: string) => { sessionStorage.setItem("selected_erp", erp); setSelectedERP(erp); }} />} />
      <Route path="/dashboard" component={ERPDashboard} />
      <Route path="/employees" component={ERPEmployees} />
      <Route path="/projects" component={ERPProjects} />
      <Route path="/documents" component={ERPDocuments} />
      <Route path="/payroll" component={ERPPayroll} />
      <Route path="/organization" component={ERPOrganization} />
      <Route path="/tenders" component={ERPTenders} />
      <Route path="/settings" component={ERPSettings} />
      <Route path="/communications" component={ERPCommunications} />
      <Route path="/timesheet" component={ERPTimesheet} />
      <Route path="/inventory" component={ERPInventory} />
      <Route path="/contracts" component={ERPContracts} />
      <Route path="/reports" component={ERPReports} />
      <Route path="/admin" component={AdminConsole} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
        <AdminChat />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
