/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { SquarePen, Star, Trash2 } from "lucide-react";
import Container from "@/components/ui/Container/Container";
import { Heading } from "@/components/ui/Heading/Heading";
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
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";

const GetProducts = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      const res = await fetch(
        "https://blue-berry-server-v2.vercel.app/api/v2/product"
      );
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data?.data);
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Delete product handler
  const handleDeleteProduct = async () => {
    if (!selectedProduct) return;
    const token = localStorage.getItem("accessToken"); // Or from cookies

    try {
      const res = await fetch(
        `https://blue-berry-server-v2.vercel.app/api/v2/product/${selectedProduct._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) throw new Error("Failed to delete product");

      toast.success("Product deleted successfully");
      setDeleteDialogOpen(false);
      setSelectedProduct(null);
      fetchProducts(); // Refresh the list
    } catch (err: any) {
      toast.error(err.message || "Failed to delete");
    }
  };

  if (loading) return <p>Loading.....</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <Container>
      <Heading className="text-primary text-lg md:text-2xl mt-5">
        All Products List
      </Heading>

      <div className="table-div mt-6 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Image</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product._id}>
                <TableCell>
                  <div className="h-12 w-12 relative object-cover rounded">
                    <Image src={product.image} alt={product.name} fill />
                  </div>
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.stock_quantity}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="flex rounded-sm bg-accent items-center w-14 px-2 py-1 justify-between">
                      <Star
                        className="size-4"
                        fill="gold"
                        strokeWidth={1}
                        stroke="yellow"
                      />
                      <p className="font-semibold">{product.totalRating}</p>
                    </div>
                    <p>{product.reviews?.length || 0} reviews</p>
                  </div>
                </TableCell>
                <TableCell className="flex gap-2 items-center">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="cursor-pointer"
                        onClick={() => setSelectedProduct(product)}
                      >
                        <SquarePen className="text-primary" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Product</DialogTitle>
                      </DialogHeader>
                      <form className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">
                            Name
                          </label>
                          <input
                            type="text"
                            defaultValue={selectedProduct?.name}
                            className="w-full p-2 border rounded"
                          />
                        </div>
                        {/* Add your fields later */}
                        <Button type="submit">Save</Button>
                      </form>
                    </DialogContent>
                  </Dialog>
                  <Dialog
                    open={deleteDialogOpen}
                    onOpenChange={setDeleteDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedProduct(product);
                          setDeleteDialogOpen(true);
                        }}
                      >
                        <Trash2 className="text-red-500" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>
                          Are you sure you want to delete this product?
                        </DialogTitle>
                      </DialogHeader>
                      <p className="text-gray-600 my-2">
                        {selectedProduct?.name}
                      </p>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setDeleteDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="destructive"
                          onClick={handleDeleteProduct}
                        >
                          Delete
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
    </Container>
  );
};

export default GetProducts;
