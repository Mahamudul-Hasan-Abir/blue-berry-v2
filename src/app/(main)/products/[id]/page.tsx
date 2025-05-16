/* eslint-disable @typescript-eslint/no-explicit-any */
import { getSingleProduct } from "@/app/Actions/productAction";
import ProductDetailsComponent from "./ProductDetailsComponent";

const ProductDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const product = await getSingleProduct(id);
  if (!product) {
    return <div className="text-center text-red-500">Product not found</div>;
  }
  return (
    <div>
      <ProductDetailsComponent product={product} />
    </div>
  );
};

export default ProductDetailsPage;

export async function generateStaticParams() {
  const res = await fetch(`http://localhost:5200/api/v2/product`, {
    cache: "no-store",
  });

  const json = await res.json();
  const products = json.data?.slice(0, 100) || [];

  return products.map((product: any) => ({
    id: product._id,
  }));
}
