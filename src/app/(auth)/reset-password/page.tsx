"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { gql, useMutation } from "@apollo/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { SET_NEW_PASSWORD_MUTATION } from "@/apollo/mutations/setNewPassword";

const newPasswordSchema = z.object({
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

type NewPasswordSchema = z.infer<typeof newPasswordSchema>;

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const key = searchParams.get("key");
  const username = searchParams.get("login");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewPasswordSchema>({
    resolver: zodResolver(newPasswordSchema),
  });

  const [setPassword, { loading }] = useMutation(SET_NEW_PASSWORD_MUTATION);

  const onSubmit = async (data: NewPasswordSchema) => {
    if (!key || !username) {
      toast.error("Invalid or expired reset link. Please request a new one.");
      return;
    }

    try {
      const response = await setPassword({
        variables: {
          login: username as string,
          key: key as string,
          password: data.password,
        },
      });

      if (response.data.resetUserPassword.user) {
        toast.success("Password reset successfully. Redirecting to login...");
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        toast.error(
          response.data.resetUserPassword.message || "Password reset failed."
        );
      }
    } catch (error) {
      toast.error("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="mx-auto max-w-sm py-16">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Reset your password</CardTitle>
          <CardDescription>
            Enter your new password to reset your account password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="password">New Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter new password"
                {...register("password")}
              />
              {errors.password?.message && (
                <p className="text-red-600 text-sm">
                  {String(errors.password.message)}
                </p>
              )}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Resetting..." : "Reset Password"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
