import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertPayrollSchema, type InsertPayroll } from "@shared/schema";
import { Plus, DollarSign, Download } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function Payroll() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const { data: payrolls, isLoading } = useQuery({
    queryKey: ["/api/payroll"],
  });

  const { data: employees } = useQuery({
    queryKey: ["/api/employees"],
  });

  const form = useForm<InsertPayroll>({
    resolver: zodResolver(insertPayrollSchema),
    defaultValues: {
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      baseSalary: "0",
      bonus: "0",
      deductions: "0",
      netSalary: "0",
      status: "draft",
      notes: "",
    },
  });

  const baseSalary = form.watch("baseSalary");
  const bonus = form.watch("bonus");
  const deductions = form.watch("deductions");

  // Calculate net salary automatically
  const netSalary = (parseFloat(baseSalary || "0") + parseFloat(bonus || "0") - parseFloat(deductions || "0")).toFixed(2);
  if (form.getValues("netSalary") !== netSalary) {
    form.setValue("netSalary", netSalary);
  }

  const createMutation = useMutation({
    mutationFn: async (data: InsertPayroll) => {
      await apiRequest("POST", "/api/payroll", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/payroll"] });
      toast({
        title: "Succès",
        description: "Bulletin de paie créé",
      });
      setDialogOpen(false);
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        title: "Erreur",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const months = [
    "Janvier", "Février", "Mars", "Avril", "Mai", "Juin",
    "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"
  ];

  if (isLoading) {
    return (
      <div className="p-8 space-y-6">
        <Skeleton className="h-12 w-64" />
        <Card>
          <CardContent className="p-6">
            {[...Array(5)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full mb-2" />
            ))}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground mb-2" data-testid="heading-payroll">
            Gestion de la Paie
          </h1>
          <p className="text-muted-foreground">
            {payrolls?.length || 0} bulletin(s) au total
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-add-payroll">
              <Plus className="h-4 w-4 mr-2" />
              Nouveau bulletin
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Créer un bulletin de paie</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit((data) => createMutation.mutate(data))} className="space-y-4">
                <FormField
                  control={form.control}
                  name="employeeId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Employé</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-employee">
                            <SelectValue placeholder="Sélectionner un employé" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {employees?.map((emp: any) => (
                            <SelectItem key={emp.id} value={emp.id}>
                              {emp.firstName} {emp.lastName}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="month"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mois</FormLabel>
                        <Select onValueChange={(value) => field.onChange(parseInt(value))} defaultValue={field.value?.toString()}>
                          <FormControl>
                            <SelectTrigger data-testid="select-month">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {months.map((month, index) => (
                              <SelectItem key={index} value={(index + 1).toString()}>
                                {month}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="year"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Année</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} data-testid="input-year" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="baseSalary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salaire de base (GNF)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} data-testid="input-base-salary" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bonus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Primes (GNF)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} data-testid="input-bonus" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="deductions"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Déductions (GNF)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} data-testid="input-deductions" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="netSalary"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Salaire net (GNF)</FormLabel>
                      <FormControl>
                        <Input {...field} disabled className="font-bold" data-testid="input-net-salary" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={2} data-testid="textarea-notes" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button type="submit" disabled={createMutation.isPending} data-testid="button-submit-payroll">
                    {createMutation.isPending ? "Création..." : "Créer"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total versé ce mois</p>
                <p className="text-2xl font-bold text-foreground">
                  {(payrolls?.filter((p: any) => p.month === new Date().getMonth() + 1 && p.year === new Date().getFullYear() && p.status === "paid")
                    .reduce((acc: number, p: any) => acc + parseFloat(p.netSalary || "0"), 0) || 0).toLocaleString()} GNF
                </p>
              </div>
              <DollarSign className="h-12 w-12 text-green-500/30" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">En attente</p>
                <p className="text-2xl font-bold text-foreground">
                  {payrolls?.filter((p: any) => p.status === "draft").length || 0}
                </p>
              </div>
              <Badge variant="secondary" className="text-lg px-4 py-2">Brouillons</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Traités ce mois</p>
                <p className="text-2xl font-bold text-foreground">
                  {payrolls?.filter((p: any) => p.month === new Date().getMonth() + 1 && p.status !== "draft").length || 0}
                </p>
              </div>
              <Badge className="text-lg px-4 py-2">Payés</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payroll Table */}
      <Card>
        <CardHeader>
          <CardTitle>Bulletins de paie</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employé</TableHead>
                <TableHead>Période</TableHead>
                <TableHead>Salaire de base</TableHead>
                <TableHead>Primes</TableHead>
                <TableHead>Déductions</TableHead>
                <TableHead>Net à payer</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payrolls?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    Aucun bulletin de paie
                  </TableCell>
                </TableRow>
              ) : (
                payrolls?.map((payroll: any) => (
                  <TableRow key={payroll.id} className="hover-elevate" data-testid={`row-payroll-${payroll.id}`}>
                    <TableCell className="font-medium">
                      {payroll.employee?.firstName} {payroll.employee?.lastName}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {months[payroll.month - 1]} {payroll.year}
                    </TableCell>
                    <TableCell>{parseFloat(payroll.baseSalary).toLocaleString()} GNF</TableCell>
                    <TableCell className="text-green-600">
                      +{parseFloat(payroll.bonus).toLocaleString()} GNF
                    </TableCell>
                    <TableCell className="text-red-600">
                      -{parseFloat(payroll.deductions).toLocaleString()} GNF
                    </TableCell>
                    <TableCell className="font-bold">
                      {parseFloat(payroll.netSalary).toLocaleString()} GNF
                    </TableCell>
                    <TableCell>
                      <Badge variant={
                        payroll.status === "paid" ? "default" :
                        payroll.status === "processed" ? "secondary" :
                        "outline"
                      }>
                        {payroll.status === "paid" ? "Payé" :
                         payroll.status === "processed" ? "Traité" : "Brouillon"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline" data-testid={`button-download-${payroll.id}`}>
                        <Download className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
