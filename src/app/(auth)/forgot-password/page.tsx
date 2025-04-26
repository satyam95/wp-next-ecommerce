import { Metadata } from "next";
import { Suspense } from "react";
import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm";
import ForgotPasswordSkeleton from "@/components/skeleton/ForgotPasswordSkeleton";

export const metadata: Metadata = {
  title: "Forgot Password | Your E-commerce Store",
  description: "Reset your password by entering your username. We'll send you a password reset link to your email.",
  keywords: ["forgot password", "password reset", "account recovery", "e-commerce"],
};

export default function ForgotPasswordPage() {
  return (
    <div className="mx-auto max-w-sm px-4 py-16">
      <Suspense fallback={<ForgotPasswordSkeleton />}>
        <ForgotPasswordForm />
      </Suspense>
    </div>
  );
}
