import { Metadata } from 'next'
import ProductDetail from '@/components/product-detail'

interface ProductPageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  return {
    title: `Product ${params.id}`,
    description: 'Product details page',
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  return <ProductDetail productId={params.id} />
}