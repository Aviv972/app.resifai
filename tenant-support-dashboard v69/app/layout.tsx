import type { Metadata } from "next"
import { Geist, Azeret_Mono as Geist_Mono } from "next/font/google"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/toaster"
import { LanguageProvider } from "@/components/language-provider"
import "./globals.css"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export const metadata: Metadata = {
  title: "Tenant Support Dashboard",
  description: "Manage tenant requests efficiently",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="he" dir="rtl">
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased`}>
        <LanguageProvider>
          <SidebarProvider>
            {children}
            <Toaster />
          </SidebarProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}

