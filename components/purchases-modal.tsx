"use client"

import { useState } from "react"
import { X, ShoppingBag, Package, Truck, CheckCircle, Calendar, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Purchase {
  id: string
  date: string
  status: "pending" | "processing" | "shipped" | "delivered"
  total: number
  items: any[]
  paymentMethod: string
  shippingAddress: string
  trackingNumber?: string
}

interface PurchasesModalProps {
  isOpen: boolean
  onClose: () => void
  purchases: Purchase[]
}

// Datos de ejemplo para las compras
const samplePurchases: Purchase[] = [
  {
    id: "ORD-001",
    date: "2024-01-15",
    status: "delivered",
    total: 2499,
    items: [
      {
        name: 'MacBook Pro M3 16"',
        price: 2499,
        quantity: 1,
        image: "/placeholder.svg?height=60&width=60&text=MacBook",
      },
    ],
    paymentMethod: "Visa **** 1234",
    shippingAddress: "Calle Principal 123, Ciudad, País",
    trackingNumber: "TRK123456789",
  },
  {
    id: "ORD-002",
    date: "2024-01-20",
    status: "shipped",
    total: 1199,
    items: [
      { name: "iPhone 15 Pro Max", price: 1199, quantity: 1, image: "/placeholder.svg?height=60&width=60&text=iPhone" },
    ],
    paymentMethod: "Mastercard **** 5678",
    shippingAddress: "Calle Principal 123, Ciudad, País",
    trackingNumber: "TRK987654321",
  },
  {
    id: "ORD-003",
    date: "2024-01-25",
    status: "processing",
    total: 3299,
    items: [
      {
        name: "Gaming PC RTX 4090",
        price: 3299,
        quantity: 1,
        image: "/placeholder.svg?height=60&width=60&text=Gaming+PC",
      },
    ],
    paymentMethod: "Visa **** 1234",
    shippingAddress: "Calle Principal 123, Ciudad, País",
  },
]

export default function PurchasesModal({ isOpen, onClose, purchases = samplePurchases }: PurchasesModalProps) {
  const [selectedPurchase, setSelectedPurchase] = useState<Purchase | null>(null)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Calendar className="w-4 h-4" />
      case "processing":
        return <Package className="w-4 h-4" />
      case "shipped":
        return <Truck className="w-4 h-4" />
      case "delivered":
        return <CheckCircle className="w-4 h-4" />
      default:
        return <Package className="w-4 h-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500"
      case "processing":
        return "bg-blue-500"
      case "shipped":
        return "bg-purple-500"
      case "delivered":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Pendiente"
      case "processing":
        return "Procesando"
      case "shipped":
        return "Enviado"
      case "delivered":
        return "Entregado"
      default:
        return "Desconocido"
    }
  }

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("es-ES").format(price)
  }

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-6xl bg-slate-800 border-slate-700 max-h-[90vh] overflow-y-auto">
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
            <ShoppingBag className="w-6 h-6 text-purple-500" />
            Mis Compras
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-slate-700">
              <TabsTrigger value="all" className="text-white data-[state=active]:bg-purple-600">
                Todas
              </TabsTrigger>
              <TabsTrigger value="processing" className="text-white data-[state=active]:bg-purple-600">
                En Proceso
              </TabsTrigger>
              <TabsTrigger value="shipped" className="text-white data-[state=active]:bg-purple-600">
                Enviadas
              </TabsTrigger>
              <TabsTrigger value="delivered" className="text-white data-[state=active]:bg-purple-600">
                Entregadas
              </TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="space-y-4">
              {purchases.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg">No tienes compras registradas</p>
                  <p className="text-gray-500 text-sm">Tus pedidos aparecerán aquí una vez que realices una compra</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {purchases.map((purchase) => (
                    <div key={purchase.id} className="bg-slate-700 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-white font-semibold">Pedido #{purchase.id}</h3>
                          <p className="text-gray-400 text-sm">{formatDate(purchase.date)}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={`${getStatusColor(purchase.status)} text-white`}>
                            {getStatusIcon(purchase.status)}
                            <span className="ml-1">{getStatusText(purchase.status)}</span>
                          </Badge>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                        <div className="lg:col-span-2">
                          <h4 className="text-white font-medium mb-2">Productos</h4>
                          <div className="space-y-2">
                            {purchase.items.map((item, index) => (
                              <div key={index} className="flex items-center gap-3 bg-slate-600 rounded p-2">
                                <img
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  className="w-12 h-12 object-cover rounded"
                                />
                                <div className="flex-1">
                                  <p className="text-white text-sm font-medium">{item.name}</p>
                                  <p className="text-gray-400 text-xs">Cantidad: {item.quantity}</p>
                                </div>
                                <span className="text-white font-semibold">${formatPrice(item.price)}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <h4 className="text-white font-medium mb-2">Detalles del Pedido</h4>
                            <div className="bg-slate-600 rounded p-3 space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-gray-400">Total:</span>
                                <span className="text-white font-semibold">${formatPrice(purchase.total)}</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <CreditCard className="w-4 h-4 text-gray-400" />
                                <span className="text-gray-400">{purchase.paymentMethod}</span>
                              </div>
                              {purchase.trackingNumber && (
                                <div>
                                  <span className="text-gray-400">Seguimiento:</span>
                                  <span className="text-purple-400 ml-2">{purchase.trackingNumber}</span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div>
                            <h4 className="text-white font-medium mb-2">Dirección de Envío</h4>
                            <p className="text-gray-400 text-sm bg-slate-600 rounded p-3">{purchase.shippingAddress}</p>
                          </div>

                          {purchase.status === "shipped" && (
                            <Button className="w-full bg-purple-600 hover:bg-purple-700">Rastrear Pedido</Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </TabsContent>

            {/* Filtros por estado */}
            {["processing", "shipped", "delivered"].map((status) => (
              <TabsContent key={status} value={status} className="space-y-4">
                <div className="space-y-4">
                  {purchases
                    .filter((purchase) => purchase.status === status)
                    .map((purchase) => (
                      <div key={purchase.id} className="bg-slate-700 rounded-lg p-4">
                        {/* Mismo contenido que arriba pero filtrado */}
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-white font-semibold">Pedido #{purchase.id}</h3>
                            <p className="text-gray-400 text-sm">{formatDate(purchase.date)}</p>
                          </div>
                          <Badge className={`${getStatusColor(purchase.status)} text-white`}>
                            {getStatusIcon(purchase.status)}
                            <span className="ml-1">{getStatusText(purchase.status)}</span>
                          </Badge>
                        </div>
                        {/* Resto del contenido igual */}
                      </div>
                    ))}
                  {purchases.filter((purchase) => purchase.status === status).length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-gray-400">No hay pedidos con estado "{getStatusText(status)}"</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
