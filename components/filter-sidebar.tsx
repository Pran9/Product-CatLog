"use client"

import { useState, useEffect } from "react"
import { useFilters } from "@/contexts/filter-context"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { X, Filter, DollarSign, Star, Tag } from "lucide-react"

export default function FilterSidebar() {
  const { filters, updateFilter, resetFilters } = useFilters()
  const [categories, setCategories] = useState<Array<{ slug: string; name: string; url: string }>>([])

  useEffect(() => {
    // Fetch categories
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data)
      })
      .catch((error) => console.error("Error fetching categories:", error))
  }, [])

  const hasActiveFilters =
    filters.category || filters.minRating > 0 || filters.priceRange[0] > 0 || filters.priceRange[1] < 2000

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-blue-600" />
          <h2 className="text-lg font-bold">Filters</h2>
        </div>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={resetFilters} className="text-red-500 hover:text-red-700">
            <X className="h-4 w-4 mr-1" />
            Clear All
          </Button>
        )}
      </div>

      {/* Active Filters */}
      {hasActiveFilters && (
        <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-blue-700 dark:text-blue-300">Active Filters</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {filters.category && (
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100">
                  {categories.find((cat) => cat.slug === filters.category)?.name || filters.category}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-1 h-auto p-0 hover:bg-transparent"
                    onClick={() => updateFilter("category", "")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {filters.minRating > 0 && (
                <Badge
                  variant="secondary"
                  className="bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100"
                >
                  {filters.minRating}+ stars
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-1 h-auto p-0 hover:bg-transparent"
                    onClick={() => updateFilter("minRating", 0)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
              {(filters.priceRange[0] > 0 || filters.priceRange[1] < 2000) && (
                <Badge
                  variant="secondary"
                  className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100"
                >
                  Rs. {filters.priceRange[0]} - Rs. {filters.priceRange[1]}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="ml-1 h-auto p-0 hover:bg-transparent"
                    onClick={() => updateFilter("priceRange", [0, 2000])}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Category Filter */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center space-x-2">
            <Tag className="h-4 w-4 text-blue-600" />
            <span>Category</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={filters.category} onValueChange={(value) => updateFilter("category", value)}>
            <div className="flex items-center space-x-2 py-1">
              <RadioGroupItem value="" id="all-categories" />
              <Label htmlFor="all-categories" className="text-sm font-medium">
                All Categories
              </Label>
            </div>
            {categories.slice(0, 10).map((category) => (
              <div key={category.slug} className="flex items-center space-x-2 py-1">
                <RadioGroupItem value={category.slug} id={category.slug} />
                <Label htmlFor={category.slug} className="text-sm capitalize">
                  {category.name}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Price Range Filter */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-green-600" />
            <span>Price Range</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="px-2">
            <Slider
              value={filters.priceRange}
              onValueChange={(value) => updateFilter("priceRange", value)}
              max={2000}
              min={0}
              step={25}
              className="w-full"
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-lg">
              <span className="text-sm font-medium">Rs. {filters.priceRange[0]}</span>
            </div>
            <span className="text-slate-400">to</span>
            <div className="bg-slate-100 dark:bg-slate-800 px-3 py-2 rounded-lg">
              <span className="text-sm font-medium">Rs. {filters.priceRange[1]}</span>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Button variant="outline" size="sm" onClick={() => updateFilter("priceRange", [0, 50])} className="text-xs">
              Under Rs. 50
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateFilter("priceRange", [50, 200])}
              className="text-xs"
            >
              Rs. 50-Rs. 200
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateFilter("priceRange", [200, 2000])}
              className="text-xs"
            >
              Over Rs. 200
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Rating Filter */}
      <Card className="shadow-sm">
        <CardHeader className="pb-3">
          <CardTitle className="text-sm flex items-center space-x-2">
            <Star className="h-4 w-4 text-yellow-500" />
            <span>Minimum Rating</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={filters.minRating.toString()}
            onValueChange={(value) => updateFilter("minRating", Number.parseInt(value))}
          >
            {[0, 1, 2, 3, 4].map((rating) => (
              <div key={rating} className="flex items-center space-x-2 py-1">
                <RadioGroupItem value={rating.toString()} id={`rating-Rs. {rating}`} />
                <Label htmlFor={`rating-Rs. {rating}`} className="text-sm flex items-center space-x-1">
                  <span>{rating === 0 ? "All Ratings" : `Rs. {rating}+ Stars`}</span>
                  {rating > 0 && (
                    <div className="flex">
                      {[...Array(rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  )}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>
    </div>
  )
}
