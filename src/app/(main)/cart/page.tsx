// components/Cart.tsx
"use client";
import { useAuth } from "@/Context/AuthContext";
import CartComponent from "./CartComponent";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Cart = () => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && isAuthenticated === false) {
      localStorage.setItem("redirectPath", window.location.pathname);
      router.replace("/login");
    }
  }, [isAuthenticated, router, loading]);
  // Prevent rendering anything while auth is loading
  if (loading || isAuthenticated === false) return null;
  // if (!isAuthenticated) {
  //   return null;
  // }

  return (
    <div>
      <CartComponent></CartComponent>
    </div>
  );
};

export default Cart;
