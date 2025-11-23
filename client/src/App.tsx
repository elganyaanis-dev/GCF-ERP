import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import NotFound from "@/pages/not-found";
import Landing from "@/pages/landing";
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
import { useAuth } from "@/hooks/useAuth";

function AuthRouter() {
  const { isAuthenticated, isLoading } = useAuth();

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
    <SidebarProvider style={style as React.CSSProperties}>
      <div className="flex h-screen w-full">
        <AppSidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          <header className="flex items-center justify-between p-4 border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
            <SidebarTrigger data-testid="button-sidebar-toggle" />
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">
                Rail Electr ERP
              </span>
            </div>
          </header>
          <main className="flex-1 overflow-auto">
            <Switch>
              <Route path="/" component={Dashboard} />
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
              <Route component={NotFound} />
            </Switch>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthRouter />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}
