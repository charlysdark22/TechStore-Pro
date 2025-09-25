"use client"
import { X, Plus, Minus, ShoppingBag, Truck, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useCart } from "@/hooks/use-cart"
import Link from "next/link"
import Image from "next/image"

interface CartModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartModal({ isOpen, onClose }: CartModalProps) {
  const { cartItems, updateQuantity, removeFromCart, getTotalPrice, getShippingCost, getFinalTotal, clearCart } =
    useCart()

  if (!isOpen) return null

  const handleCheckout = () => {
    // Aquí iría la lógica de checkout
    alert("Redirigiendo al checkout...")
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-2xl max-h-[90vh] m-4 glass-card animate-slide-in overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Carrito de Compras</h2>
              <p className="text-gray-400">{cartItems.length} productos</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-white/10">
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex flex-col max-h-[calc(90vh-200px)]">
          {cartItems.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
              <div className="w-24 h-24 bg-gray-700 rounded-full flex items-center justify-center mb-6">
                <ShoppingBag className="w-12 h-12 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Tu carrito está vacío</h3>
              <p className="text-gray-400 mb-6">Agrega algunos productos para comenzar</p>
              <Button onClick={onClose} className="glowing-button">
                Continuar Comprando
              </Button>
            </div>
          ) : (
            <>
              {/* Items List */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="glass-card p-4 rounded-xl">
                    <div className="flex items-center space-x-4">
                      {/* Product Image */}
                      <div className="relative w-16 h-16 bg-gray-700 rounded-lg overflow-hidden">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/producto/${item.id}`}
                          onClick={onClose}
                          className="block hover:text-green-400 transition-colors"
                        >
                          <h4 className="font-semibold text-white truncate">{item.name}</h4>
                        </Link>
                        <p className="text-sm text-gray-400">{item.category}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-lg font-bold text-green-400">${item.price.toLocaleString()}</span>
                          {item.brand && (
                            <Badge variant="outline" className="text-xs">
                              {item.brand}
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 hover:bg-white/10"
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span className="w-8 text-center font-medium text-white">{item.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 hover:bg-white/10"
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Remove Button */}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFromCart(item.id)}
                        className="w-8 h-8 hover:bg-red-500/20 hover:text-red-400"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="border-t border-white/10 p-6 space-y-4">
                {/* Shipping Info */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Truck className="w-4 h-4" />
                    <span>Envío</span>
                  </div>
                  <span className="text-white">
                    {getShippingCost() === 0 ? <Badge className="bg-green-500">GRATIS</Badge> : `$${getShippingCost()}`}
                  </span>
                </div>

                <Separator className="bg-white/10" />

                {/* Totals */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="text-white">${getTotalPrice().toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-lg font-bold">
                    <span className="text-white">Total</span>
                    <span className="text-green-400">${getFinalTotal().toLocaleString()}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-3 pt-4">
                  <Button variant="outline" onClick={clearCart} className="flex-1 secondary-button bg-transparent">
                    Vaciar Carrito
                  </Button>
                  <Button onClick={handleCheckout} className="flex-1 glowing-button">
                    <CreditCard className="w-4 h-4 mr-2" />
                    Proceder al Pago
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
