// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { Button } from "@/components/ui/button";
// import Container from "@/components/ui/Container/Container";
// import { Heading } from "@/components/ui/Heading/Heading";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { useAuth } from "@/Context/AuthContext";
// import { FormEvent, useEffect, useState } from "react";

// import { toast } from "sonner";
// import { Loader2 } from "lucide-react";
// import { useRouter } from "next/navigation";
// import { loginUserAction } from "@/app/Actions/loginUserAction";
// import Image from "next/image";

// export const LoginComponent = () => {
//   const router = useRouter();
//   const { accessToken, setAccessToken, setUser } = useAuth();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   useEffect(() => {
//     if (accessToken) {
//       const redirectPath = localStorage.getItem("redirectPath") || "/";
//       localStorage.removeItem("redirectPath"); // Clear after reading
//       router.push(redirectPath);
//     }
//   }, [accessToken, router]);

//   const handleLogin = async (e: FormEvent) => {
//     e.preventDefault();
//     if (!email.trim()) {
//       toast.error("Email is required!");
//       return;
//     }
//     if (!password.trim()) {
//       toast.error("Password is required!");
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await loginUserAction(email, password);
//       setAccessToken(res.token);
//       setUser(res.data);
//       toast.success(res.message);
//       (res.data);
//       setEmail("");
//       setPassword("");

//       const redirectPath = localStorage.getItem("redirectPath") || "/";
//       localStorage.removeItem("redirectPath");
//       router.push(redirectPath);
//     } catch (error: any) {
//       toast.error(error.message || "Login failed");
//     } finally {
//       setLoading(false);
//     }
//   };
//   return (
//     <Container>
//       <div className="h-screen flex justify-center items-center w-full">
//         <div className="w-full">
//           <div
//             onClick={() => router.push("/")}
//             className=" w-30 h-20  relative mx-auto hover:cursor-pointer"
//           >
//             <Image
//               src="https://res.cloudinary.com/dnfqhy8di/image/upload/v1736070154/logo_nbbh2f.png"
//               alt="Logo"
//               fill
//               className="object-contain"
//               priority
//             />
//           </div>
//           <div className="mb-5">
//             <Heading className="text-center">
//               Log <span className="text-primary">in</span>
//             </Heading>
//             <p className="text-center mt-2.5">
//               Best place to buy and sell digital products
//             </p>
//           </div>
//           <form
//             onSubmit={handleLogin}
//             className="border-[1px] border-accent w-full p-7 rounded-2xl max-w-lg mx-auto"
//           >
//             <div className="grid w-full  items-center gap-1.5 mb-6">
//               <Label htmlFor="email">Email*</Label>
//               <Input
//                 className="w-full"
//                 type="email"
//                 id="email"
//                 placeholder="Email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//               />
//             </div>
//             <div className="grid w-full  items-center gap-1.5 mb-6">
//               <Label htmlFor="email">Password*</Label>
//               <Input
//                 className="w-full"
//                 type="password"
//                 id="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//             <div className="grid w-full max-w-sm items-center gap-1.5 mb-6">
//               <Label htmlFor="email">Forgot Password?</Label>
//             </div>
//             <div className="flex justify-between">
//               <Button type="submit" disabled={loading}>
//                 {loading ? (
//                   <>
//                     <Loader2 className="animate-spin mr-2 h-4 w-4" />
//                     Logging in...
//                   </>
//                 ) : (
//                   "Submit"
//                 )}
//               </Button>
//               <Button
//                 onClick={() => router.push("/register")}
//                 type={"button"}
//                 variant={"ghost"}
//               >
//                 Register
//               </Button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </Container>
//   );
// };
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { Button } from "@/components/ui/button";
import Container from "@/components/ui/Container/Container";
import { Heading } from "@/components/ui/Heading/Heading";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/Context/AuthContext";
import { FormEvent, useState } from "react"; // Removed useEffect import

import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { loginUserAction } from "@/app/Actions/loginUserAction";
import Image from "next/image";

export const LoginComponent = () => {
  const router = useRouter();
  const { setAccessToken, setUser } = useAuth(); // Removed accessToken from destructuring

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      toast.error("Email is required!");
      return;
    }
    if (!password.trim()) {
      toast.error("Password is required!");
      return;
    }

    setLoading(true);

    try {
      const res = await loginUserAction(email, password);
      setAccessToken(res.token);
      setUser(res.data);
      toast.success(res.message);
      setEmail("");
      setPassword("");

      // Force admin to /admin, ignore redirectPath
      if (res.data.role === "admin") {
        router.push("/admin");
        return; // Exit early to prevent further redirects
      }

      // Regular users follow normal redirect logic
      const redirectPath = localStorage.getItem("redirectPath") || "/";
      localStorage.removeItem("redirectPath");
      router.push(redirectPath);
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
              <Button
                onClick={() => router.push("/register")}
                type={"button"}
                variant={"ghost"}
              >
                Register
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Container>
  );
};
