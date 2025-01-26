"use client"

import { useState } from "react"
import { LogOut, Settings, Users, Home, PieChart, Bell, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/language-context"
import { Switch } from "@/components/ui/switch"

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const { direction, toggleLanguage } = useLanguage()

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsOpen(false)} aria-hidden="true" />
      )}

      {/* Mobile Toggle Button */}
      <Button
        variant="ghost"
        size="icon"
        className={`fixed top-4 z-50 lg:hidden ${direction === "rtl" ? "right-4" : "left-4"}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-controls="sidebar"
        aria-label={isOpen ? "סגור תפריט" : "פתח תפריט"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {/* Sidebar */}
      <aside
        id="sidebar"
        className={cn(
          "fixed top-0 z-40 h-full w-[280px] bg-white border transform transition-transform duration-200 ease-in-out lg:translate-x-0",
          direction === "rtl" ? "right-0 border-l" : "left-0 border-r",
          isOpen ? "translate-x-0" : direction === "rtl" ? "translate-x-full" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b">
            <h2 className="text-2xl font-semibold">תמיכת דיירים</h2>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            <div className="space-y-1">
              <Button variant="ghost" className="w-full justify-start gap-3 px-4 py-3 hover:bg-gray-100">
                <Home className="h-5 w-5" />
                <span>דף הבית</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 px-4 py-3 hover:bg-gray-100">
                <PieChart className="h-5 w-5" />
                <span>אנליטיקה</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 px-4 py-3 hover:bg-gray-100">
                <Users className="h-5 w-5" />
                <span>ניהול משתמשים</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 px-4 py-3 hover:bg-gray-100">
                <Bell className="h-5 w-5" />
                <span>התראות</span>
              </Button>
              <Button variant="ghost" className="w-full justify-start gap-3 px-4 py-3 hover:bg-gray-100">
                <Settings className="h-5 w-5" />
                <span>הגדרות</span>
              </Button>
            </div>
          </nav>

          {/* User Profile */}
          <div className="border-t p-4 bg-gray-50">
            <div className="flex items-center gap-3 px-4 py-2">
              <div className="h-10 w-10 rounded-full bg-white p-2 shadow-sm">
                <User className="h-full w-full text-gray-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate">ישראל ישראלי</p>
                <p className="text-sm text-gray-500 truncate">מנהל מערכת</p>
              </div>
              <Button variant="ghost" size="icon" className="hover:bg-gray-200" aria-label="התנתק">
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Language Toggle */}
          <div className="flex items-center justify-between px-4 py-2 border-t">
            <span className="text-sm font-medium">{direction === "rtl" ? "עברית" : "English"}</span>
            <Switch checked={direction === "ltr"} onCheckedChange={toggleLanguage} aria-label="Toggle language" />
          </div>
        </div>
      </aside>
    </>
  )
}

