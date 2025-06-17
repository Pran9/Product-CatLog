"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, ShoppingCart, AlertCircle, Eye, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"

interface Product {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  tags: string[]
  brand: string
  sku: string
  weight: number
  dimensions: {
    width: number
    height: number
    depth: number
  }
  warrantyInformation: string
  shippingInformation: string
  availabilityStatus: string
  reviews: Array<{
    rating: number
    comment: string
    date: string
    reviewerName: string
    reviewerEmail: string
  }>
  returnPolicy: string
  minimumOrderQuantity: number
  meta: {
    createdAt: string
    updatedAt: string
    barcode: string
    qrCode: string
  }
  images: string[]
  thumbnail: string
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isInStock, setIsInStock] = useState(true)
  const [isChecking, setIsChecking] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const { dispatch } = useCart()
  const { toast } = useToast()

  useEffect(() => {
    const checkStock = () => {
      setIsInStock(product.availabilityStatus === "In Stock" && product.stock > 0)
    }

    checkStock()
    const interval = setInterval(checkStock, 30000)

    return () => clearInterval(interval)
  }, [product.stock, product.availabilityStatus])

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setIsChecking(true)

    await new Promise((resolve) => setTimeout(resolve, 500))

    if (!isInStock) {
      toast({
        title: "Product Out of Stock",
        description: "This product is currently unavailable.",
        variant: "destructive",
      })
      setIsChecking(false)
      return
    }

    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
        stock: product.stock,
        discountPercentage: product.discountPercentage,
      },
    })

    toast({
      title: "Added to Cart",
      description: `${product.title} has been added to your cart.`,
    })

    setIsChecking(false)
  }

  const originalPrice =
    product.discountPercentage > 0 ? product.price / (1 - product.discountPercentage / 100) : product.price

  return (
    <div
      className="group relative bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/product/${product.id}`}>
        <div className="aspect-square overflow-hidden rounded-t-xl relative">
          <Image
            src={product.thumbnail || "/placeholder.svg"}
            alt={product.title}
            width={300}
            height={300}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {product.discountPercentage > 0 && (
            <Badge className="absolute top-3 left-3 bg-red-500 hover:bg-red-600 text-white">
              -{product.discountPercentage.toFixed(0)}% OFF
            </Badge>
          )}
          <div
            className={`absolute top-3 right-3 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
          >
            <Button variant="secondary" size="icon" className="h-8 w-8 bg-white/80 hover:bg-white">
              <Heart className="h-4 w-4" />
            </Button>
          </div>
          <div
            className={`absolute inset-x-3 bottom-3 transition-opacity duration-300 ${isHovered ? "opacity-100" : "opacity-0"}`}
          >
            <Button variant="secondary" size="sm" className="w-full bg-white/90 hover:bg-white">
              <Eye className="h-4 w-4 mr-2" />
              Quick View
            </Button>
          </div>
        </div>
      </Link>

      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <Badge variant="outline" className="text-xs">
            {product.category}
          </Badge>
          <div className="flex items-center space-x-1">
            <Star className="h-3 w-3 text-yellow-400 fill-current" />
            <span className="text-xs text-slate-600 dark:text-slate-400">{product.rating}</span>
          </div>
        </div>

        <Link href={`/product/${product.id}`}>
          <h3 className="font-semibold text-sm line-clamp-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
            {product.title}
          </h3>
        </Link>

        <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">{product.description}</p>

        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-blue-600">${product.price}</span>
            {product.discountPercentage > 0 && (
              <span className="text-sm text-slate-400 line-through">${originalPrice.toFixed(2)}</span>
            )}
          </div>

          {!isInStock && (
            <div className="flex items-center text-red-500 text-xs">
              <AlertCircle className="h-3 w-3 mr-1" />
              {product.availabilityStatus}
            </div>
          )}
        </div>

        <Button
          onClick={handleAddToCart}
          disabled={!isInStock || isChecking}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-slate-400 disabled:to-slate-500"
          size="sm"
        >
          {isChecking ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Adding...
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4 mr-2" />
              {isInStock ? "Add to Cart" : "Out of Stock"}
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
