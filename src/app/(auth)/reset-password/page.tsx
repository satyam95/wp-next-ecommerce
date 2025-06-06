import { Metadata } from "next";
import { Suspense } from "react";
import ResetPasswordForm from "@/components/forms/ResetPasswordForm";
import ResetPasswordSkeleton from "@/components/skeleton/ResetPasswordSkeleton";

export const metadata: Metadata = {
  title: "Reset Password | Your E-commerce Store",
  description: "Set a new password for your account using the reset link sent to your email.",
  keywords: ["reset password", "new password", "account recovery", "e-commerce", "authentication"],
};

export default function ResetPasswordPage() {
  return (
    <div className="mx-auto max-w-sm px-4 py-16">
      <Suspense fallback={<ResetPasswordSkeleton />}>
        <ResetPasswordForm />
      </Suspense>
    </div>
  );
}
