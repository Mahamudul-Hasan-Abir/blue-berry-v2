"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import Container from "@/components/ui/Container/Container";
import Image from "next/image";
import BreadCrumb from "@/Breadcrumb/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/Heading/Heading";
import { Badge } from "@/components/ui/badge";
import clsx from "clsx";

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

interface Order {
  _id: string;
  createdAt: string;
  totalPrice: number;
  status: string;
  products: OrderProduct[];
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrderIndex, setSelectedOrderIndex] = useState<number>(0);
  // Get Orders For Individual User
  useEffect(() => {
    const fetchOrders = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) return;

      try {
        const res = await fetch(
          `https://blue-berry-server-v2.vercel.app/api/v2/orders/my-orders`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }

        const json = await res.json();
        setOrders(json.data); // assuming response: { data: [...] }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    fetchOrders();
  }, []);

  const selectedOrder = orders[selectedOrderIndex];

  const calculateVAT = (total: number) => total * 0.15;
  const calculateGrandTotal = (total: number) => total + calculateVAT(total);

  //   Cancel Order for individual user

  const handleCancelOrder = async (orderId: string) => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    const confirmDelete = confirm(
      "Are you sure you want to cancel this order?"
    );
    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `https://blue-berry-server-v2.vercel.app/api/v2/orders/order/${orderId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to cancel order");
      }

      // Remove order from local state
      setOrders((prev) => prev.filter((order) => order._id !== orderId));
      setSelectedOrderIndex(0);
      alert("Order cancelled successfully!");
    } catch (error) {
      console.error("Error cancelling order:", error);
      alert("Error cancelling order. Try again.");
    }
  };
  return (
    <Container>
      <BreadCrumb></BreadCrumb>
      <div className="grid grid-cols-12 gap-4 md:min-h-[50vh]">
        {/* Orders Table */}
        <div className="col-span-12 lg:col-span-8">
          <div className="border-[1px] border-accent rounded-2xl">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="border-r">
                    <Heading className="text-base">Order Number</Heading>
                  </TableHead>
                  <TableHead className="border-r">
                    <Heading className="text-base">Order Date</Heading>
                  </TableHead>
                  <TableHead className="border-r">
                    <Heading className="text-base">Order Total</Heading>
                  </TableHead>
                  <TableHead className="border-r">
                    <Heading className="text-base">Payment Method</Heading>
                  </TableHead>
                  <TableHead className="border-r">
                    <Heading className="text-base">Status</Heading>
                  </TableHead>
                  <TableHead>
                    <Heading className="text-base">Cancel Order</Heading>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order, index) => (
                  <TableRow
                    key={order._id}
                    className={`${
                      index === selectedOrderIndex ? "bg-gray-100" : ""
                    } border-b`}
                    onClick={() => setSelectedOrderIndex(index)}
                  >
                    <TableCell className="border-r flex justify-center">
                      {index + 1}
                    </TableCell>
                    <TableCell className="border-r">
                      {new Intl.DateTimeFormat("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      }).format(new Date(order.createdAt))}
                    </TableCell>
                    <TableCell className="border-r">
                      ${order.totalPrice.toFixed(2)}
                    </TableCell>
                    <TableCell className="border-r">Cash On Delivery</TableCell>
                    <TableCell className="border-r">
                      <Badge
                        className={clsx("px-2 py-1 rounded", {
                          "bg-yellow-200 text-yellow-800":
                            order.status === "pending",
                          "bg-green-200 text-green-800":
                            order.status === "completed",
                          "bg-red-200 text-red-800":
                            order.status === "canceled",
                        })}
                      >
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="flex justify-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="cursor-pointer"
                        onClick={() => handleCancelOrder(order._id)}
                      >
                        <Trash2 className="text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Order Details Cards */}
        <div className="col-span-12 lg:col-span-4">
          <div className="border-[1px] border-accent p-5 rounded-2xl">
            <div className="space-y-4">
              {selectedOrder?.products.map((item) => (
                <Card
                  key={item.product._id}
                  className="flex flex-row items-center p-4 gap-4 bg-secondary shadow-none"
                >
                  <div className="w-24 h-24 relative overflow-hidden border-[1px] border-accent rounded-xl bg-white">
                    <Image
                      src={item.product.image}
                      alt={item.product.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="tracking-[0.03rem] text-[15px] font-medium leading-[18px] text-[#3d4750]">
                      {item.product.name}
                    </h3>
                    <p className="text-base text-muted-foreground text-primary">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-sm text-muted-foreground font-bold">
                      Price: ${item.product.sale_price.toFixed(2)}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
            <hr className="my-5" />
            {/* Billing Summary */}
            <div className="billing mt-6">
              <div className="flex justify-between my-3">
                <p className="font-medium text-lg text-[#777]">Total:</p>
                <p className="font-medium text-lg text-[#777]">
                  ${selectedOrder?.totalPrice.toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between my-3">
                <p className="font-medium text-lg text-[#777]">VAT (15%):</p>
                <p className="font-medium text-lg text-[#777]">
                  ${calculateVAT(selectedOrder?.totalPrice || 0).toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between my-3">
                <p className="font-medium text-lg text-primary">Grand Total:</p>
                <p className="font-medium text-lg text-primary">
                  $
                  {calculateGrandTotal(selectedOrder?.totalPrice || 0).toFixed(
                    2
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Orders;
