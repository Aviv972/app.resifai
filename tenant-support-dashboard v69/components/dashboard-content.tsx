"use client"

import { useState } from "react"
import { DashboardCards } from "@/components/dashboard-cards"
import { RequestsTable } from "@/components/requests-table"
import { SortingControls } from "@/components/sorting-controls"

export function DashboardContent() {
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [sortConfig, setSortConfig] = useState({ key: "submissionDate", direction: "desc" as "asc" | "desc" })

  const handleFilterChange = (filterKey: string) => {
    setActiveFilter(filterKey)
  }

  return (
    <div className="w-full grid gap-6">
      <DashboardCards onFilterChange={handleFilterChange} />
      <div className="w-full bg-white rounded-xl shadow-sm border overflow-hidden">
        <div className="w-full p-4 sm:p-6">
          <SortingControls sortConfig={sortConfig} onSortChange={setSortConfig} />
          <div className="mt-4">
            <RequestsTable activeFilter={activeFilter} sortConfig={sortConfig} onSortChange={setSortConfig} />
          </div>
        </div>
      </div>
    </div>
  )
}

