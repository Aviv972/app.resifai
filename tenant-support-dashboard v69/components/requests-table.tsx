"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronDown, ChevronUp, ChevronRight } from "lucide-react"
import { mockRequests } from "@/lib/mock-data"
import { FiltersSection } from "@/components/filters-section"
import { ExpandedRequestRow } from "@/components/expanded-request-row"
import { SortingControls } from "@/components/sorting-controls"

interface RequestsTableProps {
  activeFilter?: string | null
  sortConfig: { key: string; direction: "asc" | "desc" }
  onSortChange: (config: { key: string; direction: "asc" | "desc" }) => void
}

export function RequestsTable({ activeFilter, sortConfig, onSortChange }: RequestsTableProps) {
  const [filteredRequests, setFilteredRequests] = useState(mockRequests)
  const [searchQuery, setSearchQuery] = useState("")
  const [searchCategory, setSearchCategory] = useState("all")
  const [filters, setFilters] = useState({})
  const [expandedRequestId, setExpandedRequestId] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  useEffect(() => {
    let result = [...mockRequests]

    // Apply active filter from dashboard cards
    if (activeFilter) {
      switch (activeFilter) {
        case "open":
          result = result.filter((request) => request.status === "new" || request.status === "in-progress")
          break
        case "action-needed":
          result = result.filter((request) => request.urgencyLevel === "urgent" || request.urgencyLevel === "critical")
          break
        case "waiting-contractor":
          result = result.filter((request) => request.status === "transferred")
          break
        case "resolved-this-week":
          const weekAgo = new Date()
          weekAgo.setDate(weekAgo.getDate() - 7)
          result = result.filter(
            (request) => request.status === "resolved" && new Date(request.submissionDate) > weekAgo,
          )
          break
      }
    }

    // Apply advanced filters
    if (filters) {
      if (filters.projectName) {
        result = result.filter((request) => request.projectName === filters.projectName)
      }
      if (filters.location) {
        result = result.filter((request) => request.location === filters.location)
      }
      if (filters.issueType) {
        result = result.filter((request) => request.category === filters.issueType)
      }
    }

    // Apply search
    if (searchQuery) {
      result = result.filter((request) => {
        const searchLower = searchQuery.toLowerCase()
        const searchFields = {
          content: request.issueDescription.toLowerCase(),
          id: request.id.toString(),
          tenant: request.tenantName.toLowerCase(),
          warranty: request.warrantyEndDate.toLowerCase(),
          all: [
            request.issueDescription.toLowerCase(),
            request.id.toString(),
            request.tenantName.toLowerCase(),
            request.warrantyEndDate.toLowerCase(),
            request.projectName.toLowerCase(),
            request.category.toLowerCase(),
            request.location.toLowerCase(),
          ].join(" "),
        }

        return searchCategory === "all"
          ? searchFields.all.includes(searchLower)
          : searchFields[searchCategory]?.includes(searchLower)
      })
    }

    // Apply sorting
    result.sort((a, b) => {
      const direction = sortConfig.direction === "asc" ? 1 : -1

      switch (sortConfig.key) {
        case "submissionDate": {
          const dateA = new Date(a.submissionDate.split("/").reverse().join("-"))
          const dateB = new Date(b.submissionDate.split("/").reverse().join("-"))
          return direction * (dateB.getTime() - dateA.getTime())
        }
        case "warrantyEndDate": {
          const dateA = new Date(a.warrantyEndDate.split("/").reverse().join("-"))
          const dateB = new Date(b.warrantyEndDate.split("/").reverse().join("-"))
          return direction * (dateB.getTime() - dateA.getTime())
        }
        case "urgencyLevel": {
          const urgencyOrder = { critical: 3, urgent: 2, normal: 1 }
          return direction * (urgencyOrder[b.urgencyLevel] - urgencyOrder[a.urgencyLevel])
        }
        case "status": {
          const statusOrder = { new: 4, "in-progress": 3, transferred: 2, resolved: 1 }
          return direction * (statusOrder[b.status] - statusOrder[a.status])
        }
        default:
          return 0
      }
    })

    setFilteredRequests(result)
    setCurrentPage(1) // Reset to first page when filters change
  }, [searchQuery, searchCategory, filters, sortConfig, activeFilter])

  const handleSearch = (query: string, category: string) => {
    setSearchQuery(query)
    setSearchCategory(category)
  }

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return (
          <Badge variant="success" className="bg-green-100 text-green-700 hover:bg-green-100/80">
            חדש
          </Badge>
        )
      case "in-progress":
        return <Badge variant="warning">בטיפול</Badge>
      case "transferred":
        return <Badge variant="secondary">הועבר</Badge>
      case "resolved":
        return <Badge variant="outline">טופל</Badge>
      default:
        return null
    }
  }

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case "normal":
        return <Badge variant="outline">רגיל</Badge>
      case "urgent":
        return <Badge variant="warning">דחוף</Badge>
      case "critical":
        return <Badge variant="destructive">קריטי</Badge>
      default:
        return null
    }
  }

  const getWarrantyBadge = (warrantyPeriod: string) => {
    switch (warrantyPeriod) {
      case "bedek":
        return <Badge variant="success">בדק</Badge>
      case "warranty":
        return <Badge variant="warning">אחריות</Badge>
      case "out-of-warranty":
        return <Badge variant="destructive">מחוץ לתקופה</Badge>
      default:
        return null
    }
  }

  const toggleExpand = (id: number) => {
    setExpandedRequestId(expandedRequestId === id ? null : id)
  }

  const pageCount = Math.ceil(filteredRequests.length / itemsPerPage)
  const paginatedRequests = filteredRequests.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)

  return (
    <div className="w-full space-y-4">
      <FiltersSection onSearch={handleSearch} onFilterChange={handleFilterChange} />
      <div className="w-full overflow-x-auto">
        <Table className="w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[80px]">מספר בקשה</TableHead>
              <TableHead className="w-[100px]">סטטוס</TableHead>
              <TableHead className="w-[120px]">שם דייר</TableHead>
              <TableHead className="w-[120px]">פרויקט</TableHead>
              <TableHead className="w-[250px]">תיאור הבעיה</TableHead>
              <TableHead className="w-[100px]">דחיפות</TableHead>
              <TableHead className="w-[120px]">תאריך פתיחה</TableHead>
              <TableHead className="w-[120px]">תאריך סיום אחריות</TableHead>
              <TableHead className="w-[40px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedRequests.map((request) => (
              <>
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.id}</TableCell>
                  <TableCell>{getStatusBadge(request.status)}</TableCell>
                  <TableCell>{request.tenantName}</TableCell>
                  <TableCell>{request.projectName}</TableCell>
                  <TableCell>{request.issueDescription}</TableCell>
                  <TableCell>{getUrgencyBadge(request.urgencyLevel)}</TableCell>
                  <TableCell>{request.submissionDate}</TableCell>
                  <TableCell>{request.warrantyEndDate}</TableCell>
                  <TableCell>
                    <button onClick={() => toggleExpand(request.id)} className="p-1">
                      {expandedRequestId === request.id ? (
                        <ChevronUp className="h-4 w-4" />
                      ) : (
                        <ChevronDown className="h-4 w-4" />
                      )}
                    </button>
                  </TableCell>
                </TableRow>
                {expandedRequestId === request.id && (
                  <TableRow>
                    <TableCell colSpan={9} className="p-0">
                      <ExpandedRequestRow request={request as any} />
                    </TableCell>
                  </TableRow>
                )}
              </>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          מציג {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredRequests.length)}{" "}
          מתוך {filteredRequests.length} תוצאות
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronRight className="h-4 w-4" />
            הקודם
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pageCount))}
            disabled={currentPage === pageCount}
          >
            הבא
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

