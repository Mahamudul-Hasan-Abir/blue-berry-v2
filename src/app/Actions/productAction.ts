// src/actions/product.actions.ts

export const getSingleProduct = async (id: string) => {
  try {
    const res = await fetch(
      `https://blue-berry-server-v2.vercel.app/api/v2/product/${id}`,
      {
        cache: "no-store",
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
