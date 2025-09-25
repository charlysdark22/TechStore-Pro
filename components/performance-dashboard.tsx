"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Activity, Users, ShoppingCart, TrendingUp, Clock, Zap, AlertTriangle } from "lucide-react"

interface PerformanceMetrics {
  loadTime: number
  memoryUsage: number
  activeUsers: number
  cartConversions: number
  errorRate: number
}

export default function PerformanceDashboard() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    loadTime: 0,
    memoryUsage: 0,
    activeUsers: 0,
    cartConversions: 0,
    errorRate: 0,
  })

  useEffect(() => {
    // Simular métricas de rendimiento
    const updateMetrics = () => {
      setMetrics({
        loadTime: Math.random() * 2 + 0.5, // 0.5-2.5 segundos
        memoryUsage: Math.random() * 40 + 30, // 30-70%
        activeUsers: Math.floor(Math.random() * 100) + 50,
        cartConversions: Math.random() * 15 + 5, // 5-20%
        errorRate: Math.random() * 2, // 0-2%
      })
    }

    updateMetrics()
    const interval = setInterval(updateMetrics, 5000)
    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (value: number, thresholds: { good: number; warning: number }) => {
    if (value <= thresholds.good) return "text-green-400"
    if (value <= thresholds.warning) return "text-yellow-400"
    return "text-red-400"
  }

  const getStatusBadge = (value: number, thresholds: { good: number; warning: number }) => {
    if (value <= thresholds.good) return <Badge className="bg-green-500">Excelente</Badge>
    if (value <= thresholds.warning) return <Badge className="bg-yellow-500">Bueno</Badge>
    return <Badge className="bg-red-500">Necesita Atención</Badge>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
      {/* Tiempo de Carga */}
      <Card className="glass-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white">Tiempo de Carga</CardTitle>
          <Clock className="h-4 w-4 text-purple-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white mb-2">{metrics.loadTime.toFixed(2)}s</div>
          {getStatusBadge(metrics.loadTime, { good: 1, warning: 2 })}
          <Progress value={Math.min((metrics.loadTime / 3) * 100, 100)} className="mt-2" />
        </CardContent>
      </Card>

      {/* Uso de Memoria */}
      <Card className="glass-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white">Uso de Memoria</CardTitle>
          <Activity className="h-4 w-4 text-purple-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white mb-2">{metrics.memoryUsage.toFixed(1)}%</div>
          {getStatusBadge(metrics.memoryUsage, { good: 50, warning: 70 })}
          <Progress value={metrics.memoryUsage} className="mt-2" />
        </CardContent>
      </Card>

      {/* Usuarios Activos */}
      <Card className="glass-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white">Usuarios Activos</CardTitle>
          <Users className="h-4 w-4 text-purple-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white mb-2">{metrics.activeUsers}</div>
          <Badge className="bg-blue-500">En Línea</Badge>
          <div className="flex items-center mt-2 text-sm text-gray-400">
            <TrendingUp className="w-4 h-4 mr-1" />
            +12% vs ayer
          </div>
        </CardContent>
      </Card>

      {/* Conversión de Carrito */}
      <Card className="glass-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white">Conversión de Carrito</CardTitle>
          <ShoppingCart className="h-4 w-4 text-purple-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white mb-2">{metrics.cartConversions.toFixed(1)}%</div>
          {getStatusBadge(metrics.cartConversions, { good: 10, warning: 7 })}
          <Progress value={metrics.cartConversions} className="mt-2" />
        </CardContent>
      </Card>

      {/* Tasa de Error */}
      <Card className="glass-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white">Tasa de Error</CardTitle>
          <AlertTriangle className="h-4 w-4 text-purple-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white mb-2">{metrics.errorRate.toFixed(2)}%</div>
          {getStatusBadge(metrics.errorRate, { good: 1, warning: 2 })}
          <Progress value={Math.min(metrics.errorRate * 10, 100)} className="mt-2" />
        </CardContent>
      </Card>

      {/* Rendimiento General */}
      <Card className="glass-card">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-white">Rendimiento General</CardTitle>
          <Zap className="h-4 w-4 text-purple-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-white mb-2">92/100</div>
          <Badge className="bg-green-500">Excelente</Badge>
          <div className="text-sm text-gray-400 mt-2">Todos los sistemas funcionando correctamente</div>
        </CardContent>
      </Card>
    </div>
  )
}
