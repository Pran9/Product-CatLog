"use client"

import React, { createContext, useContext, useReducer, useEffect } from "react"

interface CartItem {
  id: number
  title: string
  price: number
  thumbnail: string
  quantity: number
  stock: number
  discountPercentage?: number
}

interface CartState {
  items: CartItem[]
  totalItems: number
  totalPrice: number
}

const initialState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0,
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR_CART" }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const exists = state.items.find((item) => item.id === action.payload.id)
      let updatedItems
      if (exists) {
        updatedItems = state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        )
      } else {
        updatedItems = [...state.items, action.payload]
      }
      return {
        items: updatedItems,
        totalItems: updatedItems.reduce((sum, i) => sum + i.quantity, 0),
        totalPrice: updatedItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
      }
    }
    case "REMOVE_ITEM": {
      const updatedItems = state.items.filter((item) => item.id !== action.payload)
      return {
        items: updatedItems,
        totalItems: updatedItems.reduce((sum, i) => sum + i.quantity, 0),
        totalPrice: updatedItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
      }
    }
    case "UPDATE_QUANTITY": {
      const updatedItems = state.items.map((item) =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(1, action.payload.quantity) }
          : item
      )
      return {
        items: updatedItems,
        totalItems: updatedItems.reduce((sum, i) => sum + i.quantity, 0),
        totalPrice: updatedItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
      }
    }
    case "CLEAR_CART":
      return initialState
    default:
      return state
  }
}

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
}>({
  state: initialState,
  dispatch: () => {},
})

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState, (initial) => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("cart")
      return saved ? JSON.parse(saved) : initial
    }
    return initial
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(state))
    }
  }, [state])

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
