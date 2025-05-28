/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { getUserCart } from "@/app/Actions/cartAction";
import BreadCrumb from "@/Breadcrumb/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Container from "@/components/ui/Container/Container";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Heading } from "@/components/ui/Heading/Heading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/Context/AuthContext";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
type CheckoutItem = {
  id: string;
  name: string;
  sku: string;
  image: string;
  price: number;
  quantity: number;
};

const Checkout = () => {
  const [CheckoutItems, setCheckoutItems] = useState<CheckoutItem[]>([]);
  const [total, setTotal] = useState(0);
  const [vat, setVat] = useState(0);
  const [grandTotal, setGrandTotal] = useState(0);

  useEffect(() => {
    const totalPrice = CheckoutItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    const vatAmount = +(totalPrice * 0.15).toFixed(2);
    const grand = +(totalPrice + vatAmount).toFixed(2);

    setTotal(totalPrice);
    setVat(vatAmount);
    setGrandTotal(grand);
  }, [CheckoutItems]);

  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem("accessToken"); // Adjust key if different
      if (!token) return;

      const data = await getUserCart(token);

      const mapped = data.map((item: any) => ({
        id: item.product._id,
        name: item.product.name,
        sku: item.product.sku,
        image: item.product.image,
        price: item.product.price,
        quantity: item.number,
      }));

      setCheckoutItems(mapped);
    };

    fetchCart();
  }, []);

  // Handler
  const handlePlaceOrder = async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    const orderPayload = {
      products: CheckoutItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
      totalPrice: grandTotal,
    };

    try {
      const response = await fetch(
        "https://blue-berry-server-v2.vercel.app/api/v2/orders/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(orderPayload),
        }
      );

      const data = await response.json();
      if (data.success) {
        toast.success('"Order placed successfully!"');
        router.push("/orders");
      } else {
        toast.error("Order placed successfully!");
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem("redirectPath", window.location.pathname);
      router.replace("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }
  return (
    <Container>
      <BreadCrumb></BreadCrumb>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Cart Section */}
        <div className="lg:col-span-4">
          <div className="border-[1px] rounded-2xl border-accent p-5">
            <Heading>
              Your <span className="text-primary">Cart</span>
            </Heading>
            <div className="billing  col-span-12 xl:col-span-4">
              <div className="flex justify-between my-3">
                <p className="font-medium text-lg text-[#777]">Total:</p>
                <p className="font-medium text-lg text-[#777]">
                  ${total.toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between my-3">
                <p className="font-medium text-lg text-[#777]">VAT (15%):</p>
                <p className="font-medium text-lg text-[#777]">
                  ${vat.toFixed(2)}
                </p>
              </div>
              <div className="flex justify-between my-3">
                <p className="font-medium text-lg text-primary">Grand Total:</p>
                <p className="font-medium text-lg text-primary">
                  ${grandTotal.toFixed(2)}
                </p>
              </div>
            </div>
            <hr />
            <div className="space-y-4 mt-6">
              {CheckoutItems.map((item) => (
                <Card
                  key={item.id}
                  className="flex flex-row items-center p-4 gap-4 bg-secondary shadow-none"
                >
                  <div className="w-24 h-24 relative  overflow-hidden border-[1px] border-accent rounded-xl bg-white">
                    <Image
                      src={item.image}
                      alt={item.name}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h3 className="tracking-[0.03rem] text-[15px] font-medium leading-[18px] text-[#3d4750]">
                      {item.name}
                    </h3>
                    <p className="text-base text-muted-foreground text-primary">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-sm text-muted-foreground font-bold">
                      Price: {item.price}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
          <div className="border-[1px] border-accent p-5 rounded-2xl my-5 md:my-10">
            <Heading className="text-xl">Payment Method</Heading>
            <p className="font-semibold my-2">
              Please select the preferred shipping method to use on this order.
            </p>

            <RadioGroup
              defaultValue="Cash On Delivery"
              className="flex flex-col md:flex-row gap-4 my-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="default" id="r3" />
                <Label htmlFor="r3">Cash On Delivery</Label>
              </div>
            </RadioGroup>
            <div>
              <p className="text-lg mb-1">Add Comments About Your Order</p>
              <Textarea
                placeholder="Please leave your comment here"
                className="border-[1px] border-accent"
              />
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <div className="lg:col-span-8 space-y-10 border-[1px] border-accent rounded-2xl p-5">
          <form className="space-y-10">
            {/* New Customer */}
            <div className="space-y-4">
              <Heading>New Customer</Heading>
              <p className="text-lg text-black">Checkout options</p>
              <RadioGroup
                defaultValue="comfortable"
                className="flex flex-col md:flex-row gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="default" id="r1" />
                  <Label htmlFor="r1">Register Account</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="comfortable" id="r2" />
                  <Label htmlFor="r2">Guest Account</Label>
                </div>
              </RadioGroup>

              <p className="text-sm text-gray-600">
                By creating an account you will be able to shop faster, be up to
                date on an order&apos;s status, and keep track of previous
                orders.
              </p>
              <p className="text-red-500">
                [You don&apos;t have to fill out this form for testing purposes.
                Just press the{" "}
                <span className="text-primary">&apos;Place Order&apos;</span>{" "}
                button to place the order.]
              </p>
              <Button>Continue</Button>
            </div>

            {/* Returning Customer */}
            <div className="space-y-4">
              <Heading>Returning Customer</Heading>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    className="w-full"
                    type="email"
                    id="email"
                    placeholder="Enter Your Email Address"
                  />
                </div>
                <div>
                  <Label htmlFor="password">Password</Label>
                  <Input
                    className="w-full"
                    type="password"
                    id="password"
                    placeholder="Enter Your Password"
                  />
                </div>
                <Button>Login</Button>
              </div>
            </div>

            {/* Billing Details */}
            <div className="space-y-4">
              <Heading>Billing Details</Heading>
              <RadioGroup
                defaultValue="comfortable"
                className="flex flex-col md:flex-row gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="default" id="r3" />
                  <Label htmlFor="r3">Use existing address</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="comfortable" id="r4" />
                  <Label htmlFor="r4">Use new address</Label>
                </div>
              </RadioGroup>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name*</Label>
                  <Input id="firstName" placeholder="Enter First Name" />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name*</Label>
                  <Input id="lastName" placeholder="Enter Last Name" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Address*</Label>
                <Input id="address" placeholder="Enter Your Address" />
              </div>

              <div className="space-y-2">
                <Label>Country *</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="bg-white border border-accent text-[#3d4750] w-full flex justify-between">
                      Country
                      <ChevronDown className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 md:w-96">
                    <DropdownMenuGroup>
                      <DropdownMenuItem>Country1</DropdownMenuItem>
                      <DropdownMenuItem>Country2</DropdownMenuItem>
                      <DropdownMenuItem>Country3</DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="space-y-2">
                <Label>Region *</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="bg-white border border-accent text-[#3d4750] w-full flex justify-between">
                      Region/State
                      <ChevronDown className="size-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 md:w-96">
                    <DropdownMenuGroup>
                      <DropdownMenuItem>Region/State1</DropdownMenuItem>
                      <DropdownMenuItem>Region/State2</DropdownMenuItem>
                      <DropdownMenuItem>Region/State3</DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
            <Button type="button" onClick={handlePlaceOrder}>
              Place Order
            </Button>
          </form>
        </div>
      </div>
    </Container>
  );
};

export default Checkout;
