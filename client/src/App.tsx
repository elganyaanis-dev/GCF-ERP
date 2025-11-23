import { Switch, Route } from "wouter";
import { useState, useEffect } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Header } from "@/components/header";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
import SubsidiarySelector from "@/pages/subsidiary-selector";
import Dashboard from "@/pages/dashboard";
import Employees from "@/pages/employees";
import Leaves from "@/pages/leaves";
import Payroll from "@/pages/payroll";
import Formations from "@/pages/formations";
import Projects from "@/pages/projects";
import Documents from "@/pages/documents";
import Analytics from "@/pages/analytics";
import Settings from "@/pages/settings";
import Messaging from "@/pages/messaging";
import MissionOrders from "@/pages/mission-orders";
import Travels from "@/pages/travels";
import Organization from "@/pages/organization";
import OrgStructure from "@/pages/org-structure";
import ERPCommunications from "@/pages/erp-communications";
import AdminConsole from "@/pages/admin-console";
import Subsidiaries from "@/pages/subsidiaries";
import { useAuth } from "@/hooks/useAuth";
import { SubsidiaryContext } from "@/hooks/useSubsidiary";
import { AdminChat } from "@/components/admin-chat";

function AuthRouter() {
  const { isAuthenticated, isLoading, user } = useAuth();
  const [subsidiaryId, setSubsidiaryId] = useState<string>("gcf");

  useEffect(() => {
    if (user && (user as any)?.subsidiary_id) {
      setSubsidiaryId((user as any).subsidiary_id);
    }
  }, [user]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Landing />;
  }

  // Custom sidebar width for ERP application
  const style = {
    "--sidebar-width": "20rem",
    "--sidebar-width-icon": "4rem",
  };

  return (
    <SubsidiaryContext.Provider value={{ subsidiary_id: subsidiaryId }}>
      <SidebarProvider style={style as React.CSSProperties}>
        <div className="flex h-screen w-full">
          <AppSidebar />
          <div className="flex flex-col flex-1 overflow-hidden">
            <Header />
            <main className="flex-1 overflow-auto">
              <Switch>
                <Route path="/select" component={SubsidiarySelector} />
                <Route path="/" component={Dashboard} />
                <Route path="/subsidiaries" component={Subsidiaries} />
                <Route path="/employees" component={Employees} />
                <Route path="/leaves" component={Leaves} />
                <Route path="/payroll" component={Payroll} />
                <Route path="/formations" component={Formations} />
                <Route path="/projects" component={Projects} />
                <Route path="/documents" component={Documents} />
                <Route path="/analytics" component={Analytics} />
                <Route path="/settings" component={Settings} />
                <Route path="/messaging" component={Messaging} />
                <Route path="/mission-orders" component={MissionOrders} />
                <Route path="/travels" component={Travels} />
                <Route path="/organization" component={Organization} />
                <Route path="/org-structure" component={OrgStructure} />
                <Route path="/erp-communications" component={ERPCommunications} />
                <Route path="/admin-console" component={AdminConsole} />
                <Route component={NotFound} />
              </Switch>
            </main>
          </div>
        </div>
      </SidebarProvider>
    </SubsidiaryContext.Provider>
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
