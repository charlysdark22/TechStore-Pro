"use client"

import type React from "react"

import { useState } from "react"
import { X, User, Mail, Phone, MapPin, CreditCard, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ProfileModalProps {
  isOpen: boolean
  onClose: () => void
  user: any
  onUpdateUser: (userData: any) => void
}

export default function ProfileModal({ isOpen, onClose, user, onUpdateUser }: ProfileModalProps) {
  const [personalData, setPersonalData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    country: "",
    birthDate: "",
  })

  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    cardType: "",
  })

  const handlePersonalSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onUpdateUser({ ...user, ...personalData })
    alert("Datos personales actualizados correctamente")
  }

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simular guardado de datos de pago
    alert("Método de pago guardado correctamente")
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl bg-slate-800 border-slate-700 max-h-[90vh] overflow-y-auto">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute right-2 top-2 text-gray-400 hover:text-white"
          >
            <X className="w-4 h-4" />
          </Button>
          <CardTitle className="text-2xl text-center text-white">Mi Perfil</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="personal" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-slate-700">
              <TabsTrigger value="personal" className="text-white data-[state=active]:bg-purple-600">
                Datos Personales
              </TabsTrigger>
              <TabsTrigger value="payment" className="text-white data-[state=active]:bg-purple-600">
                Método de Pago
              </TabsTrigger>
            </TabsList>

            <TabsContent value="personal" className="space-y-4">
              <form onSubmit={handlePersonalSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-300">
                      Nombre completo
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="name"
                        value={personalData.name}
                        onChange={(e) => setPersonalData((prev) => ({ ...prev, name: e.target.value }))}
                        className="pl-10 bg-slate-700 border-slate-600 text-white"
                        placeholder="Tu nombre completo"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">
                      Correo electrónico
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="email"
                        type="email"
                        value={personalData.email}
                        onChange={(e) => setPersonalData((prev) => ({ ...prev, email: e.target.value }))}
                        className="pl-10 bg-slate-700 border-slate-600 text-white"
                        placeholder="tu@email.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-gray-300">
                      Teléfono
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="phone"
                        value={personalData.phone}
                        onChange={(e) => setPersonalData((prev) => ({ ...prev, phone: e.target.value }))}
                        className="pl-10 bg-slate-700 border-slate-600 text-white"
                        placeholder="+1 234 567 8900"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="birthDate" className="text-gray-300">
                      Fecha de nacimiento
                    </Label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <Input
                        id="birthDate"
                        type="date"
                        value={personalData.birthDate}
                        onChange={(e) => setPersonalData((prev) => ({ ...prev, birthDate: e.target.value }))}
                        className="pl-10 bg-slate-700 border-slate-600 text-white"
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-gray-300">
                    Dirección
                  </Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="address"
                      value={personalData.address}
                      onChange={(e) => setPersonalData((prev) => ({ ...prev, address: e.target.value }))}
                      className="pl-10 bg-slate-700 border-slate-600 text-white"
                      placeholder="Calle, número, colonia"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-gray-300">
                      Ciudad
                    </Label>
                    <Input
                      id="city"
                      value={personalData.city}
                      onChange={(e) => setPersonalData((prev) => ({ ...prev, city: e.target.value }))}
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="Tu ciudad"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="country" className="text-gray-300">
                      País
                    </Label>
                    <Select onValueChange={(value) => setPersonalData((prev) => ({ ...prev, country: value }))}>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue placeholder="Selecciona tu país" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        <SelectItem value="mx">México</SelectItem>
                        <SelectItem value="us">Estados Unidos</SelectItem>
                        <SelectItem value="es">España</SelectItem>
                        <SelectItem value="ar">Argentina</SelectItem>
                        <SelectItem value="co">Colombia</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  Guardar Datos Personales
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="payment" className="space-y-4">
              <form onSubmit={handlePaymentSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber" className="text-gray-300">
                    Número de tarjeta
                  </Label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      id="cardNumber"
                      value={paymentData.cardNumber}
                      onChange={(e) => setPaymentData((prev) => ({ ...prev, cardNumber: e.target.value }))}
                      className="pl-10 bg-slate-700 border-slate-600 text-white"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cardName" className="text-gray-300">
                    Nombre en la tarjeta
                  </Label>
                  <Input
                    id="cardName"
                    value={paymentData.cardName}
                    onChange={(e) => setPaymentData((prev) => ({ ...prev, cardName: e.target.value }))}
                    className="bg-slate-700 border-slate-600 text-white"
                    placeholder="Nombre como aparece en la tarjeta"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate" className="text-gray-300">
                      Fecha de vencimiento
                    </Label>
                    <Input
                      id="expiryDate"
                      value={paymentData.expiryDate}
                      onChange={(e) => setPaymentData((prev) => ({ ...prev, expiryDate: e.target.value }))}
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="MM/AA"
                      maxLength={5}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="cvv" className="text-gray-300">
                      CVV
                    </Label>
                    <Input
                      id="cvv"
                      value={paymentData.cvv}
                      onChange={(e) => setPaymentData((prev) => ({ ...prev, cvv: e.target.value }))}
                      className="bg-slate-700 border-slate-600 text-white"
                      placeholder="123"
                      maxLength={4}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-gray-300">Tipo de tarjeta</Label>
                  <Select onValueChange={(value) => setPaymentData((prev) => ({ ...prev, cardType: value }))}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="Selecciona el tipo de tarjeta" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="visa">Visa</SelectItem>
                      <SelectItem value="mastercard">Mastercard</SelectItem>
                      <SelectItem value="amex">American Express</SelectItem>
                      <SelectItem value="discover">Discover</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                >
                  Guardar Método de Pago
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
