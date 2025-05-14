// components/PrivateRoute.tsx
"use client";

import { useAuth } from "@/Context/AuthContext";
import { usePathname, useRouter } from "next/navigation";

import { useEffect } from "react";

export default function AuthBlocker({
  children,
}: {
  children: React.ReactNode;
}) {
  const { accessToken } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!accessToken) {
      // Store the attempted path before redirecting to login
      localStorage.setItem("redirectPath", pathname);
      router.push("/login");
    }
  }, [accessToken, router, pathname]);

  return accessToken ? <>{children}</> : null;
}
