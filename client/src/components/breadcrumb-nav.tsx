import { ChevronRight, Home } from "lucide-react";
import { useLocation } from "wouter";

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
}

export function BreadcrumbNav({ items }: BreadcrumbNavProps) {
  const [, navigate] = useLocation();

  const allItems = [{ label: "Accueil", path: "/dashboard" }, ...items];

  return (
    <div className="flex items-center gap-2 text-sm px-6 py-3 bg-muted/30 border-b">
      {allItems.map((item, idx) => (
        <div key={idx} className="flex items-center gap-2">
          {idx > 0 && <ChevronRight className="w-4 h-4 text-muted-foreground" />}
          <button
            onClick={() => item.path && navigate(item.path)}
            className={`hover:text-foreground transition-colors ${
              item.path ? 'cursor-pointer text-muted-foreground' : 'font-medium text-foreground'
            }`}
            data-testid={`breadcrumb-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {idx === 0 ? <Home className="w-4 h-4" /> : item.label}
          </button>
        </div>
      ))}
    </div>
  );
}
