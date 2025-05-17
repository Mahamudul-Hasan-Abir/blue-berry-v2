"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "@/ProductCard/ProductCard";
import { Heading } from "@/components/ui/Heading/Heading";
import Container from "@/components/ui/Container/Container";

interface Review {
  rating: number;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  sale_price: number;
  image: string;
  category: string;
  color: string;
  reviews: Review[];
}

const getAverageRating = (reviews: Review[]): number => {
  if (!reviews || reviews.length === 0) return 0;
  const total = reviews.reduce((acc, cur) => acc + cur.rating, 0);
  const average = total / reviews.length;
  return Math.round(average);
};

const NewArrival = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://blue-berry-server-v2.vercel.app/api/v2/product"
        );
        const data = await res.json();
        const allProducts: Product[] = data?.data || [];

        // Get last 8 products
        const last8 = allProducts.slice(-8);
        setProducts(last8);
      } catch (error) {
        console.error("Error fetching new arrivals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <p className="text-center">Loading New Arrivals...</p>;

  return (
    <Container>
      <div className="my-10">
        <div className="mt-20 mb-10">
          <Heading className="text-2xl md:text-3xl ">
            New <span className="text-primary">Arrivals</span>
          </Heading>
          <p className="mt-2 ">
            Shop online for new arrivals and get free shipping!
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => {
            const averageRating = getAverageRating(product.reviews);
            return (
              <ProductCard
                key={product._id}
                id={product._id}
                name={product.name}
                price={product.price}
                salePrice={product.sale_price}
                image={product.image}
                category={product.category}
                rating={averageRating}
              />
            );
          })}
        </div>
      </div>
    </Container>
  );
};

export default NewArrival;
