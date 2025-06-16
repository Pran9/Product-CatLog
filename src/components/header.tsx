"use client"
import { useState } from "react"
import {ShoppingCart } from "lucide-react"

export default function Header() {
    const [cartCount, setCartCount] = useState(0)

    const addToCart = () =>{
        setCartCount(cartCount + 1)
    }


  return (
    <header className="bg-white shadow-sm ">
      <div className="max-w-7xl mx-auto px-4 py-4">

        <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-blue-600">My Store</h1>

            {/* cart section */}
            <div className="flex items-center space-x-">
                <button 
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    onClick={addToCart}
                >Add Item</button>

                {/* Counter */}
                <div className="relative">
                    <ShoppingCart className="h-6 w-6 text-gray-600"/>
                    {
                        cartCount > 0 && (
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                                {cartCount}
                            </span>
                        )
                    }
                </div>
            </div>
        </div>
      </div>
    </header>
  )
}
