"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { ShoppingCart, Heart, Eye, Star, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"

interface Product {
  id: string | number
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating: number
  reviews: number
  specs: string[]
  isNew?: boolean
  isOnSale?: boolean
  brand: string
}

interface ProductCardEnhancedProps {
  product: Product
  onAddToCart: (product: Product) => void
  onToggleWishlist?: (productId: string | number) => void
  isWishlisted?: boolean
  isAddingToCart?: boolean
}

export default function ProductCardEnhanced({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted = false,
  isAddingToCart = false,
}: ProductCardEnhancedProps) {
  const [isHovered, setIsHovered] = useState(false)
  const { toast } = useToast()

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onAddToCart(product)
    toast({
      title: "Producto agregado",
      description: `${product.name} se agregó al carrito`,
    })
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onToggleWishlist?.(product.id)
    toast({
      title: isWishlisted ? "Eliminado de favoritos" : "Agregado a favoritos",
      description: `${product.name}`,
    })
  }

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("es-ES").format(price)
  }

  return (
    <Link href={`/producto/${product.id}`}>
      <Card
        className="group glass-card hover:scale-105 transition-all duration-300 overflow-hidden cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative">
          {/* Product Image */}
          <div className="aspect-square overflow-hidden bg-gradient-to-br from-slate-800 to-slate-900">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />

            {/* Overlay Actions */}
            <div
              className={`absolute inset-0 bg-black/50 flex items-center justify-center gap-2 transition-opacity duration-300 ${
                isHovered ? "opacity-100" : "opacity-0"
              }`}
            >
              <Button size="icon" variant="secondary" className="rounded-full">
                <Eye className="w-4 h-4" />
              </Button>
              {onToggleWishlist && (
                <Button
                  size="icon"
                  variant="secondary"
                  className={`rounded-full ${isWishlisted ? "text-red-500" : ""}`}
                  onClick={handleWishlist}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? "fill-current" : ""}`} />
                </Button>
              )}
            </div>
          </div>

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isNew && (
              <Badge className="bg-green-500 text-white">
                <Zap className="w-3 h-3 mr-1" />
                Nuevo
              </Badge>
            )}
            {product.isOnSale && discountPercentage > 0 && (
              <Badge className="bg-red-500 text-white">-{discountPercentage}%</Badge>
            )}
          </div>
        </div>

        <CardContent className="p-4">
          {/* Category */}
          <p className="text-sm text-purple-400 mb-1">{product.brand}</p>

          {/* Product Name */}
          <h3 className="font-semibold text-white mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-600"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-400">({product.reviews})</span>
          </div>

          {/* Specs */}
          <div className="mb-3">
            {product.specs.slice(0, 2).map((spec, index) => (
              <p key={index} className="text-xs text-gray-400">
                • {spec}
              </p>
            ))}
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl font-bold text-white">${formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">${formatPrice(product.originalPrice)}</span>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className="w-full glowing-button bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          >
            {isAddingToCart ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Agregando...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                Agregar al Carrito
              </div>
            )}
          </Button>
        </CardContent>
      </Card>
    </Link>
  )
}
