// components/ui/Heading.tsx
import { cn } from "@/lib/utils";

import { Quicksand } from "next/font/google";

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: "700",
});

export function Heading({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        `${quicksand.className} font-bold text-[#3d4750] text-2xl`,
        className
      )}
    >
      {children}
    </h2>
  );
}
