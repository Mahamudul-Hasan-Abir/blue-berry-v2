"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  GalleryVerticalEnd,
  SquareTerminal,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "./ui/sidebar";
import { TeamSwitcher } from "./team-switcher";
import { NavMain } from "./nav-main";

import { NavUser } from "./nav-user";
import { useAuth } from "@/Context/AuthContext";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();
  const data = {
    user: {
      name: `${user?.name}`,
      email: `${user?.email}`,
      avatar: `${(user && user.profileImage) || "/avatars/shadcn.jpg"}`,
    },
    teams: [
      {
        name: "Acme Inc",
        logo: GalleryVerticalEnd,
        plan: "Enterprise",
      },
      {
        name: "Acme Corp.",
        logo: AudioWaveform,
        plan: "Startup",
      },
      {
        name: "Evil Corp.",
        logo: Command,
        plan: "Free",
      },
    ],
    navMain: [
      {
        title: "Products",
        url: "/admin/get-products",
        icon: SquareTerminal,
        isActive: true,
        items: [
          {
            title: "Get Products",
            url: "/admin/get-products",
          },
          {
            title: "Add Product",
            url: "/admin/add-product",
          },
        ],
      },
      {
        title: "Users",
        url: "/admin/users",
        icon: Bot,
        items: [
          {
            title: "Users",
            url: "/admin/users",
          },
        ],
      },
      {
        title: "Orders",
        url: "/admin/orders",
        icon: BookOpen,
        items: [
          {
            title: "Get All Orders",
            url: "/admin/orders",
          },
        ],
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
