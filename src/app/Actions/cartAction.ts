/* eslint-disable @typescript-eslint/no-explicit-any */
// src/actions/cart.actions.ts

export const getUserCart = async (token: string) => {
  try {
    const res = await fetch(
      `https://blue-berry-server-v2.vercel.app/api/v2/user-cart/cart`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { revalidate: 0 },
      }
    );

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

export const removeFromCart = async (productId: string): Promise<any> => {
  try {
    const accessToken = localStorage.getItem("accessToken");
    console.log(accessToken);
    const res = await fetch(
      `https://blue-berry-server-v2.vercel.app/api/v2/user-cart/cart/remove`,
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

// src/app/Actions/cartAction.ts

export const updateCartItem = async (
  productId: string,
  number: number
): Promise<any> => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    const res = await fetch(
      `https://blue-berry-server-v2.vercel.app/api/v2/user-cart/cart/update`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({ productId, number }),
      }
    );

    if (!res.ok) {
      throw new Error("Failed to update cart item");
    }

    return await res.json();
  } catch (error) {
    console.error("Update cart item failed:", error);
    throw error;
  }
};

export const addToCart = async (
  productId: string,
  number: number
): Promise<any> => {
  try {
    const token = localStorage.getItem("accessToken");

    const res = await fetch(
      `https://blue-berry-server-v2.vercel.app/api/v2/user-cart/cart/add`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, number }),
      }
    );

    if (!res.ok) {
      throw new Error("Failed to add product to cart");
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error adding to cart:", error);
    throw error;
  }
};
