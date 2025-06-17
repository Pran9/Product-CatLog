import ProductDetail from "@/components/product-detail"

interface ProductDetailPageProps {
  params: {
    id: string
  }
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  return <ProductDetail productId={params.id} />
}
