"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Monitor,
  Laptop,
  Smartphone,
  Headphones,
  TrendingUp,
  Zap,
  Shield,
  Truck,
  Award,
  ArrowRight,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import EnhancedHeader from "@/components/enhanced-header"
import { useCart } from "@/hooks/use-cart"
import CartModal from "@/components/cart-modal"
import AuthModal from "@/components/auth-modal"
import Link from "next/link"

const categories = [
  {
    id: "desktop",
    name: "Computadoras",
    icon: Monitor,
    description: "PCs de alto rendimiento",
    gradient: "from-blue-500 to-cyan-500",
    href: "/desktop",
    products: "150+ productos",
  },
  {
    id: "laptops",
    name: "Laptops",
    icon: Laptop,
    description: "Portátiles para trabajo y gaming",
    gradient: "from-purple-500 to-pink-500",
    href: "/laptops",
    products: "200+ productos",
  },
  {
    id: "moviles",
    name: "Móviles",
    icon: Smartphone,
    description: "Smartphones de última generación",
    gradient: "from-green-500 to-emerald-500",
    href: "/moviles",
    products: "300+ productos",
  },
  {
    id: "accesorios",
    name: "Accesorios",
    icon: Headphones,
    description: "Complementos tecnológicos",
    gradient: "from-orange-500 to-red-500",
    href: "/accesorios",
    products: "500+ productos",
  },
]

const features = [
  {
    icon: Shield,
    title: "Garantía Extendida",
    description: "Protección completa por 2 años",
  },
  {
    icon: Truck,
    title: "Envío Express",
    description: "Entrega en 24-48 horas",
  },
  {
    icon: Award,
    title: "Calidad Premium",
    description: "Solo productos certificados",
  },
  {
    icon: Zap,
    title: "Soporte 24/7",
    description: "Asistencia técnica siempre",
  },
]

export default function HomePage() {
  const { cartItems, getTotalItems } = useCart()
  const [showCart, setShowCart] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [user, setUser] = useState(null)

  const handleAuth = () => setShowAuth(true)
  const handleLogout = () => setUser(null)

  return (
    <div className="min-h-screen">
      {/* Efecto de partículas de fondo */}
      <div className="particles-bg">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <EnhancedHeader
        onCartClick={() => setShowCart(true)}
        onFilterClick={() => {}}
        totalCartItems={getTotalItems()}
        user={user}
        onAuthClick={handleAuth}
        onLogout={handleLogout}
      />

      {/* Hero Section Mejorado */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <Badge className="mb-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 text-sm font-medium animate-pulse">
              <Sparkles className="w-4 h-4 mr-2" />
              ¡Nuevos productos cada semana!
            </Badge>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 gradient-text text-glow">
              Tecnología del
              <br />
              <span className="gradient-text-secondary">Futuro</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Descubre los productos más innovadores con la mejor calidad y precios increíbles
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button className="glowing-button px-8 py-4 text-lg font-medium group">
                Explorar Productos
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button variant="outline" className="secondary-button px-8 py-4 text-lg bg-transparent">
                Ver Ofertas
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Elementos decorativos */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-green-500/20 rounded-full blur-xl animate-float" />
        <div
          className="absolute bottom-20 right-10 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute top-1/2 left-1/4 w-16 h-16 bg-purple-500/20 rounded-full blur-xl animate-float"
          style={{ animationDelay: "4s" }}
        />
      </section>

      {/* Características destacadas */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="glass-card product-card text-center p-6 h-full">
                  <CardContent className="p-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
                      <feature.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categorías principales */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Explora Nuestras Categorías</h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Encuentra exactamente lo que necesitas en nuestras categorías especializadas
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={category.href}>
                  <Card className="glass-card product-card group cursor-pointer h-full overflow-hidden">
                    <CardContent className="p-0">
                      {/* Header con gradiente */}
                      <div className={`bg-gradient-to-br ${category.gradient} p-6 relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-black/20" />
                        <div className="relative z-10 flex items-center justify-between">
                          <category.icon className="w-12 h-12 text-white animate-float" />
                          <Badge className="bg-white/20 text-white border-0">{category.products}</Badge>
                        </div>
                      </div>

                      {/* Contenido */}
                      <div className="p-6">
                        <h3 className="text-2xl font-bold text-white mb-2 group-hover:gradient-text transition-all">
                          {category.name}
                        </h3>
                        <p className="text-gray-400 mb-4">{category.description}</p>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center text-green-400">
                            <TrendingUp className="w-4 h-4 mr-1" />
                            <span className="text-sm">Populares</span>
                          </div>
                          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-green-400 group-hover:translate-x-1 transition-all" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección de estadísticas */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-900/20 to-emerald-900/20">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">10K+</div>
              <p className="text-gray-400">Productos Disponibles</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">50K+</div>
              <p className="text-gray-400">Clientes Satisfechos</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="text-4xl md:text-5xl font-bold gradient-text mb-2">99%</div>
              <p className="text-gray-400">Satisfacción Garantizada</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer mejorado */}
      <footer className="py-16 px-4 border-t border-white/10">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-600 rounded-xl flex items-center justify-center animate-pulse-glow mr-4">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-bold gradient-text">TechStore Pro</h3>
          </div>
          <p className="text-gray-400 mb-6 max-w-2xl mx-auto">
            Tu destino para la mejor tecnología. Calidad garantizada, precios increíbles y servicio excepcional.
          </p>
          <div className="flex items-center justify-center space-x-6 text-gray-400">
            <span>© 2024 TechStore Pro</span>
            <span>•</span>
            <span>Todos los derechos reservados</span>
          </div>
        </div>
      </footer>

      {/* Modales */}
      <CartModal isOpen={showCart} onClose={() => setShowCart(false)} />

      <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} onLogin={setUser} />
    </div>
  )
}
