import { AuthProvider } from "@/Context/AuthContext";
import FooterSection from "@/Footer/Footer";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div lang="en">
      <AuthProvider>
        {children}
        <FooterSection></FooterSection>
      </AuthProvider>
    </div>
  );
}
