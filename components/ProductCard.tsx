"use client"

import { ShoppingCart, Star, Heart } from "lucide-react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import { ImageWithFallback } from "./figma/ImageWithFallback"
import { useState } from "react"

interface ProductCardProps {
  id?: string
  title: string
  price: string
  originalPrice?: string
  discount?: string
  image: string
  category: string
  rating: number
  tags?: string[]
  onAddToCart?: (product: ProductCardProps) => void
}

export function ProductCard({
  id,
  title,
  price,
  originalPrice,
  discount,
  image,
  category,
  rating,
  tags = [],
  onAddToCart,
}: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  return (
    <div
      className="group relative bg-[#1b2838] rounded-lg overflow-hidden hover:scale-[1.02] transition-all duration-300 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Discount Badge */}
      {discount && (
        <div className="absolute top-3 left-3 z-10">
          <Badge variant="destructive" className="px-2 py-1">
            {discount}
          </Badge>
        </div>
      )}

      {/* Favorite Button */}
      <button
        onClick={(e) => {
          e.stopPropagation()
          setIsFavorite(!isFavorite)
        }}
        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-all"
      >
        <Heart className={`w-4 h-4 transition-all ${isFavorite ? "fill-red-500 text-red-500" : "text-white"}`} />
      </button>

      {/* Image */}
      <div className="relative aspect-[16/9] overflow-hidden bg-[#2a475e]">
        <ImageWithFallback
          src={image || "/placeholder.svg"}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />

        {/* Hover Overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-4">
            <div className="w-full space-y-2">
              {tags.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs bg-[#2a475e] hover:bg-[#3a5a7e]">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <Badge variant="outline" className="text-xs border-blue-500 text-blue-400 mb-2">
              {category}
            </Badge>
            <h3 className="text-white truncate">{title}</h3>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          <span className="text-sm text-gray-300">{rating}</span>
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between pt-2 border-t border-[#2a475e]">
          <div className="flex items-center gap-2">
            {originalPrice && <span className="text-sm text-gray-500 line-through">{originalPrice}</span>}
            <span className="text-green-400">{price}</span>
          </div>
          <Button
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={(e) => {
              e.stopPropagation()
              onAddToCart?.({
                id: id || title,
                title,
                price,
                originalPrice,
                discount,
                image,
                category,
                rating,
                tags,
              })
            }}
          >
            <ShoppingCart className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
