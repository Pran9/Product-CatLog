import type React from "react"
import type { Metadata } from "next"
import { CartProvider } from "@/contexts/cart-context"
import { FilterProvider } from "@/contexts/filter-context"
import { AuthProvider } from "@/contexts/auth-context"
import { ThemeProvider } from "@/components/theme-provider"
import Header from "@/components/header"
import { Toaster } from "@/components/ui/toaster"

import "./globals.css"

export const metadata: Metadata = {
  title: "E-commerce",
  description: "E-commerce platform with dynamic filtering and real-time updates",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange={false}>
          <AuthProvider>
            <CartProvider>
              <FilterProvider>
                <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
                  <Header />
                  <main>{children}</main>
                  <Toaster />
                </div>
              </FilterProvider>
            </CartProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
