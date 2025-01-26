import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"

interface SortConfig {
  key: string
  direction: "asc" | "desc"
}

interface SortingControlsProps {
  sortConfig: SortConfig
  onSortChange: (config: SortConfig) => void
}

export function SortingControls({ sortConfig, onSortChange }: SortingControlsProps) {
  const handleSortChange = (key: string) => {
    if (sortConfig.key === key) {
      onSortChange({
        key,
        direction: sortConfig.direction === "asc" ? "desc" : "asc",
      })
    } else {
      onSortChange({ key, direction: "desc" })
    }
  }

  return (
    <div className="flex items-center gap-2" dir="rtl">
      <span className="text-sm text-muted-foreground">מיין לפי:</span>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleSortChange("status")}
        className={sortConfig.key === "status" ? "bg-accent" : ""}
      >
        סטטוס
        <ArrowUpDown className="mr-2 h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleSortChange("warrantyEndDate")}
        className={sortConfig.key === "warrantyEndDate" ? "bg-accent" : ""}
      >
        תאריך סיום אחריות
        <ArrowUpDown className="mr-2 h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleSortChange("submissionDate")}
        className={sortConfig.key === "submissionDate" ? "bg-accent" : ""}
      >
        תאריך פתיחה
        <ArrowUpDown className="mr-2 h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => handleSortChange("urgencyLevel")}
        className={sortConfig.key === "urgencyLevel" ? "bg-accent" : ""}
      >
        דחיפות
        <ArrowUpDown className="mr-2 h-4 w-4" />
      </Button>
    </div>
  )
}

