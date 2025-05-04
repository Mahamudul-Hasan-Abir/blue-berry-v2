"use client";

import { Button } from "@/components/ui/button";
import Container from "@/components/ui/Container/Container";
import { Heading } from "@/components/ui/Heading/Heading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/Context/AuthContext";
import { FormEvent, useState } from "react";
import { loginUserAction } from "../Actions/loginUserAction";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export const LoginComponent = () => {
  const { setAccessToken, setUser } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await loginUserAction(email, password);
      setAccessToken(res.token);
      setUser(res.data);
      toast.success(res.message);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <Container>
      <div className="h-screen flex justify-center items-center w-full">
        <div className="w-full">
          <div className="mb-5">
            <Heading className="text-center">
              Log <span className="text-primary">in</span>
            </Heading>
            <p className="text-center mt-2.5">
              Best place to buy and sell digital products
            </p>
          </div>
          <form
            onSubmit={handleLogin}
            className="border-[1px] border-accent w-full p-7 rounded-2xl max-w-lg mx-auto"
          >
            <div className="grid w-full  items-center gap-1.5 mb-6">
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
            <div className="grid w-full  items-center gap-1.5 mb-6">
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
            <div className="grid w-full max-w-sm items-center gap-1.5 mb-6">
              <Label htmlFor="email">Forgot Password?</Label>
            </div>
            <div className="flex justify-between">
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
              <Button type={"button"} variant={"ghost"}>
                Register
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};
