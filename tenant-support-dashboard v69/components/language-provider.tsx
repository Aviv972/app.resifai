"use client"

import { useState } from "react"
import { LanguageContext } from "@/lib/language-context"

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<"he" | "en">("he")
  const direction = language === "he" ? "rtl" : "ltr"

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "he" ? "en" : "he"))
  }

  return <LanguageContext.Provider value={{ language, direction, toggleLanguage }}>{children}</LanguageContext.Provider>
}

