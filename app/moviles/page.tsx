"use client"

import { useState, useEffect } from "react"
import { ShoppingCart, Heart, Star, Smartphone, ArrowLeft } from "lucide-react"
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

const mobileProducts: Product[] = [
  {
    id: 7,
    name: "iPhone 15 Pro Max",
    price: 1199,
    originalPrice: 1299,
    image: "/placeholder.svg?height=400&width=600&text=iPhone+15+Pro+Max",
    category: "mobile",
    rating: 4.7,
    specs: ["A17 Pro", "256GB", "48MP Camera", '6.7" Display', "Titanium", "USB-C"],
    description:
      "El iPhone más avanzado con titanio, cámara profesional y el chip A17 Pro más rápido. Diseño premium y durabilidad excepcional.",
    isNew: true,
    discount: 8,
    brand: "Apple",
    stock: 25,
  },
  {
    id: 8,
    name: "Samsung Galaxy S24 Ultra",
    price: 1299,
    originalPrice: 1399,
    image: "/placeholder.svg?height=400&width=600&text=Samsung+Galaxy+S24+Ultra",
    category: "mobile",
    rating: 4.8,
    specs: ["Snapdragon 8 Gen 3", "512GB", "200MP Camera", '6.8" Dynamic AMOLED', "S Pen", "5000mAh"],
    description:
      "El smartphone Android más completo con S Pen integrado y cámaras profesionales para fotografía y productividad.",
    discount: 7,
    brand: "Samsung",
    stock: 18,
  },
  {
    id: 9,
    name: "Google Pixel 8 Pro",
    price: 999,
    originalPrice: 1099,
    image: "/placeholder.svg?height=400&width=600&text=Google+Pixel+8+Pro",
    category: "mobile",
    rating: 4.6,
    specs: ["Google Tensor G3", "256GB", "50MP Triple Camera", '6.7" LTPO OLED', "Magic Eraser", "7 años updates"],
    description:
      "Smartphone con la mejor cámara computacional y Android puro con actualizaciones garantizadas por 7 años.",
    discount: 9,
    brand: "Google",
    stock: 22,
  },
  {
    id: 10,
    name: "OnePlus 12",
    price: 799,
    originalPrice: 899,
    image: "/placeholder.svg?height=400&width=600&text=OnePlus+12",
    category: "mobile",
    rating: 4.5,
    specs: ["Snapdragon 8 Gen 3", "256GB", "50MP Hasselblad", '6.82" LTPO AMOLED', "100W Charging", "OxygenOS"],
    description:
      "Flagship killer con carga súper rápida y cámaras Hasselblad. Rendimiento premium a precio competitivo.",
    discount: 11,
    brand: "OnePlus",
    stock: 15,
  },
  {
    id: 11,
    name: "Xiaomi 14 Ultra",
    price: 1099,
    originalPrice: 1199,
    image: "/placeholder.svg?height=400&width=600&text=Xiaomi+14+Ultra",
    category: "mobile",
    rating: 4.4,
    specs: ["Snapdragon 8 Gen 3", "512GB", "50MP Leica Quad", '6.73" LTPO AMOLED', "90W Charging", "IP68"],
    description:
      "Smartphone con sistema de cámaras Leica profesional y carga inalámbrica ultra rápida. Fotografía de nivel profesional.",
    discount: 8,
    brand: "Xiaomi",
    stock: 12,
  },
  {
    id: 12,
    name: "iPhone 15",
    price: 799,
    originalPrice: 899,
    image: "/placeholder.svg?height=400&width=600&text=iPhone+15",
    category: "mobile",
    rating: 4.6,
    specs: ["A16 Bionic", "128GB", "48MP Camera", '6.1" Display', "Dynamic Island", "USB-C"],
    description:
      "iPhone con Dynamic Island y USB-C. El equilibrio perfecto entre funcionalidades avanzadas y precio accesible.",
    discount: 11,
    brand: "Apple",
    stock: 30,
  },
]

export default function MovilesPage() {
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
  } = useProductFilters(mobileProducts, "mobile")

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
    const product = mobileProducts.find((p) => p.id === productId)
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-emerald-900 text-white">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
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
              <div className="p-2 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">Smartphones</h1>
                <p className="text-green-200 text-sm">Tecnología móvil avanzada</p>
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
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
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
                    <Badge className="mb-2 bg-green-500">{selectedProduct.brand}</Badge>
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
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
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
                      className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
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
              <h3 className="text-2xl font-bold text-white">Smartphones</h3>
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
                        <Badge className="text-xs bg-green-500">{product.brand}</Badge>
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
        products={mobileProducts}
        selectedCategory="mobile"
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
