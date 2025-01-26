import { Sidebar } from "@/components/sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { useLanguage } from "@/lib/language-context"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { direction } = useLanguage()

  return (
    <div className="flex min-h-screen bg-gray-50/40">
      <Sidebar />
      <SidebarInset className="flex-1">
        <div className={`flex flex-col min-h-screen ${direction === "rtl" ? "lg:mr-[280px]" : "lg:ml-[280px]"}`}>
          <main className="flex-1 w-full">
            <div className="w-full h-full px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8">{children}</div>
          </main>
        </div>
      </SidebarInset>
    </div>
  )
}

