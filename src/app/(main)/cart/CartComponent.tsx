/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import BreadCrumb from "@/Breadcrumb/Breadcrumb";
import Container from "@/components/ui/Container/Container";
import { Heading } from "@/components/ui/Heading/Heading";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  getUserCart,
  removeFromCart,
  updateCartItem,
} from "@/app/Actions/cartAction";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import DealOfTheDay from "@/DealOfTheDay/DealOfTheDay";
import NewArrivalForCart from "@/NewArraivalForCart/NewArraivalForCart";
import Link from "next/link";

// Dummy product data type
type CartItem = {
  id: string;
  name: string;
  sku: string;
  image: string;
  price: number;
  quantity: number;
};

const CartComponent = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState(0);
  const [vat, setVat] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);
  const handleRemoveItem = async (productId: string) => {
    try {
      await removeFromCart(productId);
      // Update the state to reflect deletion
      setCartItems((prev) => prev.filter((item) => item.id !== productId));
      toast.success("Product has been removed from the Cart!");
    } catch (error) {
      toast.error("Failed to remove item from Cart!");
      console.error("Failed to remove item:", error);
    }
  };

  useEffect(() => {
    const totalPrice = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const vatAmount = +(totalPrice * 0.15).toFixed(2);
    const grand = +(totalPrice + vatAmount).toFixed(2);

    setTotal(totalPrice);
    setVat(vatAmount);
    setGrandTotal(grand);
  }, [cartItems]);

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("accessToken"); // Adjust key if different
      if (!token) return;

      const data = await getUserCart(token);
      console.log("consoling fetched cart data", data);
      const mapped = data.map((item: any) => ({
        id: item.product._id,
        name: item.product.name,
        sku: item.product.sku,
        image: item.product.image,
        price: item.product.price,
        quantity: item.number,
      }));

      setCartItems(mapped);
    };

    fetchCart();
  }, []);

  console.log(cartItems);

  const handleIncrement = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecrement = (id: string) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const handleQuantityChange = async (
    productId: string,
    currentQuantity: number,
    type: "increase" | "decrease"
  ) => {
    const newQuantity =
      type === "increase" ? currentQuantity + 1 : currentQuantity - 1;

    // Prevent decrease if current quantity is 1
    if (type === "decrease" && currentQuantity <= 1) {
      toast.info("Minimum quantity is 1");
      return;
    }

    try {
      await updateCartItem(productId, newQuantity);
      setCartItems((prev) =>
        prev.map((item) =>
          item.id === productId ? { ...item, quantity: newQuantity } : item
        )
      );
      toast.success("Cart updated!");
    } catch (error: any) {
      toast.error("Failed to update cart");
      console.log("Failed to update cart", error);
    }
  };
  return (
    <Container>
      <BreadCrumb />
      <div>
        <div className="py-5 md:pb-20 md:pt-10 ">
          <Heading className="text-3xl text-primary md:text-4xl lg:text-6xl">
            Shopping Cart
          </Heading>
        </div>

        <div className="grid grid-cols-12 gap-6">
          <div className="w-full overflow-x-auto col-span-12 xl:col-span-8">
            <Table className="min-w-[600px] w-full">
              <TableHeader className="bg-secondary">
                <TableRow>
                  <TableHead className="w-[50%]">Product</TableHead>
                  <TableHead className="w-[20%] text-center">
                    Quantity
                  </TableHead>
                  <TableHead className="w-[20%] text-center">Price</TableHead>
                  <TableHead className="w-[10%] text-center">
                    Remove Item
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cartItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="flex gap-4 items-center">
                      <Image
                        className="object-contain rounded"
                        height={60}
                        width={60}
                        src={item.image}
                        alt={item.name}
                      />
                      <div>
                        <p className="font-medium">{item.name}</p>
                        <p className="text-muted-foreground text-sm">
                          SKU#: {item.sku}
                        </p>
                      </div>
                    </TableCell>

                    <TableCell className="text-center">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          onClick={() =>
                            handleQuantityChange(
                              item.id,
                              item.quantity,
                              "decrease"
                            )
                          }
                        >
                          -
                        </Button>
                        <span>{item.quantity}</span>
                        <Button
                          variant="outline"
                          onClick={() =>
                            handleQuantityChange(
                              item.id,
                              item.quantity,
                              "increase"
                            )
                          }
                        >
                          +
                        </Button>
                      </div>
                    </TableCell>

                    <TableCell className="text-center">
                      ${item.price * item.quantity}
                    </TableCell>
                    <TableCell className="text-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          {
                            handleRemoveItem(item.id);
                          }
                          console.log(item.id);
                        }}
                        className="cursor-pointer"
                      >
                        <Trash2 className="text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="billing border-[1px] rounded-2xl border-accent col-span-12 xl:col-span-4 h-[220px] p-5">
            <div className="flex justify-between my-3">
              <p className="font-medium text-lg text-[#777]">Total:</p>
              <p className="font-medium text-lg text-[#777]">
                ${total.toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between my-3">
              <p className="font-medium text-lg text-[#777]">VAT (15%):</p>
              <p className="font-medium text-lg text-[#777]">
                ${vat.toFixed(2)}
              </p>
            </div>
            <div className="flex justify-between my-3">
              <p className="font-medium text-lg text-primary">Grand Total:</p>
              <p className="font-medium text-lg text-primary">
                ${grandTotal.toFixed(2)}
              </p>
            </div>
            <Link href="/checkout">
              <Button className="w-full mt-4">Checkout</Button>
            </Link>
          </div>
        </div>
      </div>
      <NewArrivalForCart></NewArrivalForCart>
    </Container>
  );
};

export default CartComponent;
