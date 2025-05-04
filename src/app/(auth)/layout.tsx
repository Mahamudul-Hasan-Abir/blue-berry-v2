import { AuthProvider } from "@/Context/AuthContext";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div lang="en">
      <AuthProvider>{children}</AuthProvider>
    </div>
  );
}
