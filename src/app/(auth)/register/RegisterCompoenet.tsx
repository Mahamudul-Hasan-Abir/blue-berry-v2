/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import Container from "@/components/ui/Container/Container";
import { Heading } from "@/components/ui/Heading/Heading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/Context/AuthContext";
import { FormEvent, useState } from "react";

import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { registerUserAction } from "../../Actions/registerUserAction";
import Link from "next/link";
import FileUpload from "@/FileUpload/FileUpload";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const RegisterComponent = () => {
  const router = useRouter();
  const { setAccessToken, setUser } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [clearImage, setClearImage] = useState(false);
  const handleregister = async (e: FormEvent) => {
    e.preventDefault();

    // Manual validations for  fields
    if (!name.trim()) {
      toast.error("Full Name is required!");
      return;
    }
    if (!email.trim()) {
      toast.error("Email is required!");
      return;
    }
    if (!password.trim()) {
      toast.error("Password is required!");
      return;
    }
    if (!phone.trim()) {
      toast.error("Phone number is required!");
      return;
    }
    if (!address.trim()) {
      toast.error("Address is required!");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("phone", phone);
      formData.append("address", address);
      if (profileImage) {
        formData.append("profileImage", profileImage);
      }

      const res = await registerUserAction(formData);
      setAccessToken(res.token);
      setUser(res.data);
      toast.success(res.message);
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");
      setAddress("");
      setProfileImage(null);
      setClearImage(true); // Trigger clearing of image preview
      setTimeout(() => setClearImage(false), 1000);
    } catch (error: any) {
      toast.error(error.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="flex justify-center items-start min-h-screen w-full lg:items-center">
        <div className="w-full">
          <div
            onClick={() => router.push("/")}
            className=" w-30 h-20  relative mx-auto hover:cursor-pointer"
          >
            <Image
              src="https://res.cloudinary.com/dnfqhy8di/image/upload/v1736070154/logo_nbbh2f.png"
              alt="Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="mb-5">
            <Heading className="text-center">Register</Heading>
            <p className="text-center mt-2.5">
              Best place to buy and sell digital products
            </p>
          </div>
          <form
            onSubmit={handleregister}
            className="border-[1px] border-accent w-full p-7 rounded-2xl max-w-5xl mx-auto grid grid-cols-2 gap-6"
          >
            <div className="grid w-full col-span-2 md:col-span-1 items-center gap-1.5 mb-6">
              <Label htmlFor="email">Full Name*</Label>
              <Input
                className="w-full"
                type="text"
                id="text"
                placeholder="Your Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid w-full col-span-2 md:col-span-1 items-center gap-1.5 mb-6">
              <Label htmlFor="email">Email*</Label>
              <Input
                className="w-full"
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid w-full col-span-2 md:col-span-1 items-center gap-1.5 mb-6">
              <Label htmlFor="email">Password*</Label>
              <Input
                className="w-full"
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="grid w-full col-span-2 md:col-span-1 items-center gap-1.5 mb-6">
              <Label htmlFor="email">Phone*</Label>
              <Input
                className="w-full"
                type="text"
                id="phone"
                placeholder="Your Phone Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="grid w-full col-span-2  items-center gap-1.5 mb-6">
              <Label htmlFor="email">Address*</Label>
              <Input
                className="w-full"
                type="text"
                id="address"
                placeholder="Your Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="grid w-full col-span-2 items-center gap-1.5 mb-6">
              <Label htmlFor="email">Profile Image*</Label>

              <FileUpload
                onFileSelect={(file) => setProfileImage(file)}
                clearImage={clearImage}
              />
            </div>

            <div className="grid w-full max-w-sm col-span-2 items-center gap-1.5 mb-6">
              <Label htmlFor="email">
                Already have an account?{" "}
                <Link href={"/login"}>
                  <span className="text-primary">login</span>
                </Link>
              </Label>
            </div>
            <div className="flex justify-center col-span-2">
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    Creating User...
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};
