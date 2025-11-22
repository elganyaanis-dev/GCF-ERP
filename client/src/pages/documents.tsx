import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { FileText, Search, Download, Eye, Upload, File } from "lucide-react";
import { format } from "date-fns";
import { fr } from "date-fns/locale";

export default function Documents() {
  const [searchTerm, setSearchTerm] = useState("");

  const { data: documents, isLoading } = useQuery({
    queryKey: ["/api/documents"],
  });

  const filteredDocuments = documents?.filter((doc: any) =>
    `${doc.name} ${doc.type} ${doc.tags}`.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const getFileIcon = (mimeType: string) => {
    if (mimeType?.includes('pdf')) return '📄';
    if (mimeType?.includes('word') || mimeType?.includes('document')) return '📝';
    if (mimeType?.includes('sheet') || mimeType?.includes('excel')) return '📊';
    if (mimeType?.includes('image')) return '🖼️';
    return '📁';
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

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
          <h1 className="text-3xl font-semibold text-foreground mb-2" data-testid="heading-documents">
            Gestionnaire de Documents
          </h1>
          <p className="text-muted-foreground">
            {documents?.length || 0} document(s) au total
          </p>
        </div>
        <Button data-testid="button-upload-document">
          <Upload className="h-4 w-4 mr-2" />
          Uploader
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Total</p>
                <p className="text-2xl font-bold">{documents?.length || 0}</p>
              </div>
              <FileText className="h-10 w-10 text-blue-500/30" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Contrats</p>
                <p className="text-2xl font-bold">
                  {documents?.filter((d: any) => d.type === 'contract').length || 0}
                </p>
              </div>
              <File className="h-10 w-10 text-green-500/30" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Rapports</p>
                <p className="text-2xl font-bold">
                  {documents?.filter((d: any) => d.type === 'report').length || 0}
                </p>
              </div>
              <FileText className="h-10 w-10 text-purple-500/30" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Archivés</p>
                <p className="text-2xl font-bold">
                  {documents?.filter((d: any) => d.isArchived).length || 0}
                </p>
              </div>
              <File className="h-10 w-10 text-gray-500/30" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher par nom, type, tags..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              data-testid="input-search-documents"
            />
          </div>
        </CardContent>
      </Card>

      {/* Documents Table */}
      <Card>
        <CardHeader>
          <CardTitle>Tous les documents</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Projet</TableHead>
                <TableHead>Taille</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Date upload</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDocuments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    Aucun document trouvé
                  </TableCell>
                </TableRow>
              ) : (
                filteredDocuments.map((document: any) => (
                  <TableRow key={document.id} className="hover-elevate" data-testid={`row-document-${document.id}`}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{getFileIcon(document.mimeType)}</span>
                        <div>
                          <div className="font-medium">{document.name}</div>
                          {document.description && (
                            <div className="text-xs text-muted-foreground line-clamp-1">
                              {document.description}
                            </div>
                          )}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="capitalize">
                        {document.type === "contract" ? "Contrat" :
                         document.type === "invoice" ? "Facture" :
                         document.type === "report" ? "Rapport" :
                         document.type === "policy" ? "Politique" : "Autre"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {document.project?.name || "-"}
                    </TableCell>
                    <TableCell className="text-sm">
                      {formatFileSize(document.fileSize || 0)}
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">v{document.version}</Badge>
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {format(new Date(document.createdAt), "dd MMM yyyy", { locale: fr })}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" data-testid={`button-view-${document.id}`}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline" data-testid={`button-download-${document.id}`}>
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
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
