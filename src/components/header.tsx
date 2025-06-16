"use client"
import React, { useState } from "react"
import {ShoppingCart, Search, ShoppingBag  } from "lucide-react"
import Link from "next/link"

export default function Header() {
    const [cartCount, setCartCount] = useState(0)
    const [searchText, setSearchText] = useState("")

    const addToCart = () =>{
        setCartCount(cartCount + 1)
    }

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        setSearchText(e.target.value)
        console.log("user is searchinh for :",e.target.value)
    }

    const handleSearchSubmit = (e :React.FormEvent) =>{
        e.preventDefault()
        console.log("Searching for :", searchText)
    }


  return (
    <header className="bg-white shadow-sm ">
      <div className="max-w-7xl mx-auto px-4 py-4">

        <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2 cursor-pointer hover:opacity-80 transition-opacity"><ShoppingBag className="h-6 w-6 text-blue-600" />
            <h1 className="text-2xl font-bold text-blue-600">My Store</h1></Link>

            {/* search bar */}
            <form onSubmit={handleSearchSubmit} className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                value={searchText}
                onChange={handleSearchChange}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </form>



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
