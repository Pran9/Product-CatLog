import ProductDetail from "@/components/product-detail"

type Props = {
  params: { id: string }
}

export default async function ProductDetailPage({ params }: Props) {
  return <ProductDetail productId={params.id} />
}
