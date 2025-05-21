// import { AppSidebar } from "@/components/app-sidebar";

// import {
//   SidebarInset,
//   SidebarProvider,
//   SidebarTrigger,
// } from "@/components/ui/sidebar";
// import { AuthProvider } from "@/Context/AuthContext";

// export default function AdminLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <div lang="en">
//       <AuthProvider>
//         <SidebarProvider>
//           <AppSidebar></AppSidebar>
//           <SidebarInset>
//             <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
//               <SidebarTrigger className="-ml-1"></SidebarTrigger>
//             </header>
//             {children}
//           </SidebarInset>
//         </SidebarProvider>
//       </AuthProvider>
//     </div>
//   );
// }

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AuthProvider, useAuth } from "@/Context/AuthContext";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <PrivateAdmin>{children}</PrivateAdmin>
    </AuthProvider>
  );
}

function PrivateAdmin({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    if (!user) {
      toast.error("You must log in to access this page.");
      setTimeout(() => router.replace("/login"), 1000);
    } else if (user.role !== "admin") {
      toast.error("You do not have access to this route.");
      setTimeout(() => router.replace("/"), 1000);
    }
  }, [user, loading, router]);

  if (loading || !user || user.role !== "admin") {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="animate-spin h-8 w-8 rounded-full border-4 border-t-transparent border-gray-500" />
      </div>
    );
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
        </header>
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
}
