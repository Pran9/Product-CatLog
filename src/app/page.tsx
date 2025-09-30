"use client"

import { useAuth } from "@/contexts/auth-context"
import ProductCatalog from "@/components/product-catalog"
import LandingPage from "@/components/landing-page"

export default function Home() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-current border-t-transparent" />
      </div>
    )
  }

  return user ? <ProductCatalog /> : <LandingPage />
}
