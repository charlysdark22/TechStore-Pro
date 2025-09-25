"use client"

import { useState, useMemo } from "react"

interface FilterOptions {
  priceRange: [number, number]
  brands: string[]
  specs: string[]
  rating: number
  availability: boolean
  sortBy: string
}

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  brand: string
  category: string
  rating: number
  specs: string[]
  description: string
  stock?: number
  isNew?: boolean
  discount?: number
}

export function useProductFilters(products: Product[], selectedCategory: string) {
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 5000],
    brands: [],
    specs: [],
    rating: 0,
    availability: false,
    sortBy: "relevance",
  })

  const [searchTerm, setSearchTerm] = useState("")

  // Filtrar y ordenar productos
  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      // Filtrar por categoría
      if (product.category !== selectedCategory) return false

      // Filtrar por rango de precio
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false
      }

      // Filtrar por marcas
      if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
        return false
      }

      // Filtrar por especificaciones
      if (filters.specs.length > 0) {
        const hasMatchingSpec = filters.specs.some((spec) =>
          product.specs.some((productSpec) => productSpec.toLowerCase().includes(spec.toLowerCase())),
        )
        if (!hasMatchingSpec) return false
      }

      // Filtrar por rating
      if (filters.rating > 0 && product.rating < filters.rating) {
        return false
      }

      // Filtrar por disponibilidad
      if (filters.availability && (!product.stock || product.stock <= 0)) {
        return false
      }

      // Filtrar por término de búsqueda
      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase()
        const matchesSearch =
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          product.brand.toLowerCase().includes(searchLower) ||
          product.specs.some((spec) => spec.toLowerCase().includes(searchLower))

        if (!matchesSearch) return false
      }

      return true
    })

    // Ordenar productos
    switch (filters.sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "newest":
        filtered.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0))
        break
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      case "relevance":
      default:
        // Ordenar por relevancia (productos nuevos primero, luego por rating)
        filtered.sort((a, b) => {
          if (a.isNew && !b.isNew) return -1
          if (!a.isNew && b.isNew) return 1
          return b.rating - a.rating
        })
        break
    }

    return filtered
  }, [products, selectedCategory, filters, searchTerm])

  // Obtener estadísticas de filtros
  const filterStats = useMemo(() => {
    const categoryProducts = products.filter((p) => p.category === selectedCategory)

    const brands = [...new Set(categoryProducts.map((p) => p.brand))].sort()
    const specs = [...new Set(categoryProducts.flatMap((p) => p.specs))].sort()
    const prices = categoryProducts.map((p) => p.price)
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)

    return {
      brands,
      specs,
      minPrice,
      maxPrice,
      totalProducts: categoryProducts.length,
      filteredCount: filteredProducts.length,
    }
  }, [products, selectedCategory, filteredProducts.length])

  // Contar filtros activos
  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (filters.brands.length > 0) count++
    if (filters.specs.length > 0) count++
    if (filters.rating > 0) count++
    if (filters.availability) count++
    if (filters.priceRange[0] !== filterStats.minPrice || filters.priceRange[1] !== filterStats.maxPrice) count++
    if (searchTerm) count++
    return count
  }, [filters, filterStats.minPrice, filterStats.maxPrice, searchTerm])

  // Limpiar todos los filtros
  const clearAllFilters = () => {
    setFilters({
      priceRange: [filterStats.minPrice, filterStats.maxPrice],
      brands: [],
      specs: [],
      rating: 0,
      availability: false,
      sortBy: "relevance",
    })
    setSearchTerm("")
  }

  // Actualizar filtros
  const updateFilters = (newFilters: Partial<FilterOptions>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }

  return {
    filters,
    setFilters: updateFilters,
    searchTerm,
    setSearchTerm,
    filteredProducts,
    filterStats,
    activeFiltersCount,
    clearAllFilters,
  }
}
