"use client"

import { useState, useEffect } from "react"
import { ShoppingCart, Heart, Star, Cpu, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import AuthModal from "@/components/auth-modal"
import UserMenu from "@/components/user-menu"
import ProfileModal from "@/components/profile-modal"
import WishlistModal from "@/components/wishlist-modal"
import PurchasesModal from "@/components/purchases-modal"
import AdvancedFilters from "@/components/advanced-filters"
import SearchAndFilterBar from "@/components/search-and-filter-bar"
import { useProductFilters } from "@/hooks/use-product-filters"
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

const laptopProducts: Product[] = [
  {
    id: 4,
    name: 'MacBook Pro M3 16"',
    price: 2499,
    originalPrice: 2799,
    image: "/placeholder.svg?height=400&width=600&text=MacBook+Pro+M3",
    category: "laptop",
    rating: 4.9,
    specs: ["Apple M3 Pro", "32GB RAM", "1TB SSD", '16.2" Retina', "20h batería", "Touch ID"],
    description:
      "La laptop más potente de Apple con el revolucionario chip M3 Pro. Perfecta para profesionales creativos y desarrolladores que necesitan máximo rendimiento.",
    isNew: true,
    discount: 11,
    brand: "Apple",
    stock: 12,
  },
  {
    id: 5,
    name: "Dell XPS 13 Plus",
    price: 1599,
    originalPrice: 1799,
    image: "/placeholder.svg?height=400&width=600&text=Dell+XPS+13+Plus",
    category: "laptop",
    rating: 4.6,
    specs: ["Intel i7-13700H", "16GB RAM", "512GB SSD", '13.4" OLED', "12h batería", "Thunderbolt 4"],
    description:
      "Ultrabook premium con pantalla OLED infinita y diseño minimalista para máxima productividad y portabilidad.",
    discount: 11,
    brand: "Dell",
    stock: 18,
  },
  {
    id: 6,
    name: "ASUS ROG Strix G16",
    price: 1899,
    originalPrice: 2199,
    image: "/placeholder.svg?height=400&width=600&text=ASUS+ROG+Strix",
    category: "laptop",
    rating: 4.7,
    specs: ["Intel i7-13650HX", "RTX 4060", "16GB DDR5", "1TB SSD", "RGB Keyboard", "165Hz Display"],
    description:
      "Laptop gaming con diseño agresivo y rendimiento excepcional para los juegos más exigentes en alta resolución.",
    discount: 14,
    brand: "ASUS",
    stock: 8,
  },
  {
    id: 7,
    name: "MacBook Air M2",
    price: 1199,
    originalPrice: 1299,
    image: "/placeholder.svg?height=400&width=600&text=MacBook+Air+M2",
    category: "laptop",
    rating: 4.8,
    specs: ["Apple M2", "16GB RAM", "512GB SSD", '13.6" Liquid Retina', "18h batería", "MagSafe"],
    description:
      "Ultrabook ligero y potente con el chip M2, perfecto para estudiantes y profesionales que valoran la portabilidad.",
    discount: 8,
    brand: "Apple",
    stock: 25,
  },
  {
    id: 8,
    name: "Lenovo ThinkPad X1 Carbon",
    price: 1799,
    originalPrice: 1999,
    image: "/placeholder.svg?height=400&width=600&text=ThinkPad+X1",
    category: "laptop",
    rating: 4.5,
    specs: ["Intel i7-1365U", "32GB RAM", "1TB SSD", '14" 2.8K OLED', "Fingerprint", "Military Grade"],
    description:
      "Laptop empresarial premium con certificación militar, ideal para ejecutivos y profesionales que necesitan confiabilidad.",
    discount: 10,
    brand: "Lenovo",
    stock: 15,
  },
  {
    id: 9,
    name: "HP Spectre x360 14",
    price: 1399,
    originalPrice: 1599,
    image: "/placeholder.svg?height=400&width=600&text=HP+Spectre",
    category: "laptop",
    rating: 4.4,
    specs: ["Intel i7-1355U", "16GB RAM", "512GB SSD", '13.5" 3K2K Touch', "Convertible", "Stylus"],
    description:
      "Laptop convertible 2-en-1 con pantalla táctil y stylus incluido, perfecta para creativos y presentaciones.",
    discount: 13,
    brand: "HP",
    stock: 20,
  },
]

export default function LaptopsPage() {
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
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [isCartModalOpen, setIsCartModalOpen] = useState(false)

  const {
    filters,
    setFilters,
    searchTerm,
    setSearchTerm,
    filteredProducts,
    filterStats,
    activeFiltersCount,
    clearAllFilters,
  } = useProductFilters(laptopProducts, "laptop")

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
    const product = laptopProducts.find((p) => p.id === productId)
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-pink-900 text-white">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full">
                <Cpu className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Laptops</h1>
                <p className="text-purple-200 text-sm">Portabilidad y rendimiento</p>
              </div>
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
          {/* Featured Product Display */}
          {selectedProduct && (
            <div className="mb-12 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
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
                    <Button
                      onClick={() => addToCart(selectedProduct, 1)}
                      className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    >
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Agregar al Carrito
                    </Button>
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

          {/* Products Section */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Laptops</h3>
              <Badge className="bg-white/10 text-white">
                {filteredProducts.length} de {filterStats.totalProducts} productos
              </Badge>
            </div>

            {/* Search and Filter Bar */}
            <SearchAndFilterBar
              onSearch={(term) => setSearchTerm(term)}
              onOpenFilters={() => setIsFiltersOpen(true)}
              activeFiltersCount={activeFiltersCount}
              onClearFilters={clearAllFilters}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <Link href={`/producto/${product.id}`} key={product.id}>
                  <Card className="group bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer hover:scale-105">
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
                        />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* No results message */}
            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 text-lg mb-2">No se encontraron productos</div>
                <div className="text-gray-500 text-sm mb-4">Intenta ajustar los filtros o términos de búsqueda</div>
                <Button
                  onClick={clearAllFilters}
                  variant="outline"
                  className="border-white/20 text-white hover:bg-white/10 bg-transparent"
                >
                  Limpiar filtros
                </Button>
              </div>
            )}
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
        onAddToCart={addToCart}
      />

      <PurchasesModal isOpen={isPurchasesModalOpen} onClose={() => setIsPurchasesModalOpen(false)} purchases={[]} />

      {/* Advanced Filters Modal */}
      <AdvancedFilters
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        onFiltersChange={setFilters}
        products={laptopProducts}
        selectedCategory="laptop"
      />
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
