"use client"

import { useState } from "react"
import { ShoppingCart, Check, Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AddToCartButtonProps {
  product: any
  onAddToCart: (product: any, quantity: number) => void
  isInCart?: boolean
  cartQuantity?: number
  onUpdateQuantity?: (productId: number, quantity: number) => void
  disabled?: boolean
  className?: string
  size?: "sm" | "default" | "lg"
  showQuantityControls?: boolean
}

export default function AddToCartButton({
  product,
  onAddToCart,
  isInCart = false,
  cartQuantity = 0,
  onUpdateQuantity,
  disabled = false,
  className = "",
  size = "default",
  showQuantityControls = false,
}: AddToCartButtonProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [quantity, setQuantity] = useState(1)

  const handleAddToCart = async () => {
    if (disabled) return

    setIsAdding(true)
    onAddToCart(product, quantity)

    // Mostrar feedback visual
    setTimeout(() => {
      setIsAdding(false)
    }, 1000)
  }

  const handleUpdateQuantity = (newQuantity: number) => {
    if (onUpdateQuantity) {
      onUpdateQuantity(product.id, newQuantity)
    }
  }

  if (isInCart && showQuantityControls && onUpdateQuantity) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleUpdateQuantity(cartQuantity - 1)}
          className="w-8 h-8 p-0 border-white/20 text-white hover:bg-white/10 bg-transparent"
        >
          <Minus className="w-3 h-3" />
        </Button>
        <span className="w-8 text-center text-white font-medium">{cartQuantity}</span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleUpdateQuantity(cartQuantity + 1)}
          className="w-8 h-8 p-0 border-white/20 text-white hover:bg-white/10 bg-transparent"
        >
          <Plus className="w-3 h-3" />
        </Button>
      </div>
    )
  }

  return (
    <Button
      onClick={handleAddToCart}
      disabled={disabled || isAdding}
      size={size}
      className={`bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 transition-all duration-300 ${className}`}
    >
      {isAdding ? (
        <>
          <Check className="w-4 h-4 mr-2 animate-pulse" />
          {size === "sm" ? "Agregado" : "Agregado al Carrito"}
        </>
      ) : (
        <>
          <ShoppingCart className="w-4 h-4 mr-2" />
          {size === "sm" ? "Agregar" : "Agregar al Carrito"}
        </>
      )}
    </Button>
  )
}
