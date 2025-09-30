"use client"

import Image from "next/image"
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"

export default function CartSidebar() {
  const { state, dispatch } = useCart()

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
  }

  const removeItem = (id: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  if (state.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <div className="w-24 h-24 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
          <ShoppingBag className="w-12 h-12 text-slate-400" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400">Add some products to get started!</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-[85vh] pt-6">
      <div className="flex-1 overflow-auto">
        <div className="space-y-4">
          {state.items.map((item) => (
            <div key={item.id} className="flex items-start space-x-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <div className="relative">
                <Image
                  src={item.thumbnail || "/placeholder.svg"}
                  alt={item.title}
                  width={80}
                  height={80}
                  className="rounded-md object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold truncate mb-1">{item.title}</h4>
                <div className="flex items-center space-x-2 mb-3">
                  <span className="text-lg font-bold text-blue-600">${item.price.toFixed(2)}</span>
                  {item.discountPercentage && item.discountPercentage > 0 && (
                    <Badge variant="destructive" className="text-xs">
                      -{item.discountPercentage.toFixed(0)}%
                    </Badge>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="text-sm font-medium w-8 text-center bg-white dark:bg-slate-700 px-2 py-1 rounded">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      disabled={item.quantity >= item.stock}
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t pt-6 mt-6 space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal ({state.totalItems} items)</span>
            <span>${state.totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Shipping</span>
            <span className="text-green-600">Free</span>
          </div>
          <Separator />
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-blue-600">${state.totalPrice.toFixed(2)}</span>
          </div>
        </div>
        <Button
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          size="lg"
        >
          Proceed to Checkout
        </Button>
      </div>
    </div>
  )
}
