"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import {
  Heart,
  Star,
  ArrowLeft,
  Share2,
  Truck,
  Shield,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Plus,
  Minus,
  Check,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
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
  images: string[]
  category: "desktop" | "laptop" | "mobile" | "accessories"
  rating: number
  reviewCount: number
  specs: { [key: string]: string }
  description: string
  features: string[]
  isNew?: boolean
  discount?: number
  brand: string
  stock: number
  warranty: string
  shipping: {
    free: boolean
    days: number
  }
  reviews: Review[]
  relatedProducts: number[]
}

interface Review {
  id: number
  user: string
  avatar: string
  rating: number
  date: string
  title: string
  comment: string
  helpful: number
  verified: boolean
  pros: string[]
  cons: string[]
}

// Base de datos de productos completa
const allProducts: Product[] = [
  {
    id: 1,
    name: "Gaming PC RTX 4090 Ultimate",
    price: 3299,
    originalPrice: 3599,
    images: [
      "/placeholder.svg?height=600&width=600&text=Gaming+PC+Front",
      "/placeholder.svg?height=600&width=600&text=Gaming+PC+Side",
      "/placeholder.svg?height=600&width=600&text=Gaming+PC+Interior",
      "/placeholder.svg?height=600&width=600&text=Gaming+PC+Back",
    ],
    category: "desktop",
    rating: 4.8,
    reviewCount: 127,
    specs: {
      Procesador: "Intel Core i9-13900K",
      "Tarjeta Gráfica": "NVIDIA RTX 4090 24GB",
      "Memoria RAM": "64GB DDR5-5600",
      Almacenamiento: "2TB NVMe SSD Gen4",
      "Placa Madre": "ASUS ROG Strix Z790-E",
      Fuente: "850W 80+ Gold Modular",
      Refrigeración: "AIO 360mm RGB",
      Gabinete: "Corsair 5000D Airflow",
    },
    description:
      "La bestia definitiva para gaming en 4K. Este PC gaming de alta gama está diseñado para dominar cualquier juego actual y futuro con la tarjeta gráfica más potente del mercado, la RTX 4090.",
    features: [
      "Ray Tracing en tiempo real",
      "DLSS 3.0 con Frame Generation",
      "Gaming 4K a 120+ FPS",
      "Streaming y grabación simultánea",
      "RGB sincronizado",
      "Overclocking optimizado",
      "Refrigeración silenciosa",
      "Conectividad completa",
    ],
    isNew: true,
    discount: 8,
    brand: "Custom Build",
    stock: 15,
    warranty: "3 años de garantía completa",
    shipping: {
      free: true,
      days: 2,
    },
    reviews: [
      {
        id: 1,
        user: "Carlos Mendoza",
        avatar: "/placeholder.svg?height=40&width=40&text=CM",
        rating: 5,
        date: "2024-01-15",
        title: "Increíble rendimiento para gaming",
        comment:
          "Este PC es una bestia absoluta. Puedo jugar Cyberpunk 2077 en 4K con ray tracing al máximo y mantengo más de 100 FPS. La construcción es impecable y el RGB se ve espectacular.",
        helpful: 23,
        verified: true,
        pros: ["Rendimiento excepcional", "Construcción premium", "RGB espectacular", "Muy silencioso"],
        cons: ["Precio elevado", "Consume mucha energía"],
      },
      {
        id: 2,
        user: "Ana López",
        avatar: "/placeholder.svg?height=40&width=40&text=AL",
        rating: 4,
        date: "2024-01-10",
        title: "Perfecto para creadores de contenido",
        comment:
          "Lo uso para edición de video 4K y renderizado 3D. Los tiempos de render se redujeron a la mitad comparado con mi PC anterior. Excelente inversión.",
        helpful: 18,
        verified: true,
        pros: ["Render súper rápido", "Multitarea sin problemas", "Buena refrigeración"],
        cons: ["Ocupa mucho espacio"],
      },
    ],
    relatedProducts: [2, 3, 4],
  },
  {
    id: 4,
    name: 'MacBook Pro M3 16" Space Black',
    price: 2499,
    originalPrice: 2799,
    images: [
      "/placeholder.svg?height=600&width=600&text=MacBook+Pro+Closed",
      "/placeholder.svg?height=600&width=600&text=MacBook+Pro+Open",
      "/placeholder.svg?height=600&width=600&text=MacBook+Pro+Side",
      "/placeholder.svg?height=600&width=600&text=MacBook+Pro+Ports",
    ],
    category: "laptop",
    rating: 4.9,
    reviewCount: 89,
    specs: {
      Procesador: "Apple M3 Pro (12-core CPU)",
      GPU: "18-core GPU",
      Memoria: "32GB Unified Memory",
      Almacenamiento: "1TB SSD",
      Pantalla: '16.2" Liquid Retina XDR',
      Resolución: "3456 x 2234 pixels",
      Batería: "Hasta 22 horas",
      Peso: "2.16 kg",
    },
    description:
      "La laptop más potente de Apple redefinida con el chip M3 Pro. Diseñada para profesionales creativos que necesitan rendimiento sin compromisos y portabilidad excepcional.",
    features: [
      "Chip M3 Pro revolucionario",
      "Pantalla Liquid Retina XDR",
      "Batería de día completo",
      "Cámaras y audio profesional",
      "Conectividad Thunderbolt 4",
      "Touch ID integrado",
      "Teclado Magic Keyboard",
      "macOS Sonoma incluido",
    ],
    isNew: true,
    discount: 11,
    brand: "Apple",
    stock: 12,
    warranty: "1 año de garantía Apple",
    shipping: {
      free: true,
      days: 1,
    },
    reviews: [
      {
        id: 3,
        user: "Miguel Torres",
        avatar: "/placeholder.svg?height=40&width=40&text=MT",
        rating: 5,
        date: "2024-01-20",
        title: "La mejor laptop que he tenido",
        comment:
          "Vengo de una MacBook Intel y la diferencia es abismal. El M3 Pro es increíblemente rápido y la batería dura todo el día. Perfecto para desarrollo y diseño.",
        helpful: 31,
        verified: true,
        pros: ["Rendimiento excepcional", "Batería increíble", "Pantalla espectacular", "Muy silenciosa"],
        cons: ["Precio alto", "Pocos puertos"],
      },
    ],
    relatedProducts: [5, 6, 7],
  },
  {
    id: 7,
    name: "iPhone 15 Pro Max Titanium Blue",
    price: 1199,
    originalPrice: 1299,
    images: [
      "/placeholder.svg?height=600&width=600&text=iPhone+15+Pro+Max+Front",
      "/placeholder.svg?height=600&width=600&text=iPhone+15+Pro+Max+Back",
      "/placeholder.svg?height=600&width=600&text=iPhone+15+Pro+Max+Side",
      "/placeholder.svg?height=600&width=600&text=iPhone+15+Pro+Max+Camera",
    ],
    category: "mobile",
    rating: 4.7,
    reviewCount: 203,
    specs: {
      Procesador: "A17 Pro (3nm)",
      Almacenamiento: "256GB",
      Pantalla: '6.7" Super Retina XDR',
      "Cámara Principal": "48MP con zoom 5x",
      "Cámara Frontal": "12MP TrueDepth",
      Batería: "Hasta 29 horas de video",
      Material: "Titanio grado 5",
      Resistencia: "IP68",
    },
    description:
      "El iPhone más avanzado jamás creado. Con titanio de grado aeroespacial, el chip A17 Pro más rápido y el sistema de cámaras más versátil.",
    features: [
      "Diseño en titanio premium",
      "Chip A17 Pro de 3nm",
      "Sistema de cámaras Pro",
      "Action Button personalizable",
      "USB-C con USB 3",
      "Dynamic Island",
      "Face ID avanzado",
      "iOS 17 incluido",
    ],
    isNew: true,
    discount: 8,
    brand: "Apple",
    stock: 25,
    warranty: "1 año de garantía Apple",
    shipping: {
      free: true,
      days: 1,
    },
    reviews: [
      {
        id: 4,
        user: "Sofia Ruiz",
        avatar: "/placeholder.svg?height=40&width=40&text=SR",
        rating: 5,
        date: "2024-01-18",
        title: "El mejor iPhone hasta ahora",
        comment:
          "El titanio se siente premium y es mucho más ligero. Las cámaras son increíbles, especialmente el zoom 5x. La batería me dura todo el día sin problemas.",
        helpful: 45,
        verified: true,
        pros: ["Diseño premium", "Cámaras excelentes", "Batería duradera", "USB-C por fin"],
        cons: ["Precio elevado", "Se raya fácilmente"],
      },
    ],
    relatedProducts: [8, 9, 10],
  },
  {
    id: 10,
    name: "AirPods Pro 2nd Generation USB-C",
    price: 249,
    originalPrice: 279,
    images: [
      "/placeholder.svg?height=600&width=600&text=AirPods+Pro+Case",
      "/placeholder.svg?height=600&width=600&text=AirPods+Pro+Open",
      "/placeholder.svg?height=600&width=600&text=AirPods+Pro+Buds",
      "/placeholder.svg?height=600&width=600&text=AirPods+Pro+Charging",
    ],
    category: "accessories",
    rating: 4.8,
    reviewCount: 156,
    specs: {
      Chip: "Apple H2",
      "Cancelación de Ruido": "Activa adaptativa",
      "Audio Espacial": "Personalizado",
      "Batería Auriculares": "6 horas",
      "Batería Total": "30 horas",
      Resistencia: "IPX4",
      Conectividad: "Bluetooth 5.3",
      Carga: "USB-C y MagSafe",
    },
    description:
      "Los auriculares inalámbricos más avanzados de Apple. Con cancelación de ruido de siguiente nivel y audio espacial personalizado para una experiencia inmersiva única.",
    features: [
      "Cancelación de ruido adaptativa",
      "Audio espacial personalizado",
      "Chip H2 de Apple",
      "Batería de día completo",
      "Resistencia al agua IPX4",
      "Carga inalámbrica MagSafe",
      "Control táctil intuitivo",
      "Integración perfecta con Apple",
    ],
    discount: 11,
    brand: "Apple",
    stock: 50,
    warranty: "1 año de garantía Apple",
    shipping: {
      free: true,
      days: 1,
    },
    reviews: [
      {
        id: 5,
        user: "David Chen",
        avatar: "/placeholder.svg?height=40&width=40&text=DC",
        rating: 5,
        date: "2024-01-12",
        title: "Cancelación de ruido impresionante",
        comment:
          "La cancelación de ruido es notablemente mejor que la generación anterior. Perfecto para vuelos largos y oficinas ruidosas. El audio espacial es una experiencia increíble.",
        helpful: 28,
        verified: true,
        pros: ["Cancelación de ruido superior", "Calidad de audio excelente", "Batería duradera", "Carga USB-C"],
        cons: ["Precio premium", "Se pueden perder fácilmente"],
      },
    ],
    relatedProducts: [11, 12, 13],
  },
]

export default function ProductDetailPage() {
  const params = useParams()
  const productId = Number.parseInt(params.id as string)
  const [product, setProduct] = useState<Product | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedTab, setSelectedTab] = useState("overview")
  const [wishlist, setWishlist] = useState<number[]>([])
  const [wishlistItems, setWishlistItems] = useState<any[]>([])
  const [user, setUser] = useState<any>(null)
  const [isClient, setIsClient] = useState(false)
  const [newReview, setNewReview] = useState("")
  const [newRating, setNewRating] = useState(5)

  // Modal states
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  const [isWishlistModalOpen, setIsWishlistModalOpen] = useState(false)
  const [isPurchasesModalOpen, setIsPurchasesModalOpen] = useState(false)
  const [isCartModalOpen, setIsCartModalOpen] = useState(false)

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
    const foundProduct = allProducts.find((p) => p.id === productId)
    setProduct(foundProduct || null)
  }, [productId])

  const toggleWishlist = (productId: number) => {
    if (wishlist.includes(productId)) {
      setWishlist((prev) => prev.filter((id) => id !== productId))
      setWishlistItems((prev) => prev.filter((item) => item.product.id !== productId))
    } else {
      setWishlist((prev) => [...prev, productId])
      if (product) {
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

  const nextImage = () => {
    if (product) {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length)
    }
  }

  const prevImage = () => {
    if (product) {
      setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length)
    }
  }

  const getCategoryPath = (category: string) => {
    switch (category) {
      case "desktop":
        return "/desktop"
      case "laptop":
        return "/laptops"
      case "mobile":
        return "/moviles"
      case "accessories":
        return "/accesorios"
      default:
        return "/"
    }
  }

  const getCategoryName = (category: string) => {
    switch (category) {
      case "desktop":
        return "Desktop"
      case "laptop":
        return "Laptops"
      case "mobile":
        return "Móviles"
      case "accessories":
        return "Accesorios"
      default:
        return "Productos"
    }
  }

  const getRelatedProducts = () => {
    if (!product) return []
    return allProducts.filter((p) => product.relatedProducts.includes(p.id))
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900 text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Producto no encontrado</h1>
          <Link href="/">
            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
              Volver al inicio
            </Button>
          </Link>
        </div>
      </div>
    )
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
          <div className="flex items-center gap-4">
            <Link href={getCategoryPath(product.category)}>
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                <ArrowLeft className="w-5 h-5" />
              </Button>
            </Link>
            <div className="text-sm text-gray-300">
              <Link href="/" className="hover:text-white">
                Inicio
              </Link>
              <span className="mx-2">/</span>
              <Link href={getCategoryPath(product.category)} className="hover:text-white">
                {getCategoryName(product.category)}
              </Link>
              <span className="mx-2">/</span>
              <span className="text-white">{product.name}</span>
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
          {/* Product Header */}
          <div className="grid lg:grid-cols-2 gap-12 mb-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative bg-white/5 backdrop-blur-lg rounded-2xl p-4 border border-white/10">
                <img
                  src={product.images[currentImageIndex] || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-96 object-cover rounded-xl"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={prevImage}
                  className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                >
                  <ChevronLeft className="w-5 h-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={nextImage}
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white"
                >
                  <ChevronRight className="w-5 h-5" />
                </Button>
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                  {product.isNew && <Badge className="bg-green-500 text-white">Nuevo</Badge>}
                  {product.discount && <Badge className="bg-red-500 text-white">-{product.discount}%</Badge>}
                </div>
              </div>

              {/* Thumbnail Gallery */}
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`relative rounded-lg overflow-hidden border-2 transition-all ${
                      currentImageIndex === index ? "border-purple-500" : "border-white/20 hover:border-white/40"
                    }`}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${product.name} ${index + 1}`}
                      className="w-full h-20 object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <Badge className="mb-2 bg-purple-500">{product.brand}</Badge>
                <h1 className="text-3xl font-bold mb-4 text-white">{product.name}</h1>
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-400">({product.rating})</span>
                  </div>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-400">{product.reviewCount} reseñas</span>
                  <span className="text-gray-400">•</span>
                  <span className={`${product.stock > 0 ? "text-green-400" : "text-red-400"}`}>
                    {product.stock > 0 ? `${product.stock} en stock` : "Agotado"}
                  </span>
                </div>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed">{product.description}</p>

              {/* Price */}
              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-white">
                  ${isClient ? formatPrice(product.price) : product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    ${isClient ? formatPrice(product.originalPrice) : product.originalPrice}
                  </span>
                )}
                {product.discount && (
                  <Badge className="bg-red-500 text-white text-lg px-3 py-1">
                    Ahorra $
                    {isClient
                      ? formatPrice(product.originalPrice! - product.price)
                      : product.originalPrice! - product.price}
                  </Badge>
                )}
              </div>

              {/* Quantity and Actions */}
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <span className="text-white font-medium">Cantidad:</span>
                  <div className="flex items-center border border-white/20 rounded-lg">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="text-white hover:bg-white/10"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="px-4 py-2 text-white font-medium">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="text-white hover:bg-white/10"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <AddToCartButton
                    product={product}
                    onAddToCart={(prod, qty) => addToCart(prod, qty)}
                    isInCart={isInCart(product.id)}
                    cartQuantity={getCartItem(product.id)?.quantity || 0}
                    onUpdateQuantity={updateQuantity}
                    showQuantityControls={true}
                    className="flex-1"
                    size="lg"
                  />
                  <Button
                    onClick={() => toggleWishlist(product.id)}
                    variant="outline"
                    className={`px-6 border-2 transition-all duration-300 ${
                      wishlist.includes(product.id)
                        ? "border-pink-500 bg-pink-500/20 text-pink-400"
                        : "border-white/30 hover:border-pink-500 hover:bg-pink-500/10"
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${wishlist.includes(product.id) ? "fill-current" : ""}`} />
                  </Button>
                  <Button variant="outline" className="px-6 border-white/30 hover:bg-white/10 bg-transparent">
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              {/* Shipping and Warranty Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/10">
                  <Truck className="w-6 h-6 text-green-400" />
                  <div>
                    <p className="text-white font-medium">{product.shipping.free ? "Envío Gratis" : "Envío Pagado"}</p>
                    <p className="text-gray-400 text-sm">{product.shipping.days} días hábiles</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/10">
                  <Shield className="w-6 h-6 text-blue-400" />
                  <div>
                    <p className="text-white font-medium">Garantía</p>
                    <p className="text-gray-400 text-sm">{product.warranty}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-white/5 rounded-lg border border-white/10">
                  <RotateCcw className="w-6 h-6 text-purple-400" />
                  <div>
                    <p className="text-white font-medium">Devoluciones</p>
                    <p className="text-gray-400 text-sm">30 días</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <Tabs value={selectedTab} onValueChange={setSelectedTab} className="mb-12">
            <TabsList className="grid w-full grid-cols-4 bg-white/5 border border-white/10">
              <TabsTrigger value="overview" className="text-white data-[state=active]:bg-purple-600">
                Descripción
              </TabsTrigger>
              <TabsTrigger value="specs" className="text-white data-[state=active]:bg-purple-600">
                Especificaciones
              </TabsTrigger>
              <TabsTrigger value="reviews" className="text-white data-[state=active]:bg-purple-600">
                Reseñas ({product.reviewCount})
              </TabsTrigger>
              <TabsTrigger value="qa" className="text-white data-[state=active]:bg-purple-600">
                Preguntas
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Características Principales</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-300 leading-relaxed">{product.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {product.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0" />
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="specs" className="mt-6">
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Especificaciones Técnicas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.entries(product.specs).map(([key, value], index) => (
                      <div key={index} className="flex justify-between items-center py-3 border-b border-white/10">
                        <span className="text-gray-400 font-medium">{key}</span>
                        <span className="text-white">{value}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-6">
                {/* Rating Summary */}
                <Card className="bg-white/5 border-white/10">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-white mb-2">{product.rating}</div>
                        <div className="flex justify-center mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-6 h-6 ${
                                i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-600"
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-400">{product.reviewCount} reseñas</p>
                      </div>
                      <div className="space-y-2">
                        {[5, 4, 3, 2, 1].map((stars) => (
                          <div key={stars} className="flex items-center gap-3">
                            <span className="text-gray-400 w-8">{stars}★</span>
                            <Progress value={stars === 5 ? 70 : stars === 4 ? 20 : 5} className="flex-1" />
                            <span className="text-gray-400 w-8 text-sm">
                              {stars === 5 ? "70%" : stars === 4 ? "20%" : "5%"}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Reviews List */}
                <div className="space-y-4">
                  {product.reviews.map((review) => (
                    <Card key={review.id} className="bg-white/5 border-white/10">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <img
                            src={review.avatar || "/placeholder.svg"}
                            alt={review.user}
                            className="w-12 h-12 rounded-full bg-purple-500"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="text-white font-medium">{review.user}</h4>
                              {review.verified && (
                                <Badge className="bg-green-500 text-white text-xs">Compra Verificada</Badge>
                              )}
                              <span className="text-gray-400 text-sm">{review.date}</span>
                            </div>
                            <div className="flex items-center gap-2 mb-3">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < review.rating ? "text-yellow-400 fill-current" : "text-gray-600"
                                    }`}
                                  />
                                ))}
                              </div>
                              <h5 className="text-white font-medium">{review.title}</h5>
                            </div>
                            <p className="text-gray-300 mb-4">{review.comment}</p>

                            {/* Pros and Cons */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                              {review.pros.length > 0 && (
                                <div>
                                  <h6 className="text-green-400 font-medium mb-2">Pros:</h6>
                                  <ul className="space-y-1">
                                    {review.pros.map((pro, index) => (
                                      <li key={index} className="text-gray-300 text-sm flex items-center gap-2">
                                        <Plus className="w-3 h-3 text-green-400" />
                                        {pro}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {review.cons.length > 0 && (
                                <div>
                                  <h6 className="text-red-400 font-medium mb-2">Contras:</h6>
                                  <ul className="space-y-1">
                                    {review.cons.map((con, index) => (
                                      <li key={index} className="text-gray-300 text-sm flex items-center gap-2">
                                        <Minus className="w-3 h-3 text-red-400" />
                                        {con}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                            </div>

                            <div className="flex items-center gap-4">
                              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                                <ThumbsUp className="w-4 h-4 mr-1" />
                                Útil ({review.helpful})
                              </Button>
                              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                                <ThumbsDown className="w-4 h-4 mr-1" />
                                No útil
                              </Button>
                              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                                <MessageCircle className="w-4 h-4 mr-1" />
                                Responder
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Write Review */}
                {user && (
                  <Card className="bg-white/5 border-white/10">
                    <CardHeader>
                      <CardTitle className="text-white">Escribir una reseña</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-2">
                        <span className="text-white">Tu calificación:</span>
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setNewRating(i + 1)}
                              className={`w-6 h-6 ${i < newRating ? "text-yellow-400 fill-current" : "text-gray-600"}`}
                            >
                              <Star className="w-full h-full" />
                            </button>
                          ))}
                        </div>
                      </div>
                      <Textarea
                        placeholder="Comparte tu experiencia con este producto..."
                        value={newReview}
                        onChange={(e) => setNewReview(e.target.value)}
                        className="bg-white/5 border-white/20 text-white placeholder-gray-400"
                        rows={4}
                      />
                      <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                        Publicar Reseña
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="qa" className="mt-6">
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="text-white">Preguntas y Respuestas</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <MessageCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg mb-4">Aún no hay preguntas sobre este producto</p>
                    <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                      Hacer una pregunta
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Related Products */}
          {getRelatedProducts().length > 0 && (
            <div className="mb-12">
              <h3 className="text-2xl font-bold text-white mb-6">Productos Relacionados</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getRelatedProducts().map((relatedProduct) => (
                  <Link key={relatedProduct.id} href={`/producto/${relatedProduct.id}`}>
                    <Card className="group bg-white/10 backdrop-blur-lg border-white/20 hover:bg-white/20 transition-all duration-300 cursor-pointer hover:scale-105">
                      <CardContent className="p-4">
                        <div className="relative mb-4">
                          <img
                            src={relatedProduct.images[0] || "/placeholder.svg"}
                            alt={relatedProduct.name}
                            className="w-full h-48 object-cover rounded-lg"
                          />
                          {relatedProduct.isNew && (
                            <Badge className="absolute top-2 left-2 bg-green-500 text-white text-xs">Nuevo</Badge>
                          )}
                          {relatedProduct.discount && (
                            <Badge className="absolute top-2 right-2 bg-red-500 text-white text-xs">
                              -{relatedProduct.discount}%
                            </Badge>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Badge className="text-xs bg-purple-500">{relatedProduct.brand}</Badge>
                          <h4 className="font-semibold text-white line-clamp-2">{relatedProduct.name}</h4>
                          <div className="flex items-center gap-1">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 ${
                                    i < Math.floor(relatedProduct.rating)
                                      ? "text-yellow-400 fill-current"
                                      : "text-gray-600"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-gray-400">({relatedProduct.rating})</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white">
                              ${isClient ? formatPrice(relatedProduct.price) : relatedProduct.price}
                            </span>
                            {relatedProduct.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">
                                ${isClient ? formatPrice(relatedProduct.originalPrice) : relatedProduct.originalPrice}
                              </span>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          )}
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
