/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import BreadCrumb from "@/Breadcrumb/Breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import Container from "@/components/ui/Container/Container";
import { Heading } from "@/components/ui/Heading/Heading";

import defaultImage from "../../../../../public/default.png";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";

import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { addToCart } from "@/app/Actions/cartAction";
import { Button } from "@/components/ui/button";

export type TProductInformation = {
  weight: string;
  dimensions: string;
  color: string[];
  brand: string;
  form_factor: string;
  quantity: number;
  container_type: string;
  shelf_life: string;
  ingredients: string[];
  other_features: string;
  _id: string;
};

export type TProductReview = {
  userId: string;
  userName: string;
  userImage?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
};

export type TProduct = {
  _id: string;
  name: string;
  description: string;
  price: number;
  sale_price: number;
  category: string;
  stock_quantity: number;
  sku: string;
  status: "In Stock" | "Out Of Stock";
  unit: string[];
  information: TProductInformation;
  reviews: TProductReview[];
  image: string;
  totalRating?: number;
};
type ProductDetailsComponentProps = {
  product: TProduct;
};

const ProductDetailsComponent = ({ product }: ProductDetailsComponentProps) => {
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState<1 | 2 | 3 | 4 | 5 | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const handleSubmitReview = async () => {
    if (!rating || !reviewText.trim()) return;

    const token = localStorage.getItem("accessToken");
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5200/api/v2/product/${product._id}/review`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            rating,
            comment: reviewText,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to submit review");
      }

      toast.success("Review submitted!");

      setReviewText("");
      setRating(null);
      // optionally refetch product or update UI
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while submitting your review.");
    } finally {
      setLoading(false);
    }
  };

  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const filledStars = Math.floor(product.totalRating || 0);
  const hasHalfStar = (product.totalRating || 0) - filledStars >= 0.5;
  const emptyStars = 5 - filledStars - (hasHalfStar ? 1 : 0);

  const renderReviewStars = (rating: number) => {
    const filled = Math.floor(rating);
    const hasHalf = rating - filled >= 0.5;
    const empty = 5 - filled - (hasHalf ? 1 : 0);

    return (
      <div className="flex text-primary text-sm space-x-[2px]">
        {Array(filled)
          .fill(null)
          .map((_, i) => (
            <span key={`full-${i}`}>★</span>
          ))}
        {hasHalf && <span>⯨</span>}
        {Array(empty)
          .fill(null)
          .map((_, i) => (
            <span key={`empty-${i}`}>☆</span>
          ))}
      </div>
    );
  };

  const renderStars = () => (
    <div className="flex items-center text-[#fea99a] text-lg space-x-1">
      {Array(filledStars)
        .fill(null)
        .map((_, i) => (
          <span key={`full-${i}`}>★</span>
        ))}
      {hasHalfStar && <span>⯨</span>}
      {Array(emptyStars)
        .fill(null)
        .map((_, i) => (
          <span key={`empty-${i}`}>☆</span>
        ))}
    </div>
  );

  const renderProductInfo = () => {
    const entries = Object.entries(product.information);
    return (
      <ul className="list-disc pl-5 space-y-1">
        {entries.map(([key, value]) => {
          if (Array.isArray(value) && value.length === 0) return null;
          if (typeof value === "string" && !value.trim()) return null;

          return (
            <li key={key} className="capitalize text-sm">
              <span className="font-medium">{key.replace(/_/g, " ")}:</span>{" "}
              {Array.isArray(value) ? value.join(", ") : value}
            </li>
          );
        })}
      </ul>
    );
  };

  const handleAddToCart = async () => {
    try {
      const result = await addToCart(product._id, quantity);
      console.log("Product added to cart:", result);
      // You can show a success toast here
      toast.success("Product added to Cart successfully!");
    } catch (error) {
      console.error("Add to cart failed:", error);
      // You can show an error toast here
    }
  };

  return (
    <div>
      <BreadCrumb></BreadCrumb>
      <Container>
        <div className="grid grid-cols-5 gap-6">
          {/* Left Image */}
          <div className="col-span-5 lg:col-span-2">
            <Card className="shadow-none border-[1px] border-accent">
              <CardContent className="relative aspect-square">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain"
                />
              </CardContent>
            </Card>
          </div>

          {/* Right Content */}
          <div className="col-span-5 lg:col-span-3 space-y-4">
            <Heading>{product.name}</Heading>

            {/* Rating Section */}
            <div className="flex items-center gap-2">
              {renderStars()}
              <span className="text-base text-primary">
                | {product.reviews?.length || 0}{" "}
                {product.reviews?.length === 1 ? "Rating" : "Ratings"}
              </span>
            </div>

            {/* Description */}
            <p className="text-gray-600 py-5">{product.description}</p>

            {/* Price and Stock Info */}
            <div className="flex justify-between items-center text-sm">
              <div>
                <Heading className="text-xl md:text-2xl">
                  ${product.sale_price.toFixed(2)}
                </Heading>
                <p className="line-through text-gray-500">
                  M.R.P: ${product.price.toFixed(2)}
                </p>
              </div>
              <div className="text-right">
                <Heading className="text-xl md:text-2xl">
                  SKU#: {product.sku}
                </Heading>
                <p
                  className={`font-semibold ${
                    product.stock_quantity > 0 ? "text-primary" : "text-red-500"
                  }`}
                >
                  {product.stock_quantity > 0 ? "In Stock" : "Out of Stock"}
                </p>
              </div>
            </div>

            {/* Product Info Section */}
            <div className="mt-4">
              <Heading className="my-5">Product Details</Heading>
              {renderProductInfo()}
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-6 w-full sm:max-w-md">
              {/* Quantity Selector */}
              <div className="flex items-center border border-gray-300 rounded-md h-11 px-2">
                <button
                  onClick={decreaseQuantity}
                  className="px-4 h-full text-lg font-semibold hover:bg-gray-100 transition"
                >
                  -
                </button>
                <div className="px-4 text-center font-medium">{quantity}</div>
                <button
                  onClick={increaseQuantity}
                  className="px-4 h-full text-lg font-semibold hover:bg-gray-100 transition"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              {/* <button className="h-11 px-6 bg-primary text-white rounded-md text-base font-semibold transition hover:opacity-90">
                Add to Cart
              </button> */}
              <Button className="h-11 px-6" onClick={handleAddToCart}>
                Add to Cart
              </Button>
            </div>
          </div>
        </div>

        {product?.reviews && product.reviews.length > 0 && (
          <>
            {/* Reviews */}
            <Heading className="text-primary text-center my-20">
              Reviews
            </Heading>

            <div>
              <Swiper
                key={product._id} // Add this line
                modules={[Autoplay]}
                loop
                grabCursor
                autoplay={{ delay: 1500, disableOnInteraction: false }}
                speed={1000}
                spaceBetween={16}
                breakpoints={{
                  425: { slidesPerView: 1 },
                  640: { slidesPerView: 1 },
                  768: { slidesPerView: 1 },
                  1024: { slidesPerView: 1 },
                }}
                className="w-full"
                onSwiper={(swiper) => {
                  // Force update after a small delay to ensure content is loaded
                  setTimeout(() => {
                    swiper.update();
                  }, 100);
                }}
              >
                {product.reviews.map((review, index) => (
                  <SwiperSlide key={`${review.userId}-${index}`}>
                    {/* SM version */}
                    <div className="block">
                      <div className="grid grid-cols-1 gap-5">
                        <div className="flex gap-5">
                          <div className="w-20 h-20 relative aspect-square rounded-xl overflow-hidden">
                            <Image
                              src={review.userImage || defaultImage}
                              alt={review.userName}
                              width={200}
                              height={200}
                              className="object-cover"
                              sizes="80px"
                            />
                          </div>
                          <div>
                            <Heading className="text-lg">
                              {review.userName}
                            </Heading>
                            {renderReviewStars(review.rating)}
                          </div>
                        </div>
                        <div>
                          <div className="border-[1px] border-accent p-5 rounded-3xl">
                            {review.comment}
                          </div>
                        </div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </>
        )}

        {/* Add Review */}
        {currentUser?.role === "user" && (
          <div className="border-accent border-[1px] w-full mt-10 p-6 rounded-lg">
            <Heading>Add Review</Heading>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmitReview();
              }}
              className="space-y-4 mt-4"
            >
              {/* Star Input */}
              <div className="flex items-center gap-3">
                <p className="text-sm font-medium">Your rating:</p>
                <div className="flex items-center space-x-1 text-[#fea99a] text-lg">
                  {[1, 2, 3, 4, 5].map((val) => (
                    <span
                      key={val}
                      onClick={() => setRating(val as 1 | 2 | 3 | 4 | 5)}
                      className={`cursor-pointer ${
                        rating && val <= rating
                          ? "text-[#fea99a]"
                          : "text-gray-300"
                      }`}
                    >
                      ★
                    </span>
                  ))}
                </div>
              </div>

              {/* Textarea */}
              <Textarea
                placeholder="Your Review"
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                required
                className="border-[1px] border-accent"
              />

              {/* Submit Button */}
              <button
                type="submit"
                className="h-11 px-6 bg-primary text-white rounded-md text-base font-semibold transition hover:opacity-90"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    Logging in...
                  </>
                ) : (
                  "Submit Review"
                )}
              </button>
            </form>
          </div>
        )}
      </Container>
    </div>
  );
};

export default ProductDetailsComponent;
