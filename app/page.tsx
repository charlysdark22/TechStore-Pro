"use client"

import { useState, useEffect } from "react"
import { ShoppingCart, Heart, Star, Monitor, Cpu, Smartphone, Headphones, Zap, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import AuthModal from "@/components/auth-modal"
import UserMenu from "@/components/user-menu"
import ProfileModal from "@/components/profile-modal"
import WishlistModal from "@/components/wishlist-modal"
import PurchasesModal from "@/components/purchases-modal"
import { useCart } from "@/hooks/use-cart"
import CartModal from "@/components/cart-modal"
import CartIcon from "@/components/cart-icon"
import AddToCartButton from "@/components/add-to-cart-button"

interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  category: "desktop" | "laptop" | "mobile" | "accessories"
  rating: number
  specs: string[]
  description: string
  isNew?: boolean
  discount?: number
  brand: string
  stock?: number
}

interface Category {
  id: string
  name: string
  icon: any
  description: string
  gradient: string
  href: string
  productCount: number
}

const categories: Category[] = [
  {
    id: "desktop",
    name: "Desktop",
    icon: Monitor,
    description: "Computadoras de escritorio potentes",
    gradient: "from-blue-600 to-cyan-600",
    href: "/desktop",
    productCount: 6,
  },
  {
    id: "laptop",
    name: "Laptops",
    icon: Cpu,
    description: "Portátiles para trabajo y gaming",
    gradient: "from-purple-600 to-pink-600",
    href: "/laptops",
    productCount: 6,
  },
  {
    id: "mobile",
    name: "Móviles",
    icon: Smartphone,
    description: "Smartphones de última generación",
    gradient: "from-green-600 to-emerald-600",
    href: "/moviles",
    productCount: 6,
  },
  {
    id: "accessories",
    name: "Accesorios",
    icon: Headphones,
    description: "Periféricos y complementos",
    gradient: "from-orange-600 to-red-600",
    href: "/accesorios",
    productCount: 8,
  },
]

const featuredProducts: Product[] = [
  {
    id: 1,
    name: "Gaming PC RTX 4090 Ultimate",
    price: 3299,
    originalPrice: 3599,
    image: "/placeholder.svg?height=400&width=600&text=Gaming+PC+RTX+4090",
    category: "desktop",
    rating: 4.8,
    specs: ["Intel i9-13900K", "RTX 4090", "64GB DDR5", "2TB NVMe"],
    description: "La bestia definitiva para gaming en 4K con ray tracing.",
    discount: 8,
    brand: "Custom Build",
    stock: 15,
    isNew: true,
  },
  {
    id: 4,
    name: 'MacBook Pro M3 16" Space Black',
    price: 2499,
    originalPrice: 2799,
    image: "/placeholder.svg?height=400&width=600&text=MacBook+Pro+M3",
    category: "laptop",
    rating: 4.9,
    specs: ["Apple M3 Pro", "32GB RAM", "1TB SSD", '16.2" Retina'],
    description: "La laptop más potente de Apple redefinida con M3 Pro.",
    discount: 11,
    brand: "Apple",
    stock: 12,
    isNew: true,
  },
  {
    id: 7,
    name: "iPhone 15 Pro Max Titanium",
    price: 1199,
    originalPrice: 1299,
    image: "/placeholder.svg?height=400&width=600&text=iPhone+15+Pro+Max",
    category: "mobile",
    rating: 4.7,
    specs: ["A17 Pro", "256GB", "48MP Camera", "Titanium"],
    description: "El iPhone más avanzado con titanio y chip A17 Pro.",
    discount: 8,
    brand: "Apple",
    stock: 25,
    isNew: true,
  },
  {
    id: 10,
    name: "AirPods Pro 2nd Gen USB-C",
    price: 249,
    originalPrice: 279,
    image: "/placeholder.svg?height=400&width=600&text=AirPods+Pro+2",
    category: "accessories",
    rating: 4.8,
    specs: ["Chip H2", "Cancelación adaptativa", "30h batería", "USB-C"],
    description: "Auriculares con cancelación de ruido de siguiente nivel.",
    discount: 11,
    brand: "Apple",
    stock: 50,
  },
]

export default function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [wishlist, setWishlist] = useState<number[]>([])
  const [wishlistItems, setWishlistItems] = useState<any[]>([])
  const [user, setUser] = useState<any>(null)
  const [isClient, setIsClient] = useState(false)

  // Modal states
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [isWishlistModalOpen, setIsWishlistModalOpen] = useState(false)
  const [isPurchasesModalOpen, setIsPurchasesModalOpen] = useState(false)
  const [isCartModalOpen, setIsCartModalOpen] = useState(false)

  // Cart hook
  const {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    isInCart,
    getCartItem,
  } = useCart()

  useEffect(() => {
    setIsClient(true)
  }, [])

  const toggleWishlist = (productId: number) => {
    const product = featuredProducts.find((p) => p.id === productId)
    if (!product) return

    if (wishlist.includes(productId)) {
      setWishlist((prev) => prev.filter((id) => id !== productId))
      setWishlistItems((prev) => prev.filter((item) => item.product.id !== productId))
    } else {
      setWishlist((prev) => [...prev, productId])
      setWishlistItems((prev) => [
        ...prev,
        {
          id: Date.now(),
          product,
          dateAdded: new Date().toISOString(),
        },
      ])
    }
  }

  const removeFromWishlist = (productId: number) => {
    setWishlist((prev) => prev.filter((id) => id !== productId))
    setWishlistItems((prev) => prev.filter((item) => item.product.id !== productId))
  }

  const handleLogin = (userData: any) => {
    setUser(userData)
  }

  const handleLogout = () => {
    setUser(null)
    setWishlist([])
    setWishlistItems([])
  }

  const handleUpdateUser = (userData: any) => {
    setUser(userData)
  }

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat("es-ES").format(price)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white">TechStore</h1>
              <p className="text-purple-200 text-sm">Tu tienda de tecnología</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative" onClick={() => setIsWishlistModalOpen(true)}>
              <Heart className="w-5 h-5" />
              {wishlist.length > 0 && (
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-pink-500 text-xs">
                  {wishlist.length}
                </Badge>
              )}
            </Button>

            <CartIcon itemCount={getTotalItems()} onClick={() => setIsCartModalOpen(true)} />

            {user ? (
              <UserMenu
                user={user}
                onLogout={handleLogout}
                onOpenProfile={() => setIsProfileModalOpen(true)}
                onOpenWishlist={() => setIsWishlistModalOpen(true)}
                onOpenPurchases={() => setIsPurchasesModalOpen(true)}
              />
            ) : (
              <Button
                onClick={() => setIsAuthModalOpen(true)}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                Iniciar Sesión
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
              Descubre la Tecnología del Futuro
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Encuentra los mejores productos tecnológicos con precios increíbles y la calidad que mereces
            </p>
            <div className="flex items-center justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                <span>Más de 1000 productos</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400" />
                <span>Calificación 4.8/5</span>
              </div>
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-4 h-4 text-blue-400" />
                <span>Envío gratis</span>
              </div>
            </div>
          </div>

          {/* Featured Product Display */}
          {selectedProduct && (
            <div className="mb-16 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="relative">
                  <img
                    src={selectedProduct.image || "/placeholder.svg"}
                    alt={selectedProduct.name}
                    className="w-full h-80 object-cover rounded-2xl"
                  />
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {selectedProduct.isNew && <Badge className="bg-green-500 text-white">Nuevo</Badge>}
                    {selectedProduct.discount && (
                      <Badge className="bg-red-500 text-white">-{selectedProduct.discount}%</Badge>
                    )}
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <Badge className="mb-2 bg-purple-500">{selectedProduct.brand}</Badge>
                    <h3 className="text-3xl font-bold mb-4 text-white">{selectedProduct.name}</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(selectedProduct.rating) ? "text-yellow-400 fill-current" : "text-gray-600"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-gray-400">({selectedProduct.rating})</span>
                    </div>
                  </div>

                  <p className="text-gray-300 text-lg">{selectedProduct.description}</p>

                  <div className="grid grid-cols-2 gap-3">
                    {selectedProduct.specs.map((spec, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm">
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                        <span className="text-gray-300">{spec}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-3xl font-bold text-white">
                      ${isClient ? formatPrice(selectedProduct.price) : selectedProduct.price}
                    </span>
                    {selectedProduct.originalPrice && (
                      <span className="text-xl text-gray-500 line-through">
                        ${isClient ? formatPrice(selectedProduct.originalPrice) : selectedProduct.originalPrice}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-4">
                    <AddToCartButton
                      product={selectedProduct}
                      onAddToCart={(prod, qty) => addToCart(prod, qty)}
                      isInCart={isInCart(selectedProduct.id)}
                      cartQuantity={getCartItem(selectedProduct.id)?.quantity || 0}
                      onUpdateQuantity={updateQuantity}
                      showQuantityControls={true}
                      className="flex-1"
                      size="lg"
                    />
                    <Button
                      onClick={() => toggleWishlist(selectedProduct.id)}
                      variant="outline"
                      className={`px-6 border-2 transition-all duration-300 ${
                        wishlist.includes(selectedProduct.id)
                          ? "border-pink-500 bg-pink-500/20 text-pink-400"
                          : "border-white/30 hover:border-pink-500 hover:bg-pink-500/10"
                      }`}
                    >
                      <Heart className={`w-5 h-5 ${wishlist.includes(selectedProduct.id) ? "fill-current" : ""}`} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Categories Section */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-center mb-12 text-white">Explora Nuestras Categorías</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {categories.map((category) => {
                const IconComponent = category.icon
                return (
                  <Link key={category.id} href={category.href}>
                    <Card className="group bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer hover:scale-105">
                      <CardContent className="p-6 text-center">
                        <div
                          className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${category.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                        >
                          <IconComponent className="w-8 h-8 text-white" />
                        </div>
                        <h4 className="text-xl font-semibold text-white mb-2">{category.name}</h4>
                        <p className="text-gray-400 text-sm mb-3">{category.description}</p>
                        <Badge className="bg-white/10 text-white">{category.productCount} productos</Badge>
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </div>

          {/* Featured Products Section */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-3xl font-bold text-white">Productos Destacados</h3>
              <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2">
                ¡Ofertas Especiales!
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <Card
                  key={product.id}
                  className="group bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer hover:scale-105"
                  onClick={() => setSelectedProduct(product)}
                >
                  <CardContent className="p-4">
                    <div className="relative mb-4">
                      <img
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-48 object-cover rounded-lg"
                      />
                      <div className="absolute top-2 left-2 flex flex-col gap-1">
                        {product.isNew && <Badge className="bg-green-500 text-white text-xs">Nuevo</Badge>}
                        {product.discount && (
                          <Badge className="bg-red-500 text-white text-xs">-{product.discount}%</Badge>
                        )}
                      </div>
                      <Button
                        onClick={(e) => {
                          e.stopPropagation()
                          toggleWishlist(product.id)
                        }}
                        variant="ghost"
                        size="icon"
                        className={`absolute top-2 right-2 ${
                          wishlist.includes(product.id) ? "text-pink-500" : "text-white"
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? "fill-current" : ""}`} />
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Badge className="text-xs bg-purple-500">{product.brand}</Badge>
                      <h4 className="font-semibold text-white line-clamp-2">{product.name}</h4>
                      <div className="flex items-center gap-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3 h-3 ${
                                i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-600"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-gray-400">({product.rating})</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">
                          ${isClient ? formatPrice(product.price) : product.price}
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            ${isClient ? formatPrice(product.originalPrice) : product.originalPrice}
                          </span>
                        )}
                      </div>

                      <AddToCartButton
                        product={product}
                        onAddToCart={(prod, qty) => addToCart(prod, qty)}
                        isInCart={isInCart(product.id)}
                        size="sm"
                        className="w-full"
                        onClick={(e: any) => e.stopPropagation()}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center mb-16">
            <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-3xl p-12 border border-white/20">
              <h3 className="text-3xl font-bold text-white mb-4">¿No encuentras lo que buscas?</h3>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Explora todas nuestras categorías y descubre miles de productos con las mejores ofertas del mercado
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {categories.map((category) => (
                  <Link key={category.id} href={category.href}>
                    <Button
                      variant="outline"
                      className={`border-white/20 text-white hover:bg-gradient-to-r hover:${category.gradient} hover:border-transparent bg-transparent`}
                    >
                      Ver {category.name}
                    </Button>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modals */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} onLogin={handleLogin} />

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        user={user}
        onUpdateUser={handleUpdateUser}
      />

      <WishlistModal
        isOpen={isWishlistModalOpen}
        onClose={() => setIsWishlistModalOpen(false)}
        wishlistItems={wishlistItems}
        onRemoveFromWishlist={removeFromWishlist}
        onAddToCart={(product) => addToCart(product, 1)}
      />

      <PurchasesModal isOpen={isPurchasesModalOpen} onClose={() => setIsPurchasesModalOpen(false)} purchases={[]} />

      <CartModal
        isOpen={isCartModalOpen}
        onClose={() => setIsCartModalOpen(false)}
        cart={cart}
        updateQuantity={updateQuantity}
        removeFromCart={removeFromCart}
        clearCart={clearCart}
        getTotalPrice={getTotalPrice}
        getTotalItems={getTotalItems}
      />
    </div>
  )
}
