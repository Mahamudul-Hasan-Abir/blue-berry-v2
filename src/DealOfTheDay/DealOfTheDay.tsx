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

const getAverageRating = (reviews: { rating: number }[]): number => {
  if (!reviews || reviews.length === 0) return 0;
  const total = reviews.reduce((acc, cur) => acc + cur.rating, 0);
  return Math.round(total / reviews.length);
};

const DealOfTheDay = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://blue-berry-server-v2.vercel.app/api/v2/product"
        );
        const data = await res.json();
        setProducts(data.data.slice(0, 4)); // First 4 products
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <Container>
      <div className="my-10">
        <div className="mt-20 mb-10">
          <Heading className="text-2xl md:text-3xl ">
            Day Of The <span className="text-primary">Deal</span>
          </Heading>
          <p className="mt-2 ">
            Don&apos;t wait. The time will never be just right.
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

export default DealOfTheDay;
