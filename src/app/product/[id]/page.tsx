import ProductDetail from "@/components/product-detail"

interface Props {
  params: {
    id: string;
  };
}

const ProductPage = async ({ params }: Props) => {
  const { id } = params;

  return <ProductDetail productId={id} />;
};

export default ProductPage;
