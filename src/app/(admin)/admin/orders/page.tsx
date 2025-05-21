/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/Container/Container";
import { Heading } from "@/components/ui/Heading/Heading";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { FilePen } from "lucide-react";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import clsx from "clsx";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Product {
  _id: string;
  name: string;
  image?: string;
  price: number;
  sale_price: number;
}

interface OrderItem {
  product: Product;
  quantity: number;
}

interface Order {
  _id: string;
  user: {
    name: string;
    email: string;
  } | null;
  products: OrderItem[];
  totalPrice: number;
  status: "pending" | "completed" | "canceled";
  createdAt: string;
  updatedAt: string;
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [selectedOrderIndex, setSelectedOrderIndex] = useState<number>(-1);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [statusUpdateLoading, setStatusUpdateLoading] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState<
    "pending" | "completed" | "canceled"
  >("pending");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        if (!token) throw new Error("No access token found");

        const res = await fetch(
          `https://blue-berry-server-v2.vercel.app/api/v2/orders/get`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (!res.ok) throw new Error("Failed to fetch orders");

        const data = await res.json();
        const validOrders = (data?.data || []).filter(
          (order: Order) =>
            order.products && order.products.every((item) => item?.product)
        );
        setOrders(validOrders);
        if (validOrders.length > 0) setSelectedOrderIndex(0);
      } catch (err) {
        toast.error("Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const calculateVAT = (total: number) => total * 0.15;
  const calculateGrandTotal = (total: number) => total + calculateVAT(total);

  if (loading) return <Container>Loading orders...</Container>;
  if (error) return <Container>Error: {error}</Container>;
  if (orders.length === 0) return <Container>No orders found</Container>;

  const selectedOrder = orders[selectedOrderIndex];

  const handleChangeStatusClick = (
    orderId: string,
    currentStatus: Order["status"]
  ) => {
    setSelectedOrderId(orderId);
    setNewStatus(currentStatus);
    setIsDialogOpen(true);
  };

  const handleUpdateStatus = async () => {
    if (!selectedOrderId || !newStatus) return;

    try {
      setStatusUpdateLoading(true);
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        `https://blue-berry-server-v2.vercel.app/api/v2/orders/admin/order/${selectedOrderId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      if (!res.ok) throw new Error("Failed to update order status");

      const updatedOrder = await res.json();

      toast.success("Order status updated successfully");
      setIsDialogOpen(false);

      // Update orders list
      setOrders((prev) =>
        prev.map((order) =>
          order._id === selectedOrderId
            ? { ...order, status: newStatus }
            : order
        )
      );
    } catch (err) {
      toast.error("Error updating status");
    } finally {
      setStatusUpdateLoading(false);
    }
  };

  return (
    <Container>
      <Heading className="text-primary text-lg md:text-2xl mt-5 mb-6">
        Orders Management
      </Heading>

      <div className="grid grid-cols-12 gap-4 md:min-h-[50vh]">
        <div className="col-span-12 lg:col-span-8">
          <div className="border-[1px] border-accent rounded-2xl overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="border-r">
                    <Heading className="text-base">#</Heading>
                  </TableHead>
                  <TableHead className="border-r">
                    <Heading className="text-base">User</Heading>
                  </TableHead>
                  <TableHead className="border-r">
                    <Heading className="text-base">Date</Heading>
                  </TableHead>
                  <TableHead className="border-r">
                    <Heading className="text-base">Items</Heading>
                  </TableHead>
                  <TableHead className="border-r">
                    <Heading className="text-base">Total</Heading>
                  </TableHead>
                  <TableHead className="border-r">
                    <Heading className="text-base">Status</Heading>
                  </TableHead>
                  <TableHead>
                    <Heading className="text-base">Change Status</Heading>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order, index) => (
                  <TableRow
                    key={order._id}
                    className={clsx("border-b cursor-pointer", {
                      "bg-gray-100": index === selectedOrderIndex,
                    })}
                    onClick={() => setSelectedOrderIndex(index)}
                  >
                    <TableCell className="border-r">{index + 1}</TableCell>
                    <TableCell className="border-r">
                      {order.user?.name || "Guest"}
                    </TableCell>
                    <TableCell className="border-r">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="border-r">
                      {order.products.length}
                    </TableCell>
                    <TableCell className="border-r">
                      ${order.totalPrice.toFixed(2)}
                    </TableCell>
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
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() =>
                          handleChangeStatusClick(order._id, order.status)
                        }
                      >
                        <FilePen className="w-4 h-4" />
                      </Button>
                      <Dialog
                        open={isDialogOpen}
                        onOpenChange={setIsDialogOpen}
                      >
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Update Order Status</DialogTitle>
                          </DialogHeader>

                          <div className="space-y-4">
                            <Label htmlFor="status">Select new status:</Label>
                            <Select
                              value={newStatus}
                              onValueChange={(value) =>
                                setNewStatus(
                                  value as "pending" | "completed" | "canceled"
                                )
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="completed">
                                  Completed
                                </SelectItem>
                                <SelectItem value="canceled">
                                  Canceled
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <DialogFooter className="mt-4">
                            <Button
                              onClick={handleUpdateStatus}
                              disabled={statusUpdateLoading}
                            >
                              {statusUpdateLoading
                                ? "Updating..."
                                : "Update Status"}
                            </Button>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        {selectedOrderIndex >= 0 && selectedOrder && (
          <div className="col-span-12 lg:col-span-4">
            <div className="border-[1px] border-accent p-5 rounded-2xl">
              <Heading className="text-lg mb-4">Order Details</Heading>

              <div className="space-y-4">
                {selectedOrder?.products?.map((item) => (
                  <Card
                    key={item.product._id}
                    className="flex flex-row items-center p-4 gap-4 bg-secondary shadow-none"
                  >
                    <div className="w-24 h-24 relative overflow-hidden border-[1px] border-accent rounded-xl bg-white">
                      <Image
                        src={item.product.image || "/placeholder.jpg"}
                        alt={item.product.name}
                        width={96}
                        height={96}
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      <h3 className="text-[15px] font-medium text-[#3d4750]">
                        {item.product.name}
                      </h3>
                      <p className="text-base text-primary">
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

              <div className="billing mt-6">
                <div className="flex justify-between my-3">
                  <p className="font-medium text-lg text-[#777]">Subtotal:</p>
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
                  <p className="font-medium text-lg text-primary">
                    Grand Total:
                  </p>
                  <p className="font-medium text-lg text-primary">
                    $
                    {calculateGrandTotal(
                      selectedOrder?.totalPrice || 0
                    ).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Container>
  );
};

export default Orders;
