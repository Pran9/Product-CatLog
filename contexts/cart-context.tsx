"use client"

import type React from "react"
import { createContext, useContext, useReducer, useEffect, useRef } from "react"
import { doc, setDoc, getDoc } from "firebase/firestore"
import { firestore } from "@/lib/firebase"
import { useAuth } from "@/contexts/auth-context"

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
  | { type: "SET_CART"; payload: CartState }

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const exists = state.items.find((item) => item.id === action.payload.id)
      let updatedItems
      if (exists) {
        updatedItems = state.items.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity + action.payload.quantity } : item,
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
        item.id === action.payload.id ? { ...item, quantity: Math.max(1, action.payload.quantity) } : item,
      )
      return {
        items: updatedItems,
        totalItems: updatedItems.reduce((sum, i) => sum + i.quantity, 0),
        totalPrice: updatedItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
      }
    }
    case "CLEAR_CART":
      return initialState
    case "SET_CART":
      return action.payload
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
  const { user } = useAuth()
  const [state, dispatch] = useReducer(cartReducer, initialState)
  const isLoadingCart = useRef(false)
  const isSavingCart = useRef(false)

  useEffect(() => {
    const loadCartFromFirebase = async () => {
      if (!user || !firestore || isLoadingCart.current) return

      isLoadingCart.current = true
      try {
        const cartRef = doc(firestore, "carts", user.uid)
        const cartSnap = await getDoc(cartRef)

        if (cartSnap.exists()) {
          const firebaseCart = cartSnap.data() as CartState
          dispatch({ type: "SET_CART", payload: firebaseCart })
          console.log("[v0] Loaded cart from Firebase for user:", user.uid)
        } else {
          console.log("[v0] No cart found in Firebase for user:", user.uid)
        }
      } catch (error) {
        console.error("[v0] Error loading cart from Firebase:", error)
      } finally {
        isLoadingCart.current = false
      }
    }

    if (user) {
      loadCartFromFirebase()
    } else {
      dispatch({ type: "CLEAR_CART" })
    }
  }, [user])

  useEffect(() => {
    const saveCartToFirebase = async () => {
      if (!user || !firestore || isLoadingCart.current || isSavingCart.current) return

      isSavingCart.current = true
      try {
        const cartRef = doc(firestore, "carts", user.uid)
        await setDoc(cartRef, {
          items: state.items,
          totalItems: state.totalItems,
          totalPrice: state.totalPrice,
          updatedAt: new Date().toISOString(),
        })
        console.log("[v0] Saved cart to Firebase for user:", user.uid)
      } catch (error) {
        console.error("[v0] Error saving cart to Firebase:", error)
      } finally {
        isSavingCart.current = false
      }
    }

    if (user && state.items.length >= 0) {
      saveCartToFirebase()
    }
  }, [state, user])

  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>
}

export function useCart() {
  return useContext(CartContext)
}
