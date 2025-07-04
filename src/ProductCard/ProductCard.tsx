import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Heading } from "@/components/ui/Heading/Heading";

type ProductCardProps = {
  id: string;
  name: string;
  price: number;
  salePrice?: number;
  image: string;
  category: string;
  rating: number;
};

const renderStars = (rating: number) => {
  const filled = Math.floor(rating);
  const hasHalf = rating - filled >= 0.5;
  const empty = 5 - filled - (hasHalf ? 1 : 0);

  return (
    <div className="text-[#fea99a] text-sm flex space-x-[1px]">
      {Array(filled)
        .fill(null)
        .map((_, i) => (
          <span key={`full-${i}`}>★</span>
        ))}
      {hasHalf && <span key="half">⯨</span>}
      {Array(empty)
        .fill(null)
        .map((_, i) => (
          <span key={`empty-${i}`}>☆</span>
        ))}
    </div>
  );
};

export function ProductCard({
  id,
  name,
  price,
  salePrice,
  image,
  category,
  rating,
}: ProductCardProps) {
  // Static product data

  return (
    <Link href={`/products/${id}`} className="w-full">
      <Card
        className="flex flex-col overflow-hidden border border-accent cursor-pointer 
                 h-[450px] sm:h-[360px] md:h-[360px] lg:h-[360px] xl:h-[450px] transition-all duration-300 shadow-none"
      >
        <CardContent className="flex-1 p-4">
          {/* Image Section */}
          <div
            className="relative w-full 
                        h-[250px] sm:h-[160px] md:h-[160px] lg:h-[160px] xl:h-[250px] 
                        overflow-hidden rounded-md"
          >
            <Image
              src={image}
              alt={name}
              fill
              className="rounded-md object-cover"
            />
          </div>

          <hr className="-mx-4 my-4 border-t border-accent" />

          {/* Category & Rating */}
          <div className="flex justify-between text-sm text-gray-500">
            <div className="truncate max-w-[150px] text-sm text-[#777] font-light tracking-[0.03rem]">
              {category}
            </div>
            {renderStars(rating)}
          </div>

          {/* Product Name */}
          <div className="mt-2">
            <Heading className="text-sm md:text-base text-[#3d4750] font-semibold truncate">
              {name}
            </Heading>
          </div>

          {/* Price Section */}
          <div className="mt-4 flex justify-between">
            <p className="text-base text-primary font-bold">${salePrice}</p>
            <p className="text-sm text-red-400 line-through">${price}</p>
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0" />
      </Card>
    </Link>
  );
}
