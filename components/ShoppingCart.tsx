"use client"
import { Trash2, CarIcon as CartIcon } from "lucide-react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog"
import { Badge } from "./ui/badge"

interface CartItem {
  id: string
  title: string
  price: string
  quantity: number
  image: string
}

interface ShoppingCartProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  items: CartItem[]
  onRemoveItem: (itemId: string) => void
  onUpdateQuantity: (itemId: string, quantity: number) => void
}

export function ShoppingCart({ open, onOpenChange, items, onRemoveItem, onUpdateQuantity }: ShoppingCartProps) {
  const total = items.reduce((sum, item) => {
    const price = Number.parseFloat(item.price.replace("€", ""))
    return sum + price * item.quantity
  }, 0)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md bg-[#1b2838] border-[#2a475e] text-white">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CartIcon className="w-5 h-5" />
            Carrito de Compras
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 max-h-[400px] overflow-y-auto">
          {items.length === 0 ? (
            <div className="py-8 text-center">
              <CartIcon className="w-12 h-12 text-gray-500 mx-auto mb-3 opacity-50" />
              <p className="text-gray-400">Tu carrito está vacío</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-3 p-3 bg-[#2a475e] rounded-lg border border-[#3a5a7e]">
                <img
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  className="w-16 h-16 rounded object-cover flex-shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium truncate">{item.title}</h4>
                  <p className="text-green-400 text-sm font-semibold">{item.price}</p>

                  <div className="flex items-center gap-2 mt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-6 w-6 p-0 border-[#3a5a7e] bg-transparent"
                      onClick={() => {
                        if (item.quantity > 1) {
                          onUpdateQuantity(item.id, item.quantity - 1)
                        }
                      }}
                    >
                      −
                    </Button>
                    <span className="text-xs w-4 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-6 w-6 p-0 border-[#3a5a7e] bg-transparent"
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/10 flex-shrink-0"
                  onClick={() => onRemoveItem(item.id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <>
            <div className="border-t border-[#3a5a7e] pt-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Subtotal:</span>
                <span className="text-white font-semibold">€{total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-300">Items:</span>
                <Badge className="bg-blue-600">{items.reduce((sum, item) => sum + item.quantity, 0)}</Badge>
              </div>
            </div>

            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mt-4">Proceder al pago</Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
