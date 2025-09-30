"use client"

import Link from "next/link"
import { ShoppingCart, Search, Moon, Sun, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import { useFilters } from "@/contexts/filter-context"
import { useTheme } from "next-themes"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import CartSidebar from "./cart-sidebar"
import AuthButton from "./auth-button"
import { useState, useEffect } from "react"

export default function Header() {
  const { state } = useCart()
  const { filters, updateFilter } = useFilters()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 dark:bg-slate-900/80 backdrop-blur-md supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-slate-900/60 shadow-sm">
      <div className="container flex h-16 items-center justify-between px-4 max-w-7xl mx-auto">
        <Link href="/" className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-lg">
              <ShoppingBag />
            </span>
          </div>
          <span className="font-bold text-xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            cartify
          </span>
        </Link>

        <div className="flex-1 max-w-md mx-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
            <Input
              placeholder="Search products..."
              value={filters.searchQuery}
              onChange={(e) => updateFilter("searchQuery", e.target.value)}
              className="pl-10 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <AuthButton />

          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              {theme === "dark" ? (
                <div title=" light mode">
                  <Sun className="h-5 w-5 text-yellow-500" />
                </div>
              ) : (
                <div title=" dark mode">
                  <Moon className="h-5 w-5 text-slate-600" />
                </div>
              )}
              <span className="sr-only">Toggle theme</span>
            </Button>
          )}

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative hover:bg-slate-100 dark:hover:bg-slate-800">
                <ShoppingCart className="h-5 w-5" />
                {state.totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center p-0 text-xs bg-gradient-to-r from-blue-600 to-purple-600 border-0">
                    {state.totalItems}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]">
              <SheetHeader>
                <SheetTitle className="text-xl font-bold">Shopping Cart</SheetTitle>
                <SheetDescription>
                  {state.totalItems} {state.totalItems === 1 ? "item" : "items"} in your cart
                </SheetDescription>
              </SheetHeader>
              <CartSidebar />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
