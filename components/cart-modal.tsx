"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Plus, Minus, Trash2, CreditCard, Truck, X } from "lucide-react"
import Link from "next/link"

interface CartItem {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  category: "desktop" | "laptop" | "mobile" | "accessories"
  brand: string
  quantity: number
  addedAt: string
}

interface CartModalProps {
  isOpen: boolean
  onClose: () => void
  cart: CartItem[]
  updateQuantity: (productId: number, quantity: number) => void
  removeFromCart: (productId: number) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
}

export default function CartModal({
  isOpen,
  onClose,
  cart,
  updateQuantity,
  removeFromCart,
  clearCart,
  getTotalPrice,
  getTotalItems,
}: CartModalProps) {
  const [isClient, setIsClient] = useState(false)

  useState(() => {
    setIsClient(true)
  }, [])

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("es-ES").format(price)
  }

  const getCategoryName = (category: string) => {
    switch (category) {
      case "desktop":
        return "Desktop"
      case "laptop":
        return "Laptop"
      case "mobile":
        return "Móvil"
      case "accessories":
        return "Accesorio"
      default:
        return "Producto"
    }
  }

  const totalPrice = getTotalPrice()
  const totalItems = getTotalItems()
  const shipping = totalPrice > 1000 ? 0 : 50
  const finalTotal = totalPrice + shipping

  if (cart.length === 0) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="bg-gradient-to-br from-slate-900 to-slate-800 border-white/20 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-white">
              <ShoppingCart className="w-5 h-5" />
              Carrito de Compras
            </DialogTitle>
          </DialogHeader>

          <div className="text-center py-12">
            <ShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">Tu carrito está vacío</h3>
            <p className="text-gray-400 mb-6">Agrega algunos productos para comenzar</p>
            <Button
              onClick={onClose}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              Continuar Comprando
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gradient-to-br from-slate-900 to-slate-800 border-white/20 text-white max-w-2xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center gap-2 text-white">
              <ShoppingCart className="w-5 h-5" />
              Carrito de Compras ({totalItems} {totalItems === 1 ? "producto" : "productos"})
            </DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearCart}
              className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              Vaciar
            </Button>
          </div>
        </DialogHeader>

        <div className="flex flex-col max-h-[60vh]">
          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {cart.map((item) => (
              <Card key={item.id} className="bg-white/5 border-white/10">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <Link href={`/producto/${item.id}`} onClick={onClose}>
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                      />
                    </Link>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <Badge className="text-xs mb-1 bg-purple-500">{item.brand}</Badge>
                          <Link href={`/producto/${item.id}`} onClick={onClose}>
                            <h4 className="font-medium text-white hover:text-purple-300 cursor-pointer line-clamp-2">
                              {item.name}
                            </h4>
                          </Link>
                          <p className="text-xs text-gray-400">{getCategoryName(item.category)}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-400 hover:text-red-300 hover:bg-red-500/10 p-1"
                        >
                          <X className="w-4 h-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white">
                            ${isClient ? formatPrice(item.price) : item.price}
                          </span>
                          {item.originalPrice && (
                            <span className="text-sm text-gray-500 line-through">
                              ${isClient ? formatPrice(item.originalPrice) : item.originalPrice}
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 p-0 text-white hover:bg-white/10"
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-8 text-center text-white font-medium">{item.quantity}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 p-0 text-white hover:bg-white/10"
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>

                      <div className="text-right mt-2">
                        <span className="text-sm text-gray-400">
                          Subtotal: ${isClient ? formatPrice(item.price * item.quantity) : item.price * item.quantity}
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Separator className="my-4 bg-white/20" />

          {/* Order Summary */}
          <div className="space-y-3">
            <div className="flex justify-between text-gray-300">
              <span>
                Subtotal ({totalItems} {totalItems === 1 ? "producto" : "productos"})
              </span>
              <span>${isClient ? formatPrice(totalPrice) : totalPrice}</span>
            </div>

            <div className="flex justify-between text-gray-300">
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4" />
                <span>Envío</span>
              </div>
              <span>
                {shipping === 0 ? (
                  <span className="text-green-400">Gratis</span>
                ) : (
                  `$${isClient ? formatPrice(shipping) : shipping}`
                )}
              </span>
            </div>

            {shipping > 0 && <p className="text-xs text-gray-400">Envío gratis en compras mayores a $1,000</p>}

            <Separator className="bg-white/20" />

            <div className="flex justify-between text-lg font-bold text-white">
              <span>Total</span>
              <span>${isClient ? formatPrice(finalTotal) : finalTotal}</span>
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                onClick={onClose}
                className="flex-1 border-white/20 text-white hover:bg-white/10 bg-transparent"
              >
                Continuar Comprando
              </Button>
              <Button className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                <CreditCard className="w-4 h-4 mr-2" />
                Proceder al Pago
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
