"use client"

import type React from "react"

import { useState } from "react"
import { Search, ShoppingCart, User, Menu, X, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface EnhancedHeaderProps {
  onCartClick: () => void
  onFilterClick: () => void
  totalCartItems: number
  user: any
  onAuthClick: () => void
  onLogout: () => void
  onSearch?: (term: string) => void
}

export default function EnhancedHeader({
  onCartClick,
  onFilterClick,
  totalCartItems,
  user,
  onAuthClick,
  onLogout,
  onSearch,
}: EnhancedHeaderProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(searchTerm)
  }

  return (
    <header className="sticky top-0 z-50 glass-card border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold gradient-text">TechStore Pro</h1>
          </div>

          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
              />
            </div>
          </form>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-red-500 text-xs">
                3
              </Badge>
            </Button>

            {/* Cart */}
            <Button variant="ghost" size="icon" onClick={onCartClick} className="relative">
              <ShoppingCart className="w-5 h-5" />
              {totalCartItems > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-purple-500 text-xs">
                  {totalCartItems}
                </Badge>
              )}
            </Button>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <User className="w-5 h-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-slate-800 border-slate-700">
                  <DropdownMenuItem className="text-white hover:bg-slate-700">
                    <User className="mr-2 h-4 w-4" />
                    Mi Perfil
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-white hover:bg-slate-700">
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    Mis Pedidos
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-slate-700" />
                  <DropdownMenuItem onClick={onLogout} className="text-red-400 hover:bg-slate-700">
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={onAuthClick} className="glowing-button">
                Iniciar Sesión
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                />
              </div>
            </form>

            {/* Mobile Actions */}
            <div className="space-y-2">
              <Button variant="ghost" className="w-full justify-start" onClick={onCartClick}>
                <ShoppingCart className="mr-2 w-4 h-4" />
                Carrito ({totalCartItems})
              </Button>

              <Button variant="ghost" className="w-full justify-start" onClick={onFilterClick}>
                <Menu className="mr-2 w-4 h-4" />
                Filtros
              </Button>

              {user ? (
                <>
                  <Button variant="ghost" className="w-full justify-start">
                    <User className="mr-2 w-4 h-4" />
                    Mi Perfil
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-red-400" onClick={onLogout}>
                    Cerrar Sesión
                  </Button>
                </>
              ) : (
                <Button onClick={onAuthClick} className="w-full glowing-button">
                  Iniciar Sesión
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
