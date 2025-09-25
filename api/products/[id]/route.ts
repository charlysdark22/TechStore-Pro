import { type NextRequest, NextResponse } from "next/server"

// Simulación de base de datos (en producción usarías una base de datos real)
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
    reviews: [
      {
        id: 1,
        user: "Carlos M.",
        rating: 5,
        comment: "Increíble rendimiento, perfecto para gaming en 4K",
        date: "2024-01-15",
      },
      {
        id: 2,
        user: "Ana L.",
        rating: 4,
        comment: "Excelente calidad, aunque un poco caro",
        date: "2024-01-10",
      },
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

// GET - Obtener producto por ID
export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const product = products.find((p) => p.id === id)

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Producto no encontrado",
        },
        { status: 404 },
      )
    }

    return NextResponse.json({
      success: true,
      data: product,
      message: "Producto obtenido exitosamente",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error al obtener producto",
        error: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 },
    )
  }
}

// PUT - Actualizar producto específico
export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
    const body = await request.json()

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
      ...body,
      id, // Mantener el ID original
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

// DELETE - Eliminar producto específico
export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = Number.parseInt(params.id)
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
