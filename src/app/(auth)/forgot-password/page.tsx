"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { gql, useMutation } from "@apollo/client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { RESET_PASSWORD_MUTATION } from "@/apollo/mutations/resetPassword";

const usernameSchema = z.object({
  username: z.string().nonempty("Username is required."),
});

type UsernameSchema = z.infer<typeof usernameSchema>;

export default function ForgetPassword() {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [resetPassword, { loading }] = useMutation(RESET_PASSWORD_MUTATION);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UsernameSchema>({
    resolver: zodResolver(usernameSchema),
  });

  const onSubmit = async (data: UsernameSchema) => {
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const { data: mutationData } = await resetPassword({
        variables: { username: data.username },
      });

      if (mutationData.sendPasswordResetEmail.success) {
        setSuccessMessage("Password reset link sent successfully!");
      } else {
        setErrorMessage("Failed to send reset link. Please try again.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
    }
  };

  return (
    <div className="mx-auto max-w-sm py-16">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Forgot your password?</CardTitle>
          <CardDescription>
            Please enter your username, and we'll email you a link to reset your
            password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Username"
                {...register("username")}
              />
              {errors.username && (
                <p className="text-red-600 text-sm">
                  {errors.username.message}
                </p>
              )}
            </div>
            {successMessage && (
              <p className="text-green-600 text-sm">{successMessage}</p>
            )}
            {errorMessage && (
              <p className="text-red-600 text-sm">{errorMessage}</p>
            )}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sending..." : "Send reset link"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col">
          <div className="mt-4 text-center text-sm">
            Remember your password?{" "}
            <Link href="/login" className="underline">
              Sign in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
