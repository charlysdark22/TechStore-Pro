"use client"

import type React from "react"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

interface SearchAndFilterBarProps {
  onSearch: (term: string) => void
  onOpenFilters: () => void
  activeFiltersCount: number
  onClearFilters: () => void
  searchTerm: string
  setSearchTerm: (term: string) => void
}

export default function SearchAndFilterBar({
  onSearch,
  onOpenFilters,
  activeFiltersCount,
  onClearFilters,
  searchTerm,
  setSearchTerm,
}: SearchAndFilterBarProps) {
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  const clearSearch = () => {
    setSearchTerm("")
    onSearch("")
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      {/* Barra de búsqueda */}
      <form onSubmit={handleSearch} className="flex-1">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            type="text"
            placeholder="Buscar productos, marcas, especificaciones..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-12 pr-10 bg-white/10 border-white/20 text-white placeholder-gray-400 h-12"
          />
          {searchTerm && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={clearSearch}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      </form>

      {/* Botón de filtros */}
      <div className="flex gap-2">
        <Button
          onClick={onOpenFilters}
          variant="outline"
          className="border-white/20 text-white hover:bg-white/10 h-12 px-6 bg-transparent"
        >
          <SlidersHorizontal className="w-4 h-4 mr-2" />
          Filtros
          {activeFiltersCount > 0 && <Badge className="ml-2 bg-purple-500 text-white">{activeFiltersCount}</Badge>}
        </Button>

        {activeFiltersCount > 0 && (
          <Button
            onClick={onClearFilters}
            variant="ghost"
            className="text-red-400 hover:text-red-300 hover:bg-red-500/10 h-12"
          >
            Limpiar
          </Button>
        )}
      </div>
    </div>
  )
}
