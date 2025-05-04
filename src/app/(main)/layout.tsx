import { AuthProvider } from "@/Context/AuthContext";
import FooterSection from "@/Footer/Footer";
import HeaderSection from "@/Header/Header";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div lang="en">
      <AuthProvider>
        <HeaderSection></HeaderSection>
        {children}
        <FooterSection></FooterSection>
      </AuthProvider>
    </div>
  );
}
