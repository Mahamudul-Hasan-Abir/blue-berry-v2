// "use client";

// import React, { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { useAuth } from "@/Context/AuthContext";
// import OrdersComponent from "./OrdersComponent";

// interface Product {
//   _id: string;
//   name: string;
//   image: string;
//   sale_price: number;
// }

// interface OrderProduct {
//   product: Product;
//   quantity: number;
// }

// export interface Order {
//   _id: string;
//   createdAt: string;
//   totalPrice: number;
//   status: string;
//   products: OrderProduct[];
// }

// const Orders = () => {
//   const { isAuthenticated } = useAuth();
//   const router = useRouter();
//   const [orders, setOrders] = useState<Order[]>([]);
//   const [selectedOrderIndex, setSelectedOrderIndex] = useState<number>(0);
//   const [authChecked, setAuthChecked] = useState(false);

//   // Auth check and redirect
//   useEffect(() => {
//     if (isAuthenticated === false) {
//       localStorage.setItem("redirectPath", window.location.pathname);
//       router.replace("/login");
//     } else if (isAuthenticated === true) {
//       setAuthChecked(true); // ✅ Auth has been verified
//     }
//   }, [isAuthenticated, router]);

//   // Fetch orders only after auth is checked
//   useEffect(() => {
//     if (!authChecked) return;

//     const fetchOrders = async () => {
//       const token = localStorage.getItem("accessToken");
//       if (!token) return;

//       try {
//         const res = await fetch(
//           `https://blue-berry-server-v2.vercel.app/api/v2/orders/my-orders`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (!res.ok) {
//           throw new Error("Failed to fetch orders");
//         }

//         const json = await res.json();
//         setOrders(json.data || []);
//       } catch (error) {
//         console.error("Error fetching orders:", error);
//       }
//     };

//     fetchOrders();
//   }, [authChecked]);

//   if (!authChecked) return null;

//   return (
//     <OrdersComponent
//       orders={orders}
//       selectedOrderIndex={selectedOrderIndex}
//       setSelectedOrderIndex={setSelectedOrderIndex}
//       handleCancelOrder={handleCancelOrder}
//     />
//   );

//   function handleCancelOrder(orderId: string) {
//     const token = localStorage.getItem("accessToken");
//     if (!token) return;

//     const confirmDelete = confirm(
//       "Are you sure you want to cancel this order?"
//     );
//     if (!confirmDelete) return;

//     fetch(`https://blue-berry-server-v2.vercel.app/api/v2/orders/order/${orderId}`, {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to cancel order");
//         setOrders((prev) => prev.filter((order) => order._id !== orderId));
//         setSelectedOrderIndex(0);
//         alert("Order cancelled successfully!");
//       })
//       .catch((err) => {
//         console.error(err);
//         alert("Error cancelling order. Try again.");
//       });
//   }
// };

// export default Orders;
"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/Context/AuthContext";
import OrdersComponent from "./OrdersComponent";

interface Product {
  _id: string;
  name: string;
  image: string;
  sale_price: number;
}

interface OrderProduct {
  product: Product;
  quantity: number;
}

export interface Order {
  _id: string;
  createdAt: string;
  totalPrice: number;
  status: string;
  products: OrderProduct[];
}

const Orders = () => {
  const { isAuthenticated, loading } = useAuth(); // ← include loading
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrderIndex, setSelectedOrderIndex] = useState<number>(0);

  // Redirect unauthenticated user
  useEffect(() => {
    if (!loading && isAuthenticated === false) {
      localStorage.setItem("redirectPath", window.location.pathname);
      router.replace("/login");
    }
  }, [isAuthenticated, loading, router]);

  // Fetch orders only after auth is verified
  useEffect(() => {
    if (!isAuthenticated || loading) return;

    const fetchOrders = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      try {
        const res = await fetch(
          `https://blue-berry-server-v2.vercel.app/api/v2/orders/my-orders`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }

        const json = await res.json();
        setOrders(json.data || []);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, [isAuthenticated, loading]);

  // Prevent rendering anything while auth is loading
  if (loading || isAuthenticated === false) return null;

  return (
    <OrdersComponent
      orders={orders}
      selectedOrderIndex={selectedOrderIndex}
      setSelectedOrderIndex={setSelectedOrderIndex}
      handleCancelOrder={handleCancelOrder}
    />
  );

  function handleCancelOrder(orderId: string) {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    const confirmDelete = confirm(
      "Are you sure you want to cancel this order?"
    );
    if (!confirmDelete) return;

    fetch(
      `https://blue-berry-server-v2.vercel.app/api/v2/orders/order/${orderId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((res) => {
        if (!res.ok) throw new Error("Failed to cancel order");
        setOrders((prev) => prev.filter((order) => order._id !== orderId));
        setSelectedOrderIndex(0);
        alert("Order cancelled successfully!");
      })
      .catch((err) => {
        console.error(err);
        alert("Error cancelling order. Try again.");
      });
  }
};

export default Orders;
