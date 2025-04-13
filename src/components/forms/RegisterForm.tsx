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
import { registerSchema } from "@/schemas/registerSchema";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation } from "@apollo/client";
import { REGISTER_USER_MUTATION } from "@/apollo/mutations/registerUser";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type RegisterFormData = z.infer<typeof registerSchema>;

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  const router = useRouter();

  const [registerUser, { loading, error }] = useMutation(
    REGISTER_USER_MUTATION
  );

  const onSubmit = async (data: RegisterFormData) => {
    try {
      const response = await registerUser({
        variables: {
          username: data.username,
          email: data.email,
          password: data.password,
        },
      });
      toast.success(
        response.data.registerUser.id || "User registered successfully!"
      );
      router.push("/login");
    } catch (err) {
      if (err instanceof Error) {
        toast.error(err.message || "An error occurred.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="user-name">Username</Label>
              <Input
                id="user-name"
                placeholder="username"
                {...register("username")}
              />
              {errors.username && (
                <p className="text-red-500 text-sm">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="******"
                {...register("password")}
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Submitting..." : "Create an account"}
            </Button>
            {error && (
              <p className="text-red-500 text-sm mt-2">{error.message}</p>
            )}
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
} 