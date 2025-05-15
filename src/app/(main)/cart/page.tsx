// components/Cart.tsx
"use client";
import { useAuth } from "@/Context/AuthContext";
import CartComponent from "./CartComponent";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Cart = () => {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem("redirectPath", window.location.pathname);
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div>
      <CartComponent></CartComponent>
    </div>
  );
};

export default Cart;
