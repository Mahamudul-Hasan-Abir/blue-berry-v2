// components/ui/Heading.tsx
import { cn } from "@/lib/utils";

import { Londrina_Outline } from "next/font/google";

const quicksand = Londrina_Outline({
  subsets: ["latin"],
  weight: "400",
});

export function Londrina({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={cn(
        `${quicksand.className} font-bold text-[#dcddde] text-9xl`,
        className
      )}
    >
      {children}
    </h2>
  );
}
