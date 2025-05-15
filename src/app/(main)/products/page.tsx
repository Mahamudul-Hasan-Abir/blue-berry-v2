import AllProducts from "./AllProducts";

export const revalidate = 3600; // ⏱ 1 hour (3600 seconds)

export default async function ProductsPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BLUE_BERRY}/product`, {
    next: { revalidate: 3600 },
    cache: "force-cache",
  });

  const result = await res.json();
  const products = result.data;

  return <AllProducts products={products} />;
}
