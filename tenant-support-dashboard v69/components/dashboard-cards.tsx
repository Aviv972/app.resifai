"use client"

import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, Clock, CheckCircle2, ArrowUpRight, Wrench, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface DashboardMetric {
  label: string
  value: string
  change?: string
  trend?: "up" | "down" | "neutral"
  status: "success" | "warning" | "danger" | "neutral"
  filterKey: string
}

const metrics: DashboardMetric[] = [
  {
    label: "פניות פתוחות",
    value: "32",
    change: "+2",
    trend: "up",
    status: "warning",
    filterKey: "open",
  },
  {
    label: "ממתינות לטיפול",
    value: "10",
    change: "-3",
    trend: "down",
    status: "danger",
    filterKey: "action-needed",
  },
  {
    label: "בהמתנה לקבלן משנה",
    value: "15",
    change: "+5",
    trend: "up",
    status: "neutral",
    filterKey: "waiting-contractor",
  },
  {
    label: "טופלו השבוע",
    value: "24",
    change: "+8",
    trend: "up",
    status: "success",
    filterKey: "resolved-this-week",
  },
]

interface DashboardCardsProps {
  onFilterChange?: (filterKey: string) => void
}

export function DashboardCards({ onFilterChange }: DashboardCardsProps) {
  const getStatusIcon = (status: DashboardMetric["status"]) => {
    switch (status) {
      case "success":
        return (
          <div className="rounded-full bg-green-50 p-3">
            <CheckCircle2 className="h-6 w-6 text-green-500" />
          </div>
        )
      case "warning":
        return (
          <div className="rounded-full bg-yellow-50 p-3">
            <AlertTriangle className="h-6 w-6 text-yellow-500" />
          </div>
        )
      case "danger":
        return (
          <div className="rounded-full bg-red-50 p-3">
            <AlertCircle className="h-6 w-6 text-red-500" />
          </div>
        )
      case "neutral":
        return (
          <div className="rounded-full bg-blue-50 p-3">
            <Wrench className="h-6 w-6 text-blue-500" />
          </div>
        )
      default:
        return null
    }
  }

  const handleCardClick = (filterKey: string) => {
    if (onFilterChange) {
      onFilterChange(filterKey)
    }
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4" dir="rtl">
      {metrics.map((metric, index) => (
        <Button
          key={index}
          variant="ghost"
          className="p-0 h-auto hover:bg-transparent"
          onClick={() => handleCardClick(metric.filterKey)}
        >
          <Card className="w-full relative overflow-hidden transition-all hover:shadow-lg hover:bg-accent/5">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                {getStatusIcon(metric.status)}
                {metric.trend && (
                  <div
                    className={`flex items-center text-sm ${
                      metric.trend === "up"
                        ? "text-green-500"
                        : metric.trend === "down"
                          ? "text-red-500"
                          : "text-gray-500"
                    }`}
                  >
                    <ArrowUpRight className={`h-4 w-4 ${metric.trend === "down" ? "rotate-180" : ""}`} />
                    <span>{metric.change}</span>
                  </div>
                )}
              </div>
              <div className="mt-4 space-y-1">
                <h3 className="text-3xl font-bold tracking-tight">{metric.value}</h3>
                <p className="text-sm text-gray-500">{metric.label}</p>
              </div>
            </CardContent>
          </Card>
        </Button>
      ))}
    </div>
  )
}

