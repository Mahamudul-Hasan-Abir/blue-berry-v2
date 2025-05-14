// src/actions/cart.actions.ts

export const getUserCart = async (token: string) => {
  try {
    const res = await fetch("http://localhost:5200/api/v2/user-cart/cart", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: { revalidate: 0 },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch cart items");
    }

    const json = await res.json();
    return json.data;
  } catch (error) {
    console.error("Error fetching cart:", error);
    return [];
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const removeFromCart = async (productId: string): Promise<any> => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    const res = await fetch(
      `http://localhost:5200/api/v2/user-cart/cart/remove`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ productId }),
      }
    );

    if (!res.ok) {
      throw new Error("Failed to remove item from cart");
    }

    return await res.json();
  } catch (error) {
    console.error("Remove from cart failed:", error);
    throw error;
  }
};
