"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Search, ShoppingCart, User, Menu, X, Bell, Zap, Star } from "lucide-react"
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
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch?.(searchTerm)
  }

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "glass-header shadow-2xl" : "glass-header"
      }`}
    >
      {/* Barra superior con ofertas */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white py-2 px-4">
        <div className="container mx-auto flex items-center justify-center space-x-4 text-sm">
          <Zap className="w-4 h-4 animate-pulse" />
          <span className="font-medium">¡Envío GRATIS en compras mayores a $1,000!</span>
          <Star className="w-4 h-4 animate-pulse" />
        </div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo mejorado */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center animate-pulse-glow">
                <Zap className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text">TechStore Pro</h1>
              <p className="text-xs text-gray-400">Tecnología del futuro</p>
            </div>
          </div>

          {/* Barra de búsqueda mejorada */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full group">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-green-400" />
              <Input
                type="text"
                placeholder="Buscar productos, marcas, categorías..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 h-12 glass-card border-0 text-white placeholder-gray-400 focus:ring-2 focus:ring-green-400 transition-all duration-300"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <kbd className="px-2 py-1 text-xs bg-gray-700 rounded text-gray-300">⌘K</kbd>
              </div>
            </div>
          </form>

          {/* Acciones del escritorio */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Notificaciones */}
            <Button
              variant="ghost"
              size="icon"
              className="relative glass-card hover:bg-white/10 transition-all duration-300"
            >
              <Bell className="w-5 h-5" />
              <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-gradient-to-r from-red-500 to-pink-500 text-xs animate-pulse">
                3
              </Badge>
            </Button>

            {/* Carrito mejorado */}
            <Button
              variant="ghost"
              size="icon"
              onClick={onCartClick}
              className="relative glass-card hover:bg-white/10 transition-all duration-300 group"
            >
              <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
              {totalCartItems > 0 && (
                <Badge className="absolute -top-1 -right-1 w-6 h-6 p-0 flex items-center justify-center bg-gradient-to-r from-green-500 to-emerald-500 text-xs animate-bounce">
                  {totalCartItems}
                </Badge>
              )}
            </Button>

            {/* Menú de usuario mejorado */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="glass-card hover:bg-white/10 transition-all duration-300"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 glass-card border-white/20 animate-slide-in">
                  <div className="p-3 border-b border-white/10">
                    <p className="font-medium text-white">{user.name}</p>
                    <p className="text-sm text-gray-400">{user.email}</p>
                  </div>
                  <DropdownMenuItem className="text-white hover:bg-white/10 transition-colors">
                    <User className="mr-3 h-4 w-4" />
                    Mi Perfil
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-white hover:bg-white/10 transition-colors">
                    <ShoppingCart className="mr-3 h-4 w-4" />
                    Mis Pedidos
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-white hover:bg-white/10 transition-colors">
                    <Star className="mr-3 h-4 w-4" />
                    Lista de Deseos
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-white/10" />
                  <DropdownMenuItem onClick={onLogout} className="text-red-400 hover:bg-red-500/10 transition-colors">
                    Cerrar Sesión
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={onAuthClick} className="glowing-button px-6 font-medium">
                Iniciar Sesión
              </Button>
            )}
          </div>

          {/* Botón de menú móvil */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden glass-card"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Menú móvil mejorado */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-6 border-t border-white/10 animate-slide-in">
            {/* Búsqueda móvil */}
            <form onSubmit={handleSearch} className="mb-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-12 glass-card border-0 text-white placeholder-gray-400"
                />
              </div>
            </form>

            {/* Acciones móviles */}
            <div className="space-y-3">
              <Button
                variant="ghost"
                className="w-full justify-start glass-card hover:bg-white/10 h-12"
                onClick={onCartClick}
              >
                <ShoppingCart className="mr-3 w-5 h-5" />
                Carrito ({totalCartItems})
              </Button>

              <Button
                variant="ghost"
                className="w-full justify-start glass-card hover:bg-white/10 h-12"
                onClick={onFilterClick}
              >
                <Menu className="mr-3 w-5 h-5" />
                Filtros
              </Button>

              {user ? (
                <>
                  <Button variant="ghost" className="w-full justify-start glass-card hover:bg-white/10 h-12">
                    <User className="mr-3 w-5 h-5" />
                    Mi Perfil
                  </Button>
                  <Button
                    variant="ghost"
                    className="w-full justify-start text-red-400 hover:bg-red-500/10 h-12"
                    onClick={onLogout}
                  >
                    Cerrar Sesión
                  </Button>
                </>
              ) : (
                <Button onClick={onAuthClick} className="w-full glowing-button h-12 font-medium">
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
