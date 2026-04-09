import { Card } from "@/components/ui/card";
import { Presentation, Table, PenTool, Shapes, FileText, Blocks, Code, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  presentation: Presentation,
  table: Table,
  "pen-tool": PenTool,
  shapes: Shapes,
  "file-text": FileText,
  blocks: Blocks,
  code: Code,
};

interface CourseCardProps {
  name: string;
  icon: string;
  description?: string;
  selected?: boolean;
  onSelect?: () => void;
  selectable?: boolean;
}

export const CourseCard = ({ name, icon, description, selected, onSelect, selectable }: CourseCardProps) => {
  const Icon = iconMap[icon] || FileText;

  return (
    <Card
      className={cn(
        "p-6 transition-all duration-200 cursor-default",
        selectable && "cursor-pointer hover:shadow-hover hover:border-primary/40",
        selected && "border-primary bg-accent shadow-hover ring-2 ring-primary/20"
      )}
      onClick={selectable ? onSelect : undefined}
    >
      <div className="flex items-start gap-4">
        <div className={cn(
          "w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors",
          selected ? "bg-gradient-primary text-primary-foreground" : "bg-accent text-primary"
        )}>
          <Icon className="w-6 h-6" />
        </div>
        <div className="space-y-1">
          <h3 className="font-semibold text-card-foreground">{name}</h3>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      </div>
      {selectable && selected && (
        <div className="mt-3 text-xs font-medium text-primary">✓ Selected</div>
      )}
    </Card>
  );
};