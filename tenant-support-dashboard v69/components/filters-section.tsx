"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Search, X } from "lucide-react"

const LOCATIONS = [
  { value: "מטבח", label: "מטבח" },
  { value: "סלון", label: "סלון" },
  { value: "חדר שינה", label: "חדר שינה" },
  { value: "חדר רחצה", label: "חדר רחצה" },
  { value: "כניסה", label: "כניסה" },
  { value: "כל הדירה", label: "כל הדירה" },
]

const ISSUE_TYPES = [
  { value: "אינסטלציה", label: "אינסטלציה" },
  { value: "חשמל", label: "חשמל" },
  { value: "קירות", label: "קירות" },
  { value: "נגרות", label: "נגרות" },
  { value: "מיזוג אוויר", label: "מיזוג אוויר" },
]

const PROJECTS = [
  { value: "מגדלי הים התיכון", label: "מגדלי הים התיכון" },
  { value: "פסגות ירושלים", label: "פסגות ירושלים" },
  { value: "נווה צדק החדשה", label: "נווה צדק החדשה" },
  { value: "גני תקווה הירוקה", label: "גני תקווה הירוקה" },
]

interface FiltersState {
  projectName: string
  issueType: string
  location: string
}

interface FiltersSectionProps {
  onSearch: (query: string, category: string) => void
  onFilterChange: (filters: FiltersState) => void
}

export function FiltersSection({ onSearch, onFilterChange }: FiltersSectionProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [filters, setFilters] = useState<FiltersState>({
    projectName: "",
    issueType: "",
    location: "",
  })

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    onSearch(query, "all")
  }

  const handleFilterChange = (key: keyof FiltersState, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleClearFilters = () => {
    const resetFilters = {
      projectName: "",
      issueType: "",
      location: "",
    }
    setFilters(resetFilters)
    setSearchQuery("")
    onFilterChange(resetFilters)
    onSearch("", "all")
  }

  const hasActiveFilters = Object.values(filters).some(Boolean) || searchQuery

  return (
    <Card className="bg-white p-4 rounded-lg shadow-sm border">
      <div className="space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            <Input
              placeholder="חיפוש..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="pr-10 text-right"
              dir="rtl"
            />
          </div>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClearFilters}
              className="text-destructive hover:text-destructive hover:bg-destructive/10"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <Select value={filters.projectName} onValueChange={(value) => handleFilterChange("projectName", value)}>
            <SelectTrigger className="text-right" dir="rtl">
              <SelectValue placeholder="שם פרויקט" />
            </SelectTrigger>
            <SelectContent side="bottom" position="popper" align="end" className="min-w-[200px]" dir="rtl">
              {PROJECTS.map((project) => (
                <SelectItem key={project.value} value={project.value} className="text-right">
                  {project.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.issueType} onValueChange={(value) => handleFilterChange("issueType", value)}>
            <SelectTrigger className="text-right" dir="rtl">
              <SelectValue placeholder="סוג תקלה" />
            </SelectTrigger>
            <SelectContent side="bottom" position="popper" align="end" className="min-w-[200px]" dir="rtl">
              {ISSUE_TYPES.map((issue) => (
                <SelectItem key={issue.value} value={issue.value} className="text-right">
                  {issue.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.location} onValueChange={(value) => handleFilterChange("location", value)}>
            <SelectTrigger className="text-right" dir="rtl">
              <SelectValue placeholder="מיקום" />
            </SelectTrigger>
            <SelectContent side="bottom" position="popper" align="end" className="min-w-[200px]" dir="rtl">
              {LOCATIONS.map((location) => (
                <SelectItem key={location.value} value={location.value} className="text-right">
                  {location.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </Card>
  )
}

