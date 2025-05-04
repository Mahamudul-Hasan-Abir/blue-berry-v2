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

const TabletHeader = () => {
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
                <DropdownMenuItem onClick={() => router.push("/login")}>
                  Login
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/login")}>
                  Register
                </DropdownMenuItem>
                <DropdownMenuItem>Checkout</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <Star className="size-6 text-primary" />
          <ShoppingCart className="size-6 text-primary" />

          {/* Sheet Trigger for Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Menu className="size-6 text-primary cursor-pointer" />
            </SheetTrigger>
            <SheetContent side="right" className="px-5">
              <SheetHeader>
                <h2 className="text-lg font-semibold text-center mt-2">
                  Navigation
                </h2>
              </SheetHeader>
              <div className="mt-6 flex flex-col gap-4">
                <Link
                  href={"/"}
                  className="nav-link text-[15px] font-medium text-[#3d4750] hover:text-primary tracking-[0.03rem] block"
                >
                  Home
                </Link>

                <Accordion type="single" collapsible className="w-full">
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
                </Accordion>

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
                        <Link href="#" className="hover:text-primary">
                          About Us
                        </Link>
                        <Link href="#" className="hover:text-primary">
                          Contact
                        </Link>
                        <Link href="#" className="hover:text-primary">
                          Checkout
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
