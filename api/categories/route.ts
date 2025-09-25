import { type NextRequest, NextResponse } from "next/server"

const categories = [
  {
    id: 1,
    name: "Desktop",
    slug: "desktop",
    description: "Computadoras de escritorio potentes para gaming y trabajo profesional",
    icon: "monitor",
    gradient: "from-blue-600 to-cyan-600",
    productCount: 15,
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Laptops",
    slug: "laptop",
    description: "Portátiles para trabajo, gaming y uso personal",
    icon: "cpu",
    gradient: "from-purple-600 to-pink-600",
    productCount: 23,
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: "Móviles",
    slug: "mobile",
    description: "Smartphones de última generación con tecnología avanzada",
    icon: "smartphone",
    gradient: "from-green-600 to-emerald-600",
    productCount: 18,
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 4,
    name: "Accesorios",
    slug: "accessories",
    description: "Periféricos y accesorios tecnológicos",
    icon: "headphones",
    gradient: "from-orange-600 to-red-600",
    productCount: 32,
    featured: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
]

// GET - Obtener todas las categorías
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get("featured")

    let filteredCategories = [...categories]

    // Filtrar categorías destacadas
    if (featured === "true") {
      filteredCategories = filteredCategories.filter((category) => category.featured)
    }

    return NextResponse.json({
      success: true,
      data: filteredCategories,
      total: filteredCategories.length,
      message: "Categorías obtenidas exitosamente",
    })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error al obtener categorías",
        error: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 },
    )
  }
}

// POST - Crear nueva categoría
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validaciones básicas
    if (!body.name || !body.slug) {
      return NextResponse.json(
        {
          success: false,
          message: "Faltan campos requeridos: name, slug",
        },
        { status: 400 },
      )
    }

    // Verificar que el slug no exista
    const existingCategory = categories.find((c) => c.slug === body.slug)
    if (existingCategory) {
      return NextResponse.json(
        {
          success: false,
          message: "Ya existe una categoría con ese slug",
        },
        { status: 400 },
      )
    }

    const newCategory = {
      id: Math.max(...categories.map((c) => c.id)) + 1,
      ...body,
      productCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    categories.push(newCategory)

    return NextResponse.json(
      {
        success: true,
        data: newCategory,
        message: "Categoría creada exitosamente",
      },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Error al crear categoría",
        error: error instanceof Error ? error.message : "Error desconocido",
      },
      { status: 500 },
    )
  }
}
