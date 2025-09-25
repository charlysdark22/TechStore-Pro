"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface CartIconProps {
  itemCount: number
  onClick: () => void
  className?: string
}

export default function CartIcon({ itemCount, onClick, className = "" }: CartIconProps) {
  return (
    <Button variant="ghost" size="icon" className={`relative ${className}`} onClick={onClick}>
      <ShoppingCart className="w-5 h-5" />
      {itemCount > 0 && (
        <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center bg-purple-500 text-xs animate-pulse">
          {itemCount > 99 ? "99+" : itemCount}
        </Badge>
      )}
    </Button>
  )
}
