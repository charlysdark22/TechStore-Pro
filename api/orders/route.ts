import { type NextRequest, NextResponse } from "next/server"

// Simulación de base de datos de pedidos
const orders = [
  {
    id: "ORD-001",
    userId: 1,
    status: "delivered",
    total: 2499,
    subtotal: 2299,
    tax: 200,
    shipping: 0,
    items: [
      {
        productId: 3,
        name: 'MacBook Pro M3 16"',
        price: 2499,
        quantity: 1,
        image: "/placeholder.svg?height=60&width=60&text=MacBook",
      },
    ],
    paymentMethod: {
      type: "card",
      last4: "1234",
      brand: "visa",
    },
    shippingAddress: {
      name: "Juan Pérez",
      street: "Calle Principal 123",
      city: "Ciudad de México",
      state: "CDMX",
      zipCode: "01000",
      country: "México",
    },
    trackingNumber: "TRK123456789",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-20T14:45:00Z",
    deliveredAt: "2024-01-20T14:45:00Z",
  },
  {
    id: "ORD-002",
    userId: 1,
    status: "shipped",
    total: 1199,
    subtotal: 1099,
    tax: 100,
    shipping: 0,
    items: [
      {
        productId: 4,
        name: "iPhone 15 Pro Max",
        price: 1199,
        quantity: 1,
        image: "/placeholder.svg?height=60&width=60&text=iPhone",
      },
    ],
    paymentMethod: {
      type: "card",
      last4: "5678",
      brand: "mastercard",
    },
    shippingAddress: {
      name: "Juan Pérez",
      street: "Calle Principal 123",
      city: "Ciudad de México",
      state: "CDMX",
      zipCode: "01000",
      country: "México",
    },
    trackingNumber: "TRK987654321",
    createdAt: "2024-01-20T09:15:00Z",
    updatedAt: "2024-01-22T11:30:00Z",
    shippedAt: "2024-01-22T11:30:00Z",
  },
]

// GET - Obtener pedidos (filtrar por usuario si se proporciona)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const status = searchParams.get("status")
    const limit = searchParams.get("limit")

    let filteredOrders = [...orders]

    // Filtrar por usuario
    if (userId) {
      filteredOrders = filteredOrders.filter((order) => order.userId === Number.parseInt(userId))
    }

    // Filtrar por estado
    if (status) {
      filteredOrders = filteredOrders.filter((order) => order.status === status)
    }

    // Limitar resultados
    if (limit) {
      filteredOrders = filteredOrders.slice(0, Number.parseInt(limit))
    }

    // Ordenar por fecha de creación (más recientes primero)
    filteredOrders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

    return NextResponse.json({
      success: true,
      data: filteredOrders,
      total: filteredOrders.length,
      message: "Pedidos obtenidos exitosamente",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error al obtener pedidos",
        error: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 },
    )
  }
}

// POST - Crear nuevo pedido
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validaciones básicas
    if (!body.userId || !body.items || !Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Faltan campos requeridos: userId, items",
        },
        { status: 400 },
      )
    }

    // Generar ID único para el pedido
    const orderId = `ORD-${String(orders.length + 1).padStart(3, "0")}`

    const newOrder = {
      id: orderId,
      userId: body.userId,
      status: "pending",
      total: body.total || 0,
      subtotal: body.subtotal || 0,
      tax: body.tax || 0,
      shipping: body.shipping || 0,
      items: body.items,
      paymentMethod: body.paymentMethod || {},
      shippingAddress: body.shippingAddress || {},
      trackingNumber: null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    orders.push(newOrder)

    return NextResponse.json(
      {
        success: true,
        data: newOrder,
        message: "Pedido creado exitosamente",
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error al crear pedido",
        error: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 },
    )
  }
}

// PUT - Actualizar estado del pedido
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, status, trackingNumber } = body

    if (!id || !status) {
      return NextResponse.json(
        {
          success: false,
          message: "ID del pedido y estado son requeridos",
        },
        { status: 400 },
      )
    }

    const orderIndex = orders.findIndex((order) => order.id === id)

    if (orderIndex === -1) {
      return NextResponse.json(
        {
          success: false,
          message: "Pedido no encontrado",
        },
        { status: 404 },
      )
    }

    // Actualizar el pedido
    orders[orderIndex] = {
      ...orders[orderIndex],
      status,
      trackingNumber: trackingNumber || orders[orderIndex].trackingNumber,
      updatedAt: new Date().toISOString(),
      // Agregar timestamps específicos según el estado
      ...(status === "shipped" && { shippedAt: new Date().toISOString() }),
      ...(status === "delivered" && { deliveredAt: new Date().toISOString() }),
    }

    return NextResponse.json({
      success: true,
      data: orders[orderIndex],
      message: "Pedido actualizado exitosamente",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error al actualizar pedido",
        error: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 },
    )
  }
}
