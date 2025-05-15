// src/actions/product.actions.ts

export const getSingleProduct = async (id: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BLUE_BERRY}/product/${id}`,
      {
        next: { revalidate: 3600 }, // Revalidate every hour
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch product");
    }

    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
};
