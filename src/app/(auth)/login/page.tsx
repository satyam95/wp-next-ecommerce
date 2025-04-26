import { Metadata } from "next";
import { Suspense } from "react";
import LoginForm from "@/components/forms/LoginForm";
import LoginSkeleton from "@/components/skeleton/LoginSkeleton";

export const metadata: Metadata = {
  title: "Login | Your E-commerce Store",
  description: "Sign in to your account to access your orders, wishlist, and manage your profile.",
  keywords: ["login", "sign in", "account", "e-commerce", "authentication"],
};

export default function LoginPage() {
  return (
    <div className="mx-auto max-w-sm px-4 py-16">
      <Suspense fallback={<LoginSkeleton />}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
