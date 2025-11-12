"use client"

import { Search, ShoppingCart, User } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
const logo =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Pixel_Cloud-removebg-preview-ihWlB83r7n4UUCGICsJWB5MQGr9BpF.png"

interface NavBarProps {
  onProfileClick: () => void
  onStoreClick: () => void
  onLibraryClick: () => void
  currentView: "store" | "library"
  cartItemsCount?: number
  onCartClick?: () => void
}

export function NavBar({
  onProfileClick,
  onStoreClick,
  onLibraryClick,
  currentView,
  cartItemsCount = 0,
  onCartClick,
}: NavBarProps) {
  return (
    <nav className="sticky top-0 z-50 bg-[#1b2838] border-b border-[#2a475e] backdrop-blur-sm">
      <div className="max-w-[1920px] mx-auto px-6 py-4">
        <div className="flex items-center gap-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img src={logo || "/placeholder.svg"} alt="Pixel Cloud Logo" className="h-10 w-auto" />
            <span className="text-white tracking-wide">PIXEL CLOUD</span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-6">
            <Button
              variant="ghost"
              className={`${currentView === "store" ? "text-white bg-[#2a475e]" : "text-gray-300"} hover:text-white hover:bg-[#2a475e]`}
              onClick={onStoreClick}
            >
              Tienda
            </Button>
            <Button
              variant="ghost"
              className={`${currentView === "library" ? "text-white bg-[#2a475e]" : "text-gray-300"} hover:text-white hover:bg-[#2a475e]`}
              onClick={onLibraryClick}
            >
              Biblioteca
            </Button>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md ml-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar aplicaciones, juegos, ebooks..."
                className="w-full pl-10 bg-[#2a475e] border-[#3a5a7e] text-white placeholder:text-gray-400 focus:border-blue-500"
              />
            </div>
          </div>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-300 hover:text-white hover:bg-[#2a475e] relative"
              onClick={onCartClick}
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold">
                  {cartItemsCount}
                </span>
              )}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-300 hover:text-white hover:bg-[#2a475e]"
              onClick={onProfileClick}
            >
              <User className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
