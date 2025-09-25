import { type NextRequest, NextResponse } from "next/server"

// Simulación de base de datos en memoria
const products = [
  {
    id: 1,
    name: "Gaming PC RTX 4090",
    price: 3299,
    originalPrice: 3599,
    image: "/placeholder.svg?height=400&width=600&text=Gaming+PC+RTX+4090",
    category: "desktop",
    rating: 4.8,
    specs: ["Intel i9-13900K", "RTX 4090", "64GB DDR5", "2TB NVMe"],
    description: "PC gaming de alta gama con la tarjeta gráfica más potente del mercado. Domina cualquier juego en 4K.",
    discount: 8,
    brand: "Custom Build",
    stock: 15,
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: 'iMac 24" M3',
    price: 1699,
    originalPrice: 1899,
    image: "/placeholder.svg?height=400&width=600&text=iMac+24+M3",
    category: "desktop",
    rating: 4.7,
    specs: ["Apple M3", "16GB RAM", "512GB SSD", '24" 4.5K Retina'],
    description: "All-in-one elegante con colores vibrantes y el potente chip M3 para creativos y profesionales.",
    discount: 11,
    brand: "Apple",
    stock: 8,
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: 'MacBook Pro M3 16"',
    price: 2499,
    originalPrice: 2799,
    image: "/placeholder.svg?height=400&width=600&text=MacBook+Pro+M3",
    category: "laptop",
    rating: 4.9,
    specs: ["Apple M3 Pro", "32GB RAM", "1TB SSD", '16.2" Retina'],
    description:
      "La laptop más potente de Apple con el revolucionario chip M3 Pro. Perfecta para profesionales creativos.",
    isNew: true,
    discount: 11,
    brand: "Apple",
    stock: 12,
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 4,
    name: "iPhone 15 Pro Max",
    price: 1199,
    originalPrice: 1299,
    image: "/placeholder.svg?height=400&width=600&text=iPhone+15+Pro+Max",
    category: "mobile",
    rating: 4.7,
    specs: ["A17 Pro", "256GB", "48MP Camera", '6.7" Display'],
    description: "El iPhone más avanzado con titanio, cámara profesional y el chip A17 Pro más rápido.",
    isNew: true,
    discount: 8,
    brand: "Apple",
    stock: 25,
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 5,
    name: "AirPods Pro 2",
    price: 249,
    originalPrice: 279,
    image: "/placeholder.svg?height=400&width=600&text=AirPods+Pro+2",
    category: "accessories",
    rating: 4.8,
    specs: ["Cancelación de ruido", "Audio espacial", "Chip H2", "30h batería"],
    description: "Auriculares inalámbricos premium con cancelación de ruido adaptativa y audio espacial.",
    discount: 11,
    brand: "Apple",
    stock: 50,
    featured: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

// GET - Obtener todos los productos o filtrar por categoría
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const featured = searchParams.get("featured")
    const limit = searchParams.get("limit")
    const search = searchParams.get("search")

    let filteredProducts = [...products]

    // Filtrar por categoría
    if (category) {
      filteredProducts = filteredProducts.filter((product) => product.category === category)
    }

    // Filtrar productos destacados
    if (featured === "true") {
      filteredProducts = filteredProducts.filter((product) => product.featured)
    }

    // Búsqueda por nombre o descripción
    if (search) {
      const searchLower = search.toLowerCase()
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchLower) ||
          product.description.toLowerCase().includes(searchLower) ||
          product.brand.toLowerCase().includes(searchLower),
      )
    }

    // Limitar resultados
    if (limit) {
      filteredProducts = filteredProducts.slice(0, Number.parseInt(limit))
    }

    return NextResponse.json({
      success: true,
      data: filteredProducts,
      total: filteredProducts.length,
      message: "Productos obtenidos exitosamente",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error al obtener productos",
        error: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 },
    )
  }
}

// POST - Crear nuevo producto
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validaciones básicas
    if (!body.name || !body.price || !body.category) {
      return NextResponse.json(
        {
          success: false,
          message: "Faltan campos requeridos: name, price, category",
        },
        { status: 400 },
      )
    }

    const newProduct = {
      id: Math.max(...products.map((p) => p.id)) + 1,
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      stock: body.stock || 0,
      featured: body.featured || false,
    }

    products.push(newProduct)

    return NextResponse.json(
      {
        success: true,
        data: newProduct,
        message: "Producto creado exitosamente",
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error al crear producto",
        error: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 },
    )
  }
}

// PUT - Actualizar producto
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "ID del producto es requerido",
        },
        { status: 400 },
      )
    }

    const productIndex = products.findIndex((p) => p.id === id)

    if (productIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          message: "Producto no encontrado",
        },
        { status: 404 },
      )
    }

    products[productIndex] = {
      ...products[productIndex],
      ...updateData,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({
      success: true,
      data: products[productIndex],
      message: "Producto actualizado exitosamente",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error al actualizar producto",
        error: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 },
    )
  }
}

// DELETE - Eliminar producto
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "ID del producto es requerido",
        },
        { status: 400 },
      )
    }

    const productIndex = products.findIndex((p) => p.id === Number.parseInt(id))

    if (productIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          message: "Producto no encontrado",
        },
        { status: 404 },
      )
    }

    const deletedProduct = products.splice(productIndex, 1)[0]

    return NextResponse.json({
      success: true,
      data: deletedProduct,
      message: "Producto eliminado exitosamente",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error al eliminar producto",
        error: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 },
    )
  }
}
