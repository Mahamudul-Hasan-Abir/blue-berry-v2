import { Button } from "@/components/ui/button";
import Container from "@/components/ui/Container/Container";
import { Heading } from "@/components/ui/Heading/Heading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// import { Quicksand } from "next/font/google";

// const quicksand = Quicksand({
//   subsets: ["latin"],
//   weight: "700",
// });

export const LoginComponent = () => {
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
          <form className="border-[1px] border-accent w-full p-7 rounded-2xl max-w-lg mx-auto">
            <div className="grid w-full  items-center gap-1.5 mb-6">
              <Label htmlFor="email">Email*</Label>
              <Input
                className="w-full"
                type="email"
                id="email"
                placeholder="Email"
              />
            </div>
            <div className="grid w-full  items-center gap-1.5 mb-6">
              <Label htmlFor="email">Password*</Label>
              <Input
                className="w-full"
                type="password"
                id="password"
                placeholder="Password"
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5 mb-6">
              <Label htmlFor="email">Forgot Password?</Label>
            </div>
            <div className="flex justify-between">
              <Button>Submit</Button>
              <Button variant={"ghost"}>Submit</Button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};
