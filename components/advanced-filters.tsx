"use client"

import { useState, useEffect } from "react"
import { Filter, X, ChevronDown, Search, DollarSign, Tag, Cpu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FilterOptions {
  priceRange: [number, number]
  brands: string[]
  specs: string[]
  rating: number
  availability: boolean
  sortBy: string
}

interface AdvancedFiltersProps {
  isOpen: boolean
  onClose: () => void
  onFiltersChange: (filters: FilterOptions) => void
  products: any[]
  selectedCategory: string
}

export default function AdvancedFilters({
  isOpen,
  onClose,
  onFiltersChange,
  products,
  selectedCategory,
}: AdvancedFiltersProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 5000],
    brands: [],
    specs: [],
    rating: 0,
    availability: false,
    sortBy: "relevance",
  })

  const [searchTerm, setSearchTerm] = useState("")
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    brands: true,
    specs: true,
    rating: true,
    availability: true,
  })

  // Obtener datos únicos de los productos para los filtros
  const getUniqueData = () => {
    const filteredProducts = products.filter((p) => p.category === selectedCategory)

    const brands = [...new Set(filteredProducts.map((p) => p.brand))].sort()
    const specs = [...new Set(filteredProducts.flatMap((p) => p.specs))].sort()
    const prices = filteredProducts.map((p) => p.price)
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)

    return { brands, specs, minPrice, maxPrice }
  }

  const { brands, specs, minPrice, maxPrice } = getUniqueData()

  // Actualizar rango de precios cuando cambie la categoría
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      priceRange: [minPrice, maxPrice],
    }))
  }, [selectedCategory, minPrice, maxPrice])

  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onFiltersChange(newFilters)
  }

  const handleBrandToggle = (brand: string) => {
    const newBrands = filters.brands.includes(brand)
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand]
    handleFilterChange("brands", newBrands)
  }

  const handleSpecToggle = (spec: string) => {
    const newSpecs = filters.specs.includes(spec) ? filters.specs.filter((s) => s !== spec) : [...filters.specs, spec]
    handleFilterChange("specs", newSpecs)
  }

  const clearAllFilters = () => {
    const clearedFilters = {
      priceRange: [minPrice, maxPrice] as [number, number],
      brands: [],
      specs: [],
      rating: 0,
      availability: false,
      sortBy: "relevance",
    }
    setFilters(clearedFilters)
    onFiltersChange(clearedFilters)
    setSearchTerm("")
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (filters.brands.length > 0) count++
    if (filters.specs.length > 0) count++
    if (filters.rating > 0) count++
    if (filters.availability) count++
    if (filters.priceRange[0] !== minPrice || filters.priceRange[1] !== maxPrice) count++
    return count
  }

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-ES").format(price)
  }

  // Filtrar specs por búsqueda
  const filteredSpecs = specs.filter((spec) => spec.toLowerCase().includes(searchTerm.toLowerCase()))

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex">
      {/* Sidebar de filtros */}
      <div className="w-full max-w-md bg-slate-800 border-r border-slate-700 overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-purple-400" />
              <h2 className="text-xl font-bold text-white">Filtros Avanzados</h2>
              {getActiveFiltersCount() > 0 && (
                <Badge className="bg-purple-500 text-white">{getActiveFiltersCount()}</Badge>
              )}
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-white">
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Ordenar por */}
          <div className="mb-6">
            <Label className="text-gray-300 mb-2 block">Ordenar por</Label>
            <Select value={filters.sortBy} onValueChange={(value) => handleFilterChange("sortBy", value)}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="relevance">Relevancia</SelectItem>
                <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
                <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
                <SelectItem value="rating">Mejor Valorados</SelectItem>
                <SelectItem value="newest">Más Nuevos</SelectItem>
                <SelectItem value="name">Nombre A-Z</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Filtro de Precio */}
          <Collapsible open={expandedSections.price} onOpenChange={() => toggleSection("price")}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-0 h-auto text-left mb-4">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-400" />
                  <span className="text-white font-medium">Rango de Precio</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform ${expandedSections.price ? "rotate-180" : ""}`}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-4 mb-6">
              <div className="px-2">
                <Slider
                  value={filters.priceRange}
                  onValueChange={(value) => handleFilterChange("priceRange", value as [number, number])}
                  max={maxPrice}
                  min={minPrice}
                  step={50}
                  className="w-full"
                />
                <div className="flex justify-between mt-2 text-sm text-gray-400">
                  <span>${formatPrice(filters.priceRange[0])}</span>
                  <span>${formatPrice(filters.priceRange[1])}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <Label className="text-gray-400 text-xs">Mínimo</Label>
                  <Input
                    type="number"
                    value={filters.priceRange[0]}
                    onChange={(e) => {
                      const value = Number(e.target.value)
                      handleFilterChange("priceRange", [value, filters.priceRange[1]])
                    }}
                    className="bg-slate-700 border-slate-600 text-white text-sm"
                  />
                </div>
                <div>
                  <Label className="text-gray-400 text-xs">Máximo</Label>
                  <Input
                    type="number"
                    value={filters.priceRange[1]}
                    onChange={(e) => {
                      const value = Number(e.target.value)
                      handleFilterChange("priceRange", [filters.priceRange[0], value])
                    }}
                    className="bg-slate-700 border-slate-600 text-white text-sm"
                  />
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Filtro de Marcas */}
          <Collapsible open={expandedSections.brands} onOpenChange={() => toggleSection("brands")}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-0 h-auto text-left mb-4">
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-blue-400" />
                  <span className="text-white font-medium">Marcas</span>
                  {filters.brands.length > 0 && (
                    <Badge className="bg-blue-500 text-white text-xs">{filters.brands.length}</Badge>
                  )}
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform ${
                    expandedSections.brands ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 mb-6">
              <div className="max-h-48 overflow-y-auto space-y-2">
                {brands.map((brand) => (
                  <div key={brand} className="flex items-center space-x-2">
                    <Checkbox
                      id={`brand-${brand}`}
                      checked={filters.brands.includes(brand)}
                      onCheckedChange={() => handleBrandToggle(brand)}
                      className="border-slate-600"
                    />
                    <Label htmlFor={`brand-${brand}`} className="text-gray-300 text-sm cursor-pointer flex-1">
                      {brand}
                    </Label>
                    <span className="text-xs text-gray-500">
                      ({products.filter((p) => p.brand === brand && p.category === selectedCategory).length})
                    </span>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Filtro de Especificaciones */}
          <Collapsible open={expandedSections.specs} onOpenChange={() => toggleSection("specs")}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-0 h-auto text-left mb-4">
                <div className="flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-purple-400" />
                  <span className="text-white font-medium">Especificaciones</span>
                  {filters.specs.length > 0 && (
                    <Badge className="bg-purple-500 text-white text-xs">{filters.specs.length}</Badge>
                  )}
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform ${expandedSections.specs ? "rotate-180" : ""}`}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 mb-6">
              {/* Búsqueda de especificaciones */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Buscar especificaciones..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-700 border-slate-600 text-white text-sm"
                />
              </div>

              <div className="max-h-48 overflow-y-auto space-y-2">
                {filteredSpecs.map((spec) => (
                  <div key={spec} className="flex items-center space-x-2">
                    <Checkbox
                      id={`spec-${spec}`}
                      checked={filters.specs.includes(spec)}
                      onCheckedChange={() => handleSpecToggle(spec)}
                      className="border-slate-600"
                    />
                    <Label htmlFor={`spec-${spec}`} className="text-gray-300 text-sm cursor-pointer flex-1">
                      {spec}
                    </Label>
                    <span className="text-xs text-gray-500">
                      ({products.filter((p) => p.specs.includes(spec) && p.category === selectedCategory).length})
                    </span>
                  </div>
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Filtro de Rating */}
          <Collapsible open={expandedSections.rating} onOpenChange={() => toggleSection("rating")}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-0 h-auto text-left mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">★</span>
                  <span className="text-white font-medium">Valoración Mínima</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform ${
                    expandedSections.rating ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 mb-6">
              {[4.5, 4.0, 3.5, 3.0].map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox
                    id={`rating-${rating}`}
                    checked={filters.rating === rating}
                    onCheckedChange={(checked) => {
                      handleFilterChange("rating", checked ? rating : 0)
                    }}
                    className="border-slate-600"
                  />
                  <Label
                    htmlFor={`rating-${rating}`}
                    className="text-gray-300 text-sm cursor-pointer flex items-center gap-1"
                  >
                    <span className="text-yellow-400">★</span>
                    {rating} y superior
                  </Label>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>

          {/* Filtro de Disponibilidad */}
          <Collapsible open={expandedSections.availability} onOpenChange={() => toggleSection("availability")}>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" className="w-full justify-between p-0 h-auto text-left mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-white font-medium">Disponibilidad</span>
                </div>
                <ChevronDown
                  className={`w-4 h-4 text-gray-400 transition-transform ${
                    expandedSections.availability ? "rotate-180" : ""
                  }`}
                />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-2 mb-6">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="in-stock"
                  checked={filters.availability}
                  onCheckedChange={(checked) => handleFilterChange("availability", checked)}
                  className="border-slate-600"
                />
                <Label htmlFor="in-stock" className="text-gray-300 text-sm cursor-pointer">
                  Solo productos en stock
                </Label>
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Filtros activos */}
          {getActiveFiltersCount() > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white font-medium text-sm">Filtros Activos</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  className="text-red-400 hover:text-red-300 text-xs"
                >
                  Limpiar Todo
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {filters.brands.map((brand) => (
                  <Badge key={brand} variant="secondary" className="bg-blue-500/20 text-blue-300 text-xs">
                    {brand}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleBrandToggle(brand)}
                      className="ml-1 h-auto p-0 text-blue-300 hover:text-blue-100"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
                {filters.specs.slice(0, 3).map((spec) => (
                  <Badge key={spec} variant="secondary" className="bg-purple-500/20 text-purple-300 text-xs">
                    {spec.length > 15 ? `${spec.substring(0, 15)}...` : spec}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleSpecToggle(spec)}
                      className="ml-1 h-auto p-0 text-purple-300 hover:text-purple-100"
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </Badge>
                ))}
                {filters.specs.length > 3 && (
                  <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 text-xs">
                    +{filters.specs.length - 3} más
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Botones de acción */}
          <div className="flex gap-3">
            <Button
              onClick={clearAllFilters}
              variant="outline"
              className="flex-1 border-slate-600 text-gray-300 hover:bg-slate-700 bg-transparent"
            >
              Limpiar
            </Button>
            <Button
              onClick={onClose}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Aplicar
            </Button>
          </div>
        </div>
      </div>

      {/* Overlay para cerrar */}
      <div className="flex-1" onClick={onClose}></div>
    </div>
  )
}
