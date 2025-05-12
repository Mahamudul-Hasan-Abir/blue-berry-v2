import AllProducts from "./AllProducts";

export const revalidate = 3600; // ⏱ 1 hour (3600 seconds)

export default async function ProductsPage() {
  const res = await fetch("http://localhost:5200/api/v2/product", {
    next: { revalidate: 3600 },
  });

  const result = await res.json();
  const products = result.data;

  return <AllProducts products={products} />;
}
