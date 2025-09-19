"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, ShoppingCart, ArrowLeft, Heart, Package, Truck, Shield, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/contexts/cart-context"
import { useToast } from "@/hooks/use-toast"
import ProductCard from "./product-card"

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

interface ProductDetailProps {
  productId: string
}

export default function ProductDetail({ productId }: ProductDetailProps) {
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
  const [selectedImage, setSelectedImage] = useState(0)
  const [loading, setLoading] = useState(true)
  const { dispatch } = useCart()
  const { toast } = useToast()

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/Rs. {productId}`)
        const data = await response.json()
        setProduct(data)

        // Fetch related products from the same category
        const relatedResponse = await fetch(`https://dummyjson.com/products/category/Rs. {data.category}?limit=4`)
        const relatedData = await relatedResponse.json()
        setRelatedProducts(relatedData.products.filter((p: Product) => p.id !== data.id))
      } catch (error) {
        console.error("Error fetching product:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProduct()
  }, [productId])

  const handleAddToCart = () => {
    if (!product) return

    if (product.availabilityStatus !== "In Stock" || product.stock === 0) {
      toast({
        title: "Product Out of Stock",
        description: "This product is currently unavailable.",
        variant: "destructive",
      })
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
      description: `Rs. {product.title} has been added to your cart.`,
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="animate-pulse">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="aspect-square bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
                <div className="grid grid-cols-4 gap-2">
                  {[...Array(4)].map((_, i) => (
                    <div key={i} className="aspect-square bg-slate-200 dark:bg-slate-700 rounded"></div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-1/4"></div>
                <div className="h-20 bg-slate-200 dark:bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="container mx-auto px-4 py-8 text-center max-w-7xl">
          <div className="py-16">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <Link href="/">
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const originalPrice =
    product.discountPercentage > 0 ? product.price / (1 - product.discountPercentage / 100) : product.price

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Products
        </Link>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
              <Image
                src={product.images?.[selectedImage] || product.thumbnail}
                alt={product.title}
                width={600}
                height={600}
                className="h-full w-full object-cover"
              />
            </div>
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`aspect-square overflow-hidden rounded-lg border-2 transition-all Rs. {
                      selectedImage === index
                        ? "border-blue-500 ring-2 ring-blue-200 dark:ring-blue-800"
                        : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                    }`}
                  >
                    <Image
                      src={image || "/placeholder.svg"}
                      alt={`Rs. {product.title} Rs. {index + 1}`}
                      width={150}
                      height={150}
                      className="h-full w-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                  {product.category}
                </Badge>
                <Badge variant="outline">{product.brand}</Badge>
              </div>
              <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
                {product.title}
              </h1>
              <p className="text-slate-600 dark:text-slate-400">SKU: {product.sku}</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 Rs. {
                      i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-slate-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-slate-600 dark:text-slate-400">
                ({product.rating} rating • {product.reviews.length} reviews)
              </span>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-3xl font-bold text-blue-600">Rs. {product.price}</span>
                {product.discountPercentage > 0 && (
                  <>
                    <span className="text-lg text-slate-400 line-through">Rs. {originalPrice.toFixed(2)}</span>
                    <Badge variant="destructive" className="bg-red-500 hover:bg-red-600">
                      {product.discountPercentage.toFixed(0)}% OFF
                    </Badge>
                  </>
                )}
              </div>
              <div className="flex items-center space-x-4">
                <p className="text-sm">
                  Status:{" "}
                  <span
                    className={
                      product.availabilityStatus === "In Stock"
                        ? "text-green-600 font-medium"
                        : "text-red-600 font-medium"
                    }
                  >
                    {product.availabilityStatus}
                  </span>
                </p>
                {product.stock > 0 && (
                  <p className="text-sm text-slate-600 dark:text-slate-400">{product.stock} in stock</p>
                )}
              </div>
              {product.minimumOrderQuantity > 1 && (
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Minimum order quantity: {product.minimumOrderQuantity}
                </p>
              )}
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-3 text-lg">Description</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{product.description}</p>
            </div>

            <div className="flex space-x-4">
              <Button
                onClick={handleAddToCart}
                disabled={product.availabilityStatus !== "In Stock" || product.stock === 0}
                size="lg"
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {product.availabilityStatus === "In Stock" && product.stock > 0 ? "Add to Cart" : "Out of Stock"}
              </Button>
              <Button variant="outline" size="lg" className="hover:bg-red-50 hover:text-red-600 hover:border-red-200">
                <Heart className="h-5 w-5" />
              </Button>
            </div>

            {/* Product Information Cards */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
                      <Truck className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Shipping</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{product.shippingInformation}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
                      <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Warranty</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{product.warrantyInformation}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-orange-100 dark:bg-orange-900 rounded-lg">
                      <RotateCcw className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Returns</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{product.returnPolicy}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
                      <Package className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Weight</p>
                      <p className="text-xs text-slate-600 dark:text-slate-400">{product.weight}g</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Product Reviews */}
        {product.reviews && product.reviews.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
              Customer Reviews
            </h2>
            <div className="grid gap-6">
              {product.reviews.slice(0, 3).map((review, index) => (
                <Card key={index} className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <p className="font-medium text-slate-900 dark:text-slate-100">{review.reviewerName}</p>
                        <div className="flex items-center mt-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 Rs. {
                                i < review.rating ? "text-yellow-400 fill-current" : "text-slate-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {new Date(review.date).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 leading-relaxed">{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-8 bg-gradient-to-r from-slate-900 to-slate-700 dark:from-slate-100 dark:to-slate-300 bg-clip-text text-transparent">
              Related Products
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
