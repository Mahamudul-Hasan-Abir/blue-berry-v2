// "use client";

// import { useEffect, useState } from "react";
// import { ProductCard } from "@/ProductCard/ProductCard";
// import { Heading } from "@/components/ui/Heading/Heading";

// interface Review {
//   rating: number;
// }

// interface Product {
//   _id: string;
//   name: string;
//   price: number;
//   sale_price: number;
//   image: string;
//   category: string;
//   color: string;
//   reviews: Review[];
// }

// const getAverageRating = (reviews: Review[]): number => {
//   if (!reviews || reviews.length === 0) return 0;
//   const total = reviews.reduce((acc, cur) => acc + cur.rating, 0);
//   const average = total / reviews.length;
//   return Math.round(average);
// };

// const NewArrivalForCart = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await fetch("https://blue-berry-server-v2.vercel.app/api/v2/product");
//         const data = await res.json();
//         const allProducts: Product[] = data?.data || [];

//         // Get last 8 products
//         const last8 = allProducts.slice(-4);
//         setProducts(last8);
//       } catch (error) {
//         console.error("Error fetching new arrivals:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   if (loading) return <p className="text-center">Loading New Arrivals...</p>;

//   return (
//     <div className="my-10">
//       <div className="mt-20 mb-10 text-center">
//         <Heading className="text-2xl md:text-3xl ">
//           New <span className="text-primary">Arrivals</span>
//         </Heading>
//         <p className="mt-2 ">
//           Shop online for new arrivals and get free shipping!
//         </p>
//       </div>

//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
//         {products.map((product) => {
//           const averageRating = getAverageRating(product.reviews);
//           return (
//             <ProductCard
//               key={product._id}
//               id={product._id}
//               name={product.name}
//               price={product.price}
//               salePrice={product.sale_price}
//               image={product.image}
//               category={product.category}
//               rating={averageRating}
//             />
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default NewArrivalForCart;
"use client";

import { useEffect, useState } from "react";
import { ProductCard } from "@/ProductCard/ProductCard";
import { Heading } from "@/components/ui/Heading/Heading";

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
  return Math.round(total / reviews.length);
};

const NewArrivalForCart = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  // Track window width
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    handleResize(); // Set initial width
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://blue-berry-server-v2.vercel.app/api/v2/product"
        );
        const data = await res.json();
        const allProducts: Product[] = data?.data || [];
        const lastProducts = allProducts.slice(-8); // get last 8
        setProducts(lastProducts);
      } catch (error) {
        console.error("Error fetching new arrivals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Determine how many products to show
  let maxProducts = 4;
  if (windowWidth < 1024) maxProducts = 3;

  const visibleProducts = products.slice(0, maxProducts);

  if (loading) return <p className="text-center">Loading New Arrivals...</p>;

  return (
    <div className="my-10">
      <div className="mt-20 mb-10 text-center">
        <Heading className="text-2xl md:text-3xl">
          New <span className="text-primary">Arrivals</span>
        </Heading>
        <p className="mt-2">
          Shop online for new arrivals and get free shipping!
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {visibleProducts.map((product) => {
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
  );
};

export default NewArrivalForCart;
