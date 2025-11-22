import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
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
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertFormationSchema, type InsertFormation } from "@shared/schema";
import { Plus, GraduationCap, Users, Calendar, MapPin } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function Formations() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();

  const { data: formations, isLoading } = useQuery({
    queryKey: ["/api/formations"],
  });

  const form = useForm<InsertFormation>({
    resolver: zodResolver(insertFormationSchema),
    defaultValues: {
      title: "",
      description: "",
      instructor: "",
      location: "",
      status: "upcoming",
      category: "technical",
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: InsertFormation) => {
      await apiRequest("POST", "/api/formations", data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/formations"] });
      toast({
        title: "Succès",
        description: "Formation créée avec succès",
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

  if (isLoading) {
    return (
      <div className="p-8 space-y-6">
        <Skeleton className="h-12 w-64" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className="h-64 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold text-foreground mb-2" data-testid="heading-formations">
            Catalogue des Formations
          </h1>
          <p className="text-muted-foreground">
            {formations?.length || 0} formation(s) disponible(s)
          </p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button data-testid="button-add-formation">
              <Plus className="h-4 w-4 mr-2" />
              Nouvelle formation
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Créer une formation</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit((data) => createMutation.mutate(data))} className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Titre</FormLabel>
                      <FormControl>
                        <Input {...field} data-testid="input-title" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} rows={3} data-testid="textarea-description" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="instructor"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Formateur</FormLabel>
                        <FormControl>
                          <Input {...field} data-testid="input-instructor" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Catégorie</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-category">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="technical">Technique</SelectItem>
                            <SelectItem value="management">Management</SelectItem>
                            <SelectItem value="safety">Sécurité</SelectItem>
                            <SelectItem value="compliance">Conformité</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date début</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} data-testid="input-start-date" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date fin</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} data-testid="input-end-date" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lieu</FormLabel>
                        <FormControl>
                          <Input {...field} data-testid="input-location" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="capacity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Capacité</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={(e) => field.onChange(parseInt(e.target.value))} data-testid="input-capacity" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end gap-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setDialogOpen(false)}>
                    Annuler
                  </Button>
                  <Button type="submit" disabled={createMutation.isPending} data-testid="button-submit-formation">
                    {createMutation.isPending ? "Création..." : "Créer"}
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Formations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {formations?.length === 0 ? (
          <Card className="col-span-full">
            <CardContent className="p-12 text-center">
              <GraduationCap className="h-16 w-16 mx-auto mb-4 text-muted-foreground opacity-20" />
              <p className="text-muted-foreground">Aucune formation disponible</p>
            </CardContent>
          </Card>
        ) : (
          formations?.map((formation: any) => (
            <Card key={formation.id} className="hover-elevate active-elevate-2 transition-all" data-testid={`card-formation-${formation.id}`}>
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <Badge variant={
                    formation.status === "ongoing" ? "default" :
                    formation.status === "completed" ? "secondary" :
                    formation.status === "cancelled" ? "destructive" :
                    "outline"
                  }>
                    {formation.status === "ongoing" ? "En cours" :
                     formation.status === "completed" ? "Terminée" :
                     formation.status === "cancelled" ? "Annulée" : "À venir"}
                  </Badge>
                  <Badge variant="outline" className="capitalize">
                    {formation.category === "technical" ? "Technique" :
                     formation.category === "management" ? "Management" :
                     formation.category === "safety" ? "Sécurité" : "Conformité"}
                  </Badge>
                </div>
                <CardTitle className="text-lg leading-tight">
                  {formation.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {formation.description}
                </p>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <GraduationCap className="h-4 w-4" />
                    <span>{formation.instructor}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {format(new Date(formation.startDate), "dd MMM", { locale: fr })} -{" "}
                      {format(new Date(formation.endDate), "dd MMM yyyy", { locale: fr })}
                    </span>
                  </div>
                  {formation.location && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{formation.location}</span>
                    </div>
                  )}
                </div>

                <div className="pt-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-muted-foreground flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Inscriptions
                    </span>
                    <span className="text-sm font-medium">
                      {formation.enrolled || 0} / {formation.capacity || 0}
                    </span>
                  </div>
                  <Progress 
                    value={formation.capacity ? ((formation.enrolled || 0) / formation.capacity) * 100 : 0} 
                    className="h-2"
                  />
                </div>

                <Button className="w-full" variant="outline" size="sm" data-testid={`button-enroll-${formation.id}`}>
                  S'inscrire
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
