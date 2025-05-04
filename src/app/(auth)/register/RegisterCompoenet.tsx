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

export const RegisterComponent = () => {
  const { setAccessToken, setUser } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleregister = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await registerUserAction({
        email,
        password,
        name,
        phone,
        address,
        profileImage,
      });
      setAccessToken(res.token);
      setUser(res.data);
      toast.success(res.message);
      console.log("consoling from register compoent", res);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message || "registration failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container>
      <div className="flex justify-center items-start min-h-screen w-full lg:items-center">
        <div className="w-full">
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
                required
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
                required
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
              <Input
                className="w-full"
                type="text"
                id="profile"
                placeholder="Your Profile Image"
                value={profileImage}
                onChange={(e) => setProfileImage(e.target.value)}
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
                    Logging in...
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
