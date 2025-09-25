"use client"
import { User, Heart, ShoppingBag, LogOut, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface UserMenuProps {
  user: any
  onLogout: () => void
  onOpenProfile: () => void
  onOpenWishlist: () => void
  onOpenPurchases: () => void
}

export default function UserMenu({ user, onLogout, onOpenProfile, onOpenWishlist, onOpenPurchases }: UserMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center gap-2 text-white hover:bg-white/10">
          <img
            src={user.avatar || "/placeholder.svg?height=32&width=32&text=U"}
            alt={user.name}
            className="w-8 h-8 rounded-full"
          />
          <span className="hidden md:block">{user.name}</span>
          <ChevronDown className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-slate-800 border-slate-700">
        <div className="px-3 py-2 border-b border-slate-700">
          <p className="text-sm font-medium text-white">{user.name}</p>
          <p className="text-xs text-gray-400">{user.email}</p>
        </div>

        <DropdownMenuItem onClick={onOpenProfile} className="text-white hover:bg-slate-700 cursor-pointer">
          <User className="mr-2 h-4 w-4" />
          Mi Perfil
        </DropdownMenuItem>

        <DropdownMenuItem onClick={onOpenWishlist} className="text-white hover:bg-slate-700 cursor-pointer">
          <Heart className="mr-2 h-4 w-4" />
          Lista de Deseos
        </DropdownMenuItem>

        <DropdownMenuItem onClick={onOpenPurchases} className="text-white hover:bg-slate-700 cursor-pointer">
          <ShoppingBag className="mr-2 h-4 w-4" />
          Mis Compras
        </DropdownMenuItem>

        <DropdownMenuSeparator className="bg-slate-700" />

        <DropdownMenuItem onClick={onLogout} className="text-red-400 hover:bg-slate-700 cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          Cerrar Sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
