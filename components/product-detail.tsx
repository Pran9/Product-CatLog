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
        const response = await fetch(`https://dummyjson.com/products/${productId}`)
        const data = await response.json()
        setProduct(data)

        // Fetch related products from the same category
        const relatedResponse = await fetch(`https://dummyjson.com/products/category/${data.category}?limit=4`)
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
      description: `${product.title} has been added to your cart.`,
    })
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="aspect-square bg-muted rounded-lg"></div>
              <div className="grid grid-cols-4 gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="aspect-square bg-muted rounded"></div>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <div className="h-8 bg-muted rounded"></div>
              <div className="h-4 bg-muted rounded w-3/4"></div>
              <div className="h-6 bg-muted rounded w-1/4"></div>
              <div className="h-20 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <Link href="/">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Products
          </Button>
        </Link>
      </div>
    )
  }

  const originalPrice =
    product.discountPercentage > 0 ? product.price / (1 - product.discountPercentage / 100) : product.price

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Products
      </Link>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg border">
            <Image
              src={product.images?.[selectedImage] || product.thumbnail}
              alt={product.title}
              width={600}
              height={600}
              className="h-full w-full object-cover"
            />
          </div>
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden rounded border-2 transition-colors ${
                    selectedImage === index ? "border-primary" : "border-muted"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.title} ${index + 1}`}
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
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">{product.category}</Badge>
              <Badge variant="outline">{product.brand}</Badge>
            </div>
            <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
            <p className="text-muted-foreground">SKU: {product.sku}</p>
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              ({product.rating} rating • {product.reviews.length} reviews)
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="text-3xl font-bold">${product.price}</span>
              {product.discountPercentage > 0 && (
                <>
                  <span className="text-lg text-muted-foreground line-through">${originalPrice.toFixed(2)}</span>
                  <Badge variant="destructive">{product.discountPercentage.toFixed(0)}% OFF</Badge>
                </>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              Status:{" "}
              <span className={product.availabilityStatus === "In Stock" ? "text-green-600" : "text-red-600"}>
                {product.availabilityStatus}
              </span>
              {product.stock > 0 && ` • ${product.stock} in stock`}
            </p>
            {product.minimumOrderQuantity > 1 && (
              <p className="text-sm text-muted-foreground">Minimum order quantity: {product.minimumOrderQuantity}</p>
            )}
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold mb-2">Description</h3>
            <p className="text-muted-foreground leading-relaxed">{product.description}</p>
          </div>

          <div className="flex space-x-4">
            <Button
              onClick={handleAddToCart}
              disabled={product.availabilityStatus !== "In Stock" || product.stock === 0}
              size="lg"
              className="flex-1"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              {product.availabilityStatus === "In Stock" && product.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </Button>
            <Button variant="outline" size="lg">
              <Heart className="h-4 w-4" />
            </Button>
          </div>

          {/* Product Information Cards */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Truck className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Shipping</p>
                    <p className="text-xs text-muted-foreground">{product.shippingInformation}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Warranty</p>
                    <p className="text-xs text-muted-foreground">{product.warrantyInformation}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <RotateCcw className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Returns</p>
                    <p className="text-xs text-muted-foreground">{product.returnPolicy}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-2">
                  <Package className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Weight</p>
                    <p className="text-xs text-muted-foreground">{product.weight}g</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Product Reviews */}
      {product.reviews && product.reviews.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Customer Reviews</h2>
          <div className="space-y-4">
            {product.reviews.slice(0, 3).map((review, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium">{review.reviewerName}</p>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{new Date(review.date).toLocaleDateString()}</p>
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
