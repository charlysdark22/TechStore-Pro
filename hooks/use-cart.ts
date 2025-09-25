"use client"

import { useState, useEffect } from "react"

interface CartItem {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  category: "desktop" | "laptop" | "mobile" | "accessories"
  brand: string
  quantity: number
  addedAt: string
}

interface UseCartReturn {
  cart: CartItem[]
  addToCart: (product: any, quantity?: number) => void
  removeFromCart: (productId: number) => void
  updateQuantity: (productId: number, quantity: number) => void
  clearCart: () => void
  getTotalItems: () => number
  getTotalPrice: () => number
  isInCart: (productId: number) => boolean
  getCartItem: (productId: number) => CartItem | undefined
}

const CART_STORAGE_KEY = "techstore_cart"

export function useCart(): UseCartReturn {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isClient, setIsClient] = useState(false)

  // Cargar carrito desde localStorage al montar el componente
  useEffect(() => {
    setIsClient(true)
    const savedCart = localStorage.getItem(CART_STORAGE_KEY)
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart)
        setCart(parsedCart)
      } catch (error) {
        console.error("Error parsing cart from localStorage:", error)
        localStorage.removeItem(CART_STORAGE_KEY)
      }
    }
  }, [])

  // Guardar carrito en localStorage cada vez que cambie
  useEffect(() => {
    if (isClient) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart))
    }
  }, [cart, isClient])

  const addToCart = (product: any, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id)

      if (existingItem) {
        // Si el producto ya existe, actualizar la cantidad
        return prevCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item))
      } else {
        // Si es un producto nuevo, agregarlo al carrito
        const newItem: CartItem = {
          id: product.id,
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          image: product.image || product.images?.[0],
          category: product.category,
          brand: product.brand,
          quantity,
          addedAt: new Date().toISOString(),
        }
        return [...prevCart, newItem]
      }
    })
  }

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }

    setCart((prevCart) => prevCart.map((item) => (item.id === productId ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setCart([])
  }

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const isInCart = (productId: number) => {
    return cart.some((item) => item.id === productId)
  }

  const getCartItem = (productId: number) => {
    return cart.find((item) => item.id === productId)
  }

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    isInCart,
    getCartItem,
  }
}
