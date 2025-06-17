"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"

interface FilterState {
  category: string
  priceRange: [number, number]
  minRating: number
  searchQuery: string
}

interface FilterContextType {
  filters: FilterState
  updateFilter: (key: keyof FilterState, value: any) => void
  resetFilters: () => void
}

const defaultFilters: FilterState = {
  category: "",
  priceRange: [0, 2000],
  minRating: 0,
  searchQuery: "",
}

const FilterContext = createContext<FilterContextType | null>(null)

export function FilterProvider({ children }: { children: React.ReactNode }) {
  const [filters, setFilters] = useState<FilterState>(defaultFilters)

  const updateFilter = (key: keyof FilterState, value: any) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const resetFilters = () => {
    setFilters(defaultFilters)
  }

  return <FilterContext.Provider value={{ filters, updateFilter, resetFilters }}>{children}</FilterContext.Provider>
}

export function useFilters() {
  const context = useContext(FilterContext)
  if (!context) {
    throw new Error("useFilters must be used within a FilterProvider")
  }
  return context
}
