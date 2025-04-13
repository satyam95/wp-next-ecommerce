import { Metadata } from "next";
import LoginForm from "@/components/forms/LoginForm";

export const metadata: Metadata = {
  title: "Login | Your E-commerce Store",
  description: "Sign in to your account to access your orders, wishlist, and manage your profile.",
  keywords: ["login", "sign in", "account", "e-commerce", "authentication"],
};

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-sm py-16">
      <LoginForm />
    </div>
  );
}
