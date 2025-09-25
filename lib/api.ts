// Utilidades para hacer llamadas a la API

const API_BASE_URL = "/api"

// Función helper para hacer requests
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`

  const config: RequestInit = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  }

  try {
    const response = await fetch(url, config)
    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.message || "Error en la petición")
    }

    return data
  } catch (error) {
    console.error("API Error:", error)
    throw error
  }
}

// Funciones para productos
export const productsAPI = {
  // Obtener todos los productos
  getAll: async (params?: {
    category?: string
    featured?: boolean
    limit?: number
    search?: string
  }) => {
    const searchParams = new URLSearchParams()

    if (params?.category) searchParams.append("category", params.category)
    if (params?.featured) searchParams.append("featured", "true")
    if (params?.limit) searchParams.append("limit", params.limit.toString())
    if (params?.search) searchParams.append("search", params.search)

    const query = searchParams.toString()
    return apiRequest(`/products${query ? `?${query}` : ""}`)
  },

  // Obtener producto por ID
  getById: async (id: number) => {
    return apiRequest(`/products/${id}`)
  },

  // Crear producto
  create: async (productData: any) => {
    return apiRequest("/products", {
      method: "POST",
      body: JSON.stringify(productData),
    })
  },

  // Actualizar producto
  update: async (id: number, productData: any) => {
    return apiRequest(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(productData),
    })
  },

  // Eliminar producto
  delete: async (id: number) => {
    return apiRequest(`/products?id=${id}`, {
      method: "DELETE",
    })
  },
}

// Funciones para categorías
export const categoriesAPI = {
  // Obtener todas las categorías
  getAll: async (featured?: boolean) => {
    const query = featured ? "?featured=true" : ""
    return apiRequest(`/categories${query}`)
  },

  // Crear categoría
  create: async (categoryData: any) => {
    return apiRequest("/categories", {
      method: "POST",
      body: JSON.stringify(categoryData),
    })
  },
}

// Funciones para pedidos
export const ordersAPI = {
  // Obtener pedidos
  getAll: async (params?: {
    userId?: number
    status?: string
    limit?: number
  }) => {
    const searchParams = new URLSearchParams()

    if (params?.userId) searchParams.append("userId", params.userId.toString())
    if (params?.status) searchParams.append("status", params.status)
    if (params?.limit) searchParams.append("limit", params.limit.toString())

    const query = searchParams.toString()
    return apiRequest(`/orders${query ? `?${query}` : ""}`)
  },

  // Crear pedido
  create: async (orderData: any) => {
    return apiRequest("/orders", {
      method: "POST",
      body: JSON.stringify(orderData),
    })
  },

  // Actualizar estado del pedido
  updateStatus: async (orderId: string, status: string, trackingNumber?: string) => {
    return apiRequest("/orders", {
      method: "PUT",
      body: JSON.stringify({ id: orderId, status, trackingNumber }),
    })
  },
}

// Funciones para el carrito (localStorage)
export const cartAPI = {
  // Obtener carrito del localStorage
  get: (): any[] => {
    if (typeof window === "undefined") return []
    const cart = localStorage.getItem("techstore_cart")
    return cart ? JSON.parse(cart) : []
  },

  // Guardar carrito en localStorage
  save: (cart: any[]) => {
    if (typeof window === "undefined") return
    localStorage.setItem("techstore_cart", JSON.stringify(cart))
  },

  // Agregar producto al carrito
  add: (product: any) => {
    const cart = cartAPI.get()
    const existingItem = cart.find((item: any) => item.id === product.id)

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cart.push({ ...product, quantity: 1 })
    }

    cartAPI.save(cart)
    return cart
  },

  // Remover producto del carrito
  remove: (productId: number) => {
    const cart = cartAPI.get()
    const updatedCart = cart.filter((item: any) => item.id !== productId)
    cartAPI.save(updatedCart)
    return updatedCart
  },

  // Limpiar carrito
  clear: () => {
    if (typeof window === "undefined") return
    localStorage.removeItem("techstore_cart")
  },
}

// Funciones para la wishlist (localStorage)
export const wishlistAPI = {
  // Obtener wishlist del localStorage
  get: (): number[] => {
    if (typeof window === "undefined") return []
    const wishlist = localStorage.getItem("techstore_wishlist")
    return wishlist ? JSON.parse(wishlist) : []
  },

  // Guardar wishlist en localStorage
  save: (wishlist: number[]) => {
    if (typeof window === "undefined") return
    localStorage.setItem("techstore_wishlist", JSON.stringify(wishlist))
  },

  // Agregar producto a la wishlist
  add: (productId: number) => {
    const wishlist = wishlistAPI.get()
    if (!wishlist.includes(productId)) {
      wishlist.push(productId)
      wishlistAPI.save(wishlist)
    }
    return wishlist
  },

  // Remover producto de la wishlist
  remove: (productId: number) => {
    const wishlist = wishlistAPI.get()
    const updatedWishlist = wishlist.filter((id) => id !== productId)
    wishlistAPI.save(updatedWishlist)
    return updatedWishlist
  },

  // Limpiar wishlist
  clear: () => {
    if (typeof window === "undefined") return
    localStorage.removeItem("techstore_wishlist")
  },
}
