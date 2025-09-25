"use client"

import { useState } from "react"
import { X, Heart, ShoppingCart, Calendar, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface WishlistItem {
  id: number
  product: any
  dateAdded: string
  targetDate?: string
  notes?: string
}

interface WishlistModalProps {
  isOpen: boolean
  onClose: () => void
  wishlistItems: WishlistItem[]
  onRemoveFromWishlist: (productId: number) => void
  onAddToCart: (product: any) => void
}

export default function WishlistModal({
  isOpen,
  onClose,
  wishlistItems,
  onRemoveFromWishlist,
  onAddToCart,
}: WishlistModalProps) {
  const [targetDates, setTargetDates] = useState<{ [key: number]: string }>({})

  const handleSetTargetDate = (productId: number, date: string) => {
    setTargetDates((prev) => ({ ...prev, [productId]: date }))
  }

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("es-ES").format(price)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl bg-slate-800 border-slate-700 max-h-[90vh] overflow-y-auto">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute right-2 top-2 text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </Button>
          <CardTitle className="text-2xl text-center text-white flex items-center justify-center gap-2">
            <Heart className="w-6 h-6 text-pink-500" />
            Lista de Deseos
          </CardTitle>
        </CardHeader>
        <CardContent>
          {wishlistItems.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">Tu lista de deseos está vacía</p>
              <p className="text-gray-500 text-sm">Agrega productos que te gusten para comprarlos más tarde</p>
            </div>
          ) : (
            <div className="space-y-4">
              {wishlistItems.map((item) => (
                <div key={item.id} className="bg-slate-700 rounded-lg p-4 flex gap-4">
                  <img
                    src={item.product.image || "/placeholder.svg"}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />

                  <div className="flex-1 space-y-2">
                    <h3 className="text-white font-semibold">{item.product.name}</h3>
                    <p className="text-gray-400 text-sm">{item.product.description}</p>

                    <div className="flex items-center gap-4">
                      <span className="text-xl font-bold text-white">${formatPrice(item.product.price)}</span>
                      {item.product.originalPrice && (
                        <span className="text-gray-500 line-through">${formatPrice(item.product.originalPrice)}</span>
                      )}
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`date-${item.id}`} className="text-gray-300 text-sm">
                          Fecha objetivo:
                        </Label>
                        <div className="relative">
                          <Calendar className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                          <Input
                            id={`date-${item.id}`}
                            type="date"
                            value={targetDates[item.id] || ""}
                            onChange={(e) => handleSetTargetDate(item.id, e.target.value)}
                            className="pl-8 bg-slate-600 border-slate-500 text-white text-sm w-40"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button
                      onClick={() => onAddToCart(item.product)}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Agregar al Carrito
                    </Button>

                    <Button
                      onClick={() => onRemoveFromWishlist(item.product.id)}
                      variant="outline"
                      className="border-red-500 text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Eliminar
                    </Button>
                  </div>
                </div>
              ))}

              <div className="mt-6 p-4 bg-slate-700 rounded-lg">
                <h4 className="text-white font-semibold mb-2">Resumen de Lista de Deseos</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Total de productos:</span>
                    <span className="text-white ml-2">{wishlistItems.length}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Valor total:</span>
                    <span className="text-white ml-2">
                      ${formatPrice(wishlistItems.reduce((total, item) => total + item.product.price, 0))}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Ahorro potencial:</span>
                    <span className="text-green-400 ml-2">
                      $
                      {formatPrice(
                        wishlistItems.reduce(
                          (total, item) =>
                            total + (item.product.originalPrice ? item.product.originalPrice - item.product.price : 0),
                          0,
                        ),
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
