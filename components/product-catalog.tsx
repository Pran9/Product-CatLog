"use client"

import { useState, useEffect, useMemo } from "react"
import { useFilters } from "@/contexts/filter-context"
import ProductCard from "./product-card"
import FilterSidebar from "./filter-sidebar"
import { Button } from "@/components/ui/button"
import { Loader2, Grid, List } from "lucide-react"

interface Product {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  tags: string[]
  brand: string
  sku: string
  weight: number
  dimensions: {
    width: number
    height: number
    depth: number
  }
  warrantyInformation: string
  shippingInformation: string
  availabilityStatus: string
  reviews: Array<{
    rating: number
    comment: string
    date: string
    reviewerName: string
    reviewerEmail: string
  }>
  returnPolicy: string
  minimumOrderQuantity: number
  meta: {
    createdAt: string
    updatedAt: string
    barcode: string
    qrCode: string
  }
  images: string[]
  thumbnail: string
}

export default function ProductCatalog() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const { filters } = useFilters()

  const fetchProducts = async (pageNum = 1, reset = false) => {
    try {
      setLoading(true)
      const limit = 12
      const skip = (pageNum - 1) * limit

      let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`

      if (filters.searchQuery) {
        url = `https://dummyjson.com/products/search?q=${filters.searchQuery}&limit=${limit}&skip=${skip}`
      }

      const response = await fetch(url)
      const data = await response.json()

      if (data && data.products && Array.isArray(data.products)) {
        if (reset) {
          setProducts(data.products)
        } else {
          setProducts((prev) => [...prev, ...data.products])
        }

        setHasMore(data.skip + data.products.length < data.total)
      } else {
        console.error("Invalid data structure received:", data)
        setProducts([])
        setHasMore(false)
      }
    } catch (error) {
      console.error("Error fetching products:", error)
      setProducts([])
      setHasMore(false)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setPage(1)
    fetchProducts(1, true)
  }, [filters.searchQuery])

  const filteredProducts = useMemo(() => {
    if (!products || !Array.isArray(products)) {
      return []
    }

    return products.filter((product) => {
      if (filters.category && product.category !== filters.category) {
        return false
      }

      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false
      }

      if (product.rating < filters.minRating) {
        return false
      }

      return true
    })
  }, [products, filters])

  const loadMore = () => {
    const nextPage = page + 1
    setPage(nextPage)
    fetchProducts(nextPage, false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="lg:w-80 flex-shrink-0">
            <div className="sticky top-24">
              <FilterSidebar />
            </div>
          </aside>

          <main className="flex-1">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                    Products
                  </h1>
                  <p className="text-slate-600 dark:text-slate-400">Showing {filteredProducts.length} products</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div
              className={`grid gap-6 ${
                viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
              }`}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && !loading && (
              <div className="text-center py-16">
                <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Grid className="w-12 h-12 text-slate-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No products found</h3>
                <p className="text-slate-500 dark:text-slate-400">Try adjusting your filters or search terms.</p>
              </div>
            )}

            {hasMore && !filters.category && !filters.searchQuery && (
              <div className="text-center mt-12">
                <Button
                  onClick={loadMore}
                  disabled={loading}
                  variant="outline"
                  size="lg"
                  className="bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700"
                >
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Load More Products
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  )
}
