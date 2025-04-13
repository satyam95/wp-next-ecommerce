import { Metadata } from "next";
import RegisterForm from "@/components/forms/RegisterForm";

export const metadata: Metadata = {
  title: "Register | Your E-commerce Store",
  description: "Create a new account to start shopping, track orders, and manage your profile.",
  keywords: ["register", "sign up", "create account", "e-commerce", "authentication"],
};

export default function RegisterPage() {
  return (
    <div className="py-16">
      <RegisterForm />
    </div>
  );
}
