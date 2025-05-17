"use client";

import Container from "@/components/ui/Container/Container";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  ChevronDown,
  Search,
  ShoppingCart,
  Star,
  UserRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";

export default function DesktopHeader() {
  const [position, setPosition] = React.useState("bottom");

  const router = useRouter();

  const [user, setUser] = React.useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    toast.success("Logged Out Successfully");
    setUser(null);
    window.location.reload();
  };

  return (
    <Container>
      <nav>
        <div className="grid grid-cols-12 gap-10 py-2 border-b border-accent mb-2">
          <div className=" col-span-3 relative h-full">
            <Link href="/">
              {" "}
              <Image
                src="https://res.cloudinary.com/dnfqhy8di/image/upload/v1736070154/logo_nbbh2f.png"
                alt="Logo"
                fill
                className="object-contain"
                priority
              />
            </Link>
          </div>
          <div className=" col-span-5 grid grid-cols-12">
            <div className="col-span-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="border-[1px] border-accent py-3 font-normal justify-center items-center flex text-md rounded-l-lg">
                    <p>Vegetables</p>
                    <ChevronDown></ChevronDown>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40">
                  <DropdownMenuRadioGroup
                    value={position}
                    onValueChange={setPosition}
                  >
                    <DropdownMenuRadioItem value="top">
                      Top
                    </DropdownMenuRadioItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioItem value="bottom">
                      Bottom
                    </DropdownMenuRadioItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuRadioItem value="right">
                      Right
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div className="col-span-7">
              <Input className="xl:h-full lg:h-[50px] border-l-0 rounded-l-none rounded-r-none shadow-none border-r-0"></Input>
            </div>
            <div className="col-span-1 lg:h-[50px] flex justify-start items-center border-[1px] border-l-0 rounded-r-lg border-accent ">
              <Search className="size-5"></Search>
            </div>
          </div>
          <div className=" col-span-4 grid grid-cols-3">
            <div className="flex items-center  gap-2 ">
              <div className="text-primary">
                <UserRound className="size-8"></UserRound>
              </div>
              <div>
                <p>Account</p>
                <div className="hover:cursor-pointer">
                  {user ? (
                    <p className="font-bold" onClick={handleLogout}>
                      Logout
                    </p>
                  ) : (
                    <p
                      className="font-bold"
                      onClick={() => router.push("/login")}
                    >
                      Login
                    </p>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-primary">
                <Link href="/orders">
                  <Star className="size-8"></Star>
                </Link>
              </div>
              <div>
                <p>3 Items</p>
                <Link href="/orders">
                  <p className="font-bold">Order</p>
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-primary cursor-pointer">
                <Link href="/cart">
                  <ShoppingCart className="size-8"></ShoppingCart>
                </Link>
              </div>
              <div>
                <p>24 items</p>
                <Link href="/cart">
                  <p className="font-bold">Cart</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className=" grid grid-cols-12 mb-2">
          <div className=" col-span-2 flex justify-center ">
            <div className="border-[1px] p-2 border-accent rounded-xl ">
              <svg
                className="svg-icon size-7"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  className="fill-primary"
                  d="M384 928H192a96 96 0 0 1-96-96V640a96 96 0 0 1 96-96h192a96 96 0 0 1 96 96v192a96 96 0 0 1-96 96zM192 608a32 32 0 0 0-32 32v192a32 32 0 0 0 32 32h192a32 32 0 0 0 32-32V640a32 32 0 0 0-32-32H192zM784 928H640a96 96 0 0 1-96-96V640a96 96 0 0 1 96-96h192a96 96 0 0 1 96 96v144a32 32 0 0 1-64 0V640a32 32 0 0 0-32-32H640a32 32 0 0 0-32 32v192a32 32 0 0 0 32 32h144a32 32 0 0 1 0 64zM384 480H192a96 96 0 0 1-96-96V192a96 96 0 0 1 96-96h192a96 96 0 0 1 96 96v192a96 96 0 0 1-96 96zM192 160a32 32 0 0 0-32 32v192a32 32 0 0 0 32 32h192a32 32 0 0 0 32-32V192a32 32 0 0 0-32-32H192zM832 480H640a96 96 0 0 1-96-96V192a96 96 0 0 1 96-96h192a96 96 0 0 1 96 96v192a96 96 0 0 1-96 96zM640 160a32 32 0 0 0-32 32v192a32 32 0 0 0 32 32h192a32 32 0 0 0 32-32V192a32 32 0 0 0-32-32H640z"
                ></path>
              </svg>
            </div>
          </div>
          <div className=" col-span-9 flex justify-between items-center">
            <Link
              href={"/"}
              className="nav-link p-[0] font-Poppins leading-[28px] text-[15px] font-medium text-[#3d4750] hover:text-primary tracking-[0.03rem] block"
            >
              Home
            </Link>

            <div className="hover:cursor-pointer">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  {/* <Button variant="outline">Open</Button> */}
                  <div className="nav-link flex p-[0] font-Poppins leading-[28px] text-[15px] items-center font-medium text-[#3d4750] hover:text-primary  tracking-[0.03rem] ">
                    <p className="mr-1">Categories</p>
                    <ChevronDown className="size-4"></ChevronDown>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40">
                  <DropdownMenuGroup>
                    <DropdownMenuItem>Food</DropdownMenuItem>
                    <DropdownMenuItem>Dairy</DropdownMenuItem>
                    <DropdownMenuItem>Desert</DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Link
              href={"/products"}
              className="nav-link p-[0] font-Poppins leading-[28px] text-[15px] font-medium text-[#3d4750] hover:text-primary tracking-[0.03rem] block"
            >
              Products
            </Link>
            <div className="hover:cursor-pointer">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <div className="nav-link flex p-[0] font-Poppins leading-[28px] text-[15px] items-center font-medium text-[#3d4750] hover:text-primary  tracking-[0.03rem] ">
                    <p className="mr-1">Pages</p>
                    <ChevronDown className="size-4"></ChevronDown>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-40">
                  <DropdownMenuGroup>
                    <Link href="/about-us">
                      <DropdownMenuItem>About Us</DropdownMenuItem>
                    </Link>
                    <Link href="/faq">
                      <DropdownMenuItem>FAQ</DropdownMenuItem>
                    </Link>
                    <Link href="/contact-us">
                      <DropdownMenuItem>Contect Us</DropdownMenuItem>
                    </Link>
                    <Link href="/products">
                      {" "}
                      <DropdownMenuItem>Products</DropdownMenuItem>
                    </Link>
                    <Link href="/checkout">
                      {" "}
                      <DropdownMenuItem>checkout</DropdownMenuItem>
                    </Link>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Link
              href={"/blog"}
              className="nav-link p-[0] font-Poppins leading-[28px] text-[15px] font-medium text-[#3d4750] hover:text-primary tracking-[0.03rem] block"
            >
              Blog
            </Link>
          </div>
        </div>
      </nav>
    </Container>
  );
}
