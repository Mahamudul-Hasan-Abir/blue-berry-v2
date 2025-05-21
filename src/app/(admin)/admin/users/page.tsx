/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

export type TRole = "admin" | "user";
export type TUser = {
  _id: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: TRole;
  profileImage?: string;
};

import Container from "@/components/ui/Container/Container";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Pencil, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { toast } from "sonner"; // Import from sonner
import { Heading } from "@/components/ui/Heading/Heading";

const Users = () => {
  const [users, setUsers] = useState<TUser[]>([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedRole, setSelectedRole] = useState<TRole | "">("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("accessToken");
      const res = await fetch(
        "https://blue-berry-server-v2.vercel.app/api/v2/user/all-users",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await res.json();
      setUsers(data.data);
    };
    fetchUsers();
  }, []);

  const handleRoleChange = async () => {
    if (!selectedUserId || !selectedRole) return;

    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `https://blue-berry-server-v2.vercel.app/api/v2/user/update/${selectedUserId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ role: selectedRole }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update role");
      }

      setUsers((prev) =>
        prev.map((user) =>
          user._id === selectedUserId ? { ...user, role: selectedRole } : user
        )
      );

      // Show success toast using sonner
      toast.success("User role updated successfully!");

      // Close the dialog
      setIsDialogOpen(false);
    } catch (error) {
      toast.error("Failed to update user role");
    }
  };

  return (
    <Container>
      <Heading className="text-primary text-lg md:text-2xl mt-5">
        All Users
      </Heading>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user._id}>
              <TableCell>
                <div className="h-12 w-12 relative rounded-md overflow-hidden">
                  <Image
                    src={user.profileImage || "/placeholder.jpg"}
                    alt={`${user.name}'s profile picture`}
                    width={48}
                    height={48}
                    className="object-contain"
                    priority={false}
                    loading="lazy"
                    quality={80}
                    sizes="(max-width: 768px) 48px, 48px"
                  />
                </div>
              </TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.phone}</TableCell>
              <TableCell>{user.address}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setSelectedUserId(user._id);
                        setSelectedRole(user.role);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Update User Role</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Label htmlFor="role">Role</Label>
                      <Select
                        value={selectedRole}
                        onValueChange={(val: TRole) => setSelectedRole(val)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="admin">Admin</SelectItem>
                          <SelectItem value="user">User</SelectItem>
                        </SelectContent>
                      </Select>
                      <Button onClick={handleRoleChange}>Submit</Button>
                    </div>
                  </DialogContent>
                </Dialog>
                <Button variant="ghost">
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  );
};

export default Users;
