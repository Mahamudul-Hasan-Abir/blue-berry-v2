"use client";
import BreadCrumb from "@/Breadcrumb/Breadcrumb";
import CategoriesCarusal from "@/CategoriesCarusal/CategoriesCarusal";
import Container from "@/components/ui/Container/Container";
import { useState } from "react";
import { ProductCard } from "@/ProductCard/ProductCard";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { Slider } from "@/components/ui/slider";
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
const getAverageRating = (reviews: { rating: number }[]): number => {
  if (!reviews || reviews.length === 0) return 0;
  const total = reviews.reduce((acc, cur) => acc + cur.rating, 0);
  const average = total / reviews.length;
  return Math.round(average); // Rounds to the nearest integer
};

const AllProducts = ({ products }: { products: Product[] }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedWeights, setSelectedWeights] = useState<string[]>([]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<number[]>([0, 1000]); // Default price range

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredProducts = products.filter((product) => {
    return (
      (selectedCategories.length === 0 ||
        selectedCategories.includes(product.category)) &&
      product.price >= priceRange[0] &&
      product.price <= priceRange[1]
    );
  });

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <BreadCrumb />
      <Container>
        <CategoriesCarusal />

        {/* Top Filters Section */}
        <div className="bg-secondary border-accent border-[1px] flex justify-between px-1 rounded-xl my-5">
          <div>
            <Sheet>
              <SheetTrigger>
                <div className="p-2 m-2 text-white bg-primary rounded-xl cursor-pointer hover:bg-primary/90">
                  <SlidersHorizontal />
                </div>
              </SheetTrigger>

              <SheetContent side="left" className="bg-secondary p-10">
                <Heading className="text-3xl ">Filter</Heading>

                <SheetDescription className="text-lg">
                  Filter products by Category, Watch, and Price
                </SheetDescription>

                <div className="mb-4">
                  <Heading className="text-lg my-5">Category</Heading>
                  {[
                    "Cloth",
                    "Bags",
                    "Shoes",
                    "Cosmetic",
                    "Electronics",
                    "Phone",
                    "Watch",
                  ].map((category) => (
                    <label
                      key={category}
                      className="relative flex items-center mb-2 pl-8 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        value={category}
                        checked={selectedCategories.includes(category)}
                        onChange={(e) => {
                          const value = e.target.value;
                          setSelectedCategories((prev) =>
                            prev.includes(value)
                              ? prev.filter((v) => v !== value)
                              : [...prev, value]
                          );
                        }}
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[calc(100%-4px)] opacity-0 z-10 cursor-pointer"
                      />
                      <span
                        className={`absolute top-1/2 left-0 -translate-y-1/2 h-[18px] w-[18px] border border-[#eee] rounded-[4px] flex items-center justify-center text-[12px] font-bold pointer-events-none transition-all duration-200 ${
                          selectedCategories.includes(category)
                            ? "bg-primary text-white"
                            : "bg-white text-transparent"
                        }`}
                      >
                        ✔
                      </span>
                      <span className="text-[#777] text-sm leading-[20px] font-normal capitalize">
                        {category}
                      </span>
                    </label>
                  ))}
                </div>

                {/* Weight Filter */}
                <div className="mb-4">
                  <Heading className="text-lg my-5">Weight</Heading>
                  {["200gm Pack", "500gm Pack", "1kg Pack", "5kg Pack"].map(
                    (weight) => (
                      <label
                        key={weight}
                        className="relative flex items-center mb-2 pl-8 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          value={weight}
                          checked={selectedWeights.includes(weight)}
                          onChange={(e) => {
                            const value = e.target.value;
                            setSelectedWeights((prev) =>
                              prev.includes(value)
                                ? prev.filter((v) => v !== value)
                                : [...prev, value]
                            );
                          }}
                          className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[calc(100%-4px)] opacity-0 z-10 cursor-pointer"
                        />
                        <span
                          className={`absolute top-1/2 left-0 -translate-y-1/2 h-[18px] w-[18px] border border-[#eee] rounded-[4px] flex items-center justify-center text-[12px] font-bold pointer-events-none transition-all duration-200 ${
                            selectedWeights.includes(weight)
                              ? "bg-primary text-white"
                              : "bg-white text-transparent"
                          }`}
                        >
                          ✔
                        </span>
                        <span className="text-[#777] text-sm leading-[20px] font-normal capitalize">
                          {weight}
                        </span>
                      </label>
                    )
                  )}
                </div>

                {/* Price Range Filter */}
                <div className="mb-4">
                  <Heading className="text-lg my-5">Price</Heading>
                  <Slider
                    min={0}
                    max={1000}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                  <div className="mt-2 flex justify-between text-sm">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          <div className="hover:cursor-pointer flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="nav-link flex p-[0] mr-2 font-Poppins leading-[28px] text-[15px] items-center font-medium text-[#3d4750] hover:text-primary tracking-[0.03rem] ">
                  <p>Sort by</p>
                  <ChevronDown className="size-4" />
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-40 md:mr-10 mr-4 lg:mr-16">
                <DropdownMenuGroup>
                  <DropdownMenuItem>Food</DropdownMenuItem>
                  <DropdownMenuItem>Dairy</DropdownMenuItem>
                  <DropdownMenuItem>Desert</DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Showing Products */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {paginatedProducts.map((product) => {
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

        {/* Pagination */}
        <div className="mt-10 flex justify-center">
          <Pagination>
            <PaginationContent>
              {Array.from({ length: totalPages }).map((_, idx) => {
                const page = idx + 1;
                return (
                  <PaginationItem key={page}>
                    <PaginationLink
                      isActive={page === currentPage}
                      onClick={() => handlePageChange(page)}
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
            </PaginationContent>
          </Pagination>
        </div>
      </Container>
    </div>
  );
};

export default AllProducts;
