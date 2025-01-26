import { createContext, useContext } from "react"

type LanguageContextType = {
  language: "he" | "en"
  direction: "rtl" | "ltr"
  toggleLanguage: () => void
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

