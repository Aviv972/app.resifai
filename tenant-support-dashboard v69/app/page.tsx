"use client"
import { DashboardLayout } from "@/components/dashboard-layout"
import { DashboardCards } from "@/components/dashboard-cards"
import { RequestsTable } from "@/components/requests-table"
import { DashboardContent } from "@/components/dashboard-content"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="w-full space-y-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold sm:text-3xl md:text-4xl">!ברוך הבא</h1>
          <p className="text-gray-500 text-sm sm:text-base">הנה סקירה של פניות הדיירים שלך</p>
        </div>
        <DashboardContent />
      </div>
    </DashboardLayout>
  )
}

