"use client";
import Container from "@/components/ui/Container/Container";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Menu, Search, ShoppingCart, Star, UserRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRouter } from "next/navigation";
import React from "react";
import { toast } from "sonner";
import { Heading } from "@/components/ui/Heading/Heading";

const TabletHeader = () => {
  const [user, setUser] = React.useState<string | null>(null);
  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    setUser(storedUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    toast.success("Logged Out Successfully");
    setUser(null);
  };
  const router = useRouter();
  return (
    <Container>
      <nav className="grid grid-cols-12 my-2 md:gap-0 gap-3">
        {/* Left Section: Logo */}
        <div className="md:col-span-4 col-span-12 md:grid md:grid-cols-3 gap-3 flex justify-between items-center ">
          <div className="relative  md:col-span-2 h-10 w-32">
            <Image
              src="https://res.cloudinary.com/dnfqhy8di/image/upload/v1736070154/logo_nbbh2f.png"
              alt="Logo"
              fill
              className="object-contain"
              priority
              onClick={() => router.push("/")}
            />
          </div>
          <div className="md:col-span-1 flex justify-center items-center">
            <div className="border-[1px] p-2 border-accent rounded-xl">
              <svg
                className="svg-icon size-6"
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
        </div>

        {/* Center Section: Search */}
        <div className="md:col-span-5 col-span-12 grid grid-cols-5 ">
          <Input className="col-span-4 h-full border-r-0 rounded-r-none" />
          <div className="col-span-1 flex justify-center items-center border-[1px] border-accent rounded-md border-l-0 rounded-l-none">
            <Search className="size-5" />
          </div>
        </div>

        {/* Right Section: Icons */}
        <div className="md:col-span-3 col-span-12 flex gap-4 justify-center items-center">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="nav-link flex p-[0] font-Poppins leading-[28px] text-[15px] items-center font-medium text-[#3d4750] hover:text-primary tracking-[0.03rem]">
                <UserRound className="size-6 text-primary" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
              <DropdownMenuGroup>
                {user ? (
                  <DropdownMenuItem onClick={handleLogout}>
                    Logout
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem onClick={() => router.push("/login")}>
                    Login
                  </DropdownMenuItem>
                )}

                <DropdownMenuItem onClick={() => router.push("/register")}>
                  Register
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/checkout")}>
                  Checkout
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <Star
            onClick={() => router.push("/orders")}
            className="size-6 text-primary"
          />
          <ShoppingCart
            onClick={() => router.push("/cart")}
            className="size-6 text-primary"
          />

          {/* Sheet Trigger for Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Menu className="size-6 text-primary cursor-pointer" />
            </SheetTrigger>
            <SheetContent side="right" className="px-5">
              <SheetHeader>
                {/* <h2 className="text-lg font-semibold text-center mt-2">
                  Navigation
                </h2> */}
                <Heading className="text-center text-primary">
                  Navigation
                </Heading>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-4">
                <Link
                  href={"/"}
                  className="nav-link text-[15px] font-medium text-[#3d4750] hover:text-primary tracking-[0.03rem] block"
                >
                  Home
                </Link>

                {/* <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="categories">
                    <AccordionTrigger className="text-[15px] font-medium text-[#3d4750] hover:text-primary tracking-[0.03rem]">
                      Categories
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-2 ml-2">
                        <Link href="#" className="hover:text-primary">
                          Category 1
                        </Link>
                        <Link href="#" className="hover:text-primary">
                          Category 2
                        </Link>
                        <Link href="#" className="hover:text-primary">
                          Category 3
                        </Link>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion> */}

                <Link
                  href={"/products"}
                  className="nav-link text-[15px] font-medium text-[#3d4750] hover:text-primary tracking-[0.03rem] block"
                >
                  Products
                </Link>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="pages">
                    <AccordionTrigger className="text-[15px] font-medium text-[#3d4750] hover:text-primary tracking-[0.03rem]">
                      Pages
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col gap-2 ml-2">
                        <Link href="/about-us" className="hover:text-primary">
                          About Us
                        </Link>
                        <Link href="/contact-us" className="hover:text-primary">
                          Contact Us
                        </Link>
                        <Link href="/blog" className="hover:text-primary">
                          blog
                        </Link>{" "}
                        <Link href="/faq" className="hover:text-primary">
                          FAQ
                        </Link>{" "}
                        <Link href="/products" className="hover:text-primary">
                          Products
                        </Link>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Link
                  href={"/blog"}
                  className="nav-link text-[15px] font-medium text-[#3d4750] hover:text-primary tracking-[0.03rem] block"
                >
                  Blog
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </Container>
  );
};

export default TabletHeader;

/* {
  "name": "Peach Marmalade",
  "description": "Smooth and golden marmalade made from ripe peaches with a hint of citrus.",
  "price": 6.49,
  "sale_price": 4.99,
  "category": "Food",
  "stock_quantity": 95,
  "sku": "PCMARM004",
  "status": "In Stock",
  "unit": ["jar"],
  "information": {
    "weight": "400g",
    "dimensions": "8x8x8 cm",
    "color": ["golden yellow"],
    "brand": "Golden Grove",
    "form_factor": "solid",
    "quantity": 1,
    "container_type": "glass jar",
    "shelf_life": "1 year",
    "ingredients": ["peaches", "sugar", "lemon zest"],
    "other_features": "all-natural, handmade"
  },
  "reviews": [],
  "image": "https://res.cloudinary.com/dnfqhy8di/image/upload/v1736624105/user_profiles/b277dnu8kwolksebuuk0.jpg"
}

create diffrent products using this images urls
https://res.cloudinary.com/dnfqhy8di/image/upload/v1747448136/back-3_llz7o0.jpg,
https://res.cloudinary.com/dnfqhy8di/image/upload/v1747448135/back-4_x42qyn.jpg,
https://res.cloudinary.com/dnfqhy8di/image/upload/v1747448134/6_qph6ns.jpg,
https://res.cloudinary.com/dnfqhy8di/image/upload/v1747448134/8_hmxg9f.jpg,
https://res.cloudinary.com/dnfqhy8di/image/upload/v1747448135/back-6_javcdw.jpg,
https://res.cloudinary.com/dnfqhy8di/image/upload/v1747448134/1_1_gpbtmk.jpg,
https://res.cloudinary.com/dnfqhy8di/image/upload/v1747448134/7_osd1nh.jpg,
https://res.cloudinary.com/dnfqhy8di/image/upload/v1747448134/4_givm5k.jpg,
https://res.cloudinary.com/dnfqhy8di/image/upload/v1747448134/5_rlft9f.jpg,
https://res.cloudinary.com/dnfqhy8di/image/upload/v1747448134/3_qczwjk.jpg,
https://res.cloudinary.com/dnfqhy8di/image/upload/v1747448133/3_1_zjc7yf.jpg,
https://res.cloudinary.com/dnfqhy8di/image/upload/v1747448133/4_1_cqveai.jpg,
https://res.cloudinary.com/dnfqhy8di/image/upload/v1747448133/4_1_cqveai.jpg,
https://res.cloudinary.com/dnfqhy8di/image/upload/v1747448133/2_jzwmxc.jpg,
https://res.cloudinary.com/dnfqhy8di/image/upload/v1747448133/2_1_yz5ltj.jpg,
https://res.cloudinary.com/dnfqhy8di/image/upload/v1747448133/1_jb37bq.jpg


*/
