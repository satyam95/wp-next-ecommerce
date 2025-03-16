import { z } from "zod";

export const CheckoutSchema = z.object({
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone is required"),
  shipping: z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    address1: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    postcode: z.string().min(1, "ZIP Code is required"),
    country: z.string().min(1, "Country is required"),
  }),
  billing: z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    address1: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    postcode: z.string().min(1, "ZIP Code is required"),
    country: z.string().min(1, "Country is required"),
  }),
  paymentMethod: z.enum(["stripe", "cod"]),
  sameAsShipping: z.boolean(),
});
