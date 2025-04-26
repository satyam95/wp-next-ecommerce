"use client";

import {
  GET_COUNTRIES,
  GET_STATES,
} from "@/apollo/queries/getCountriesAndStates";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useAppSelector } from "@/redux/hooks";
import { useMutation, useQuery } from "@apollo/client";
import { CreditCard, Package, ShoppingBag, Truck } from "lucide-react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useEffect, useState } from "react";
import { CheckoutSchema } from "@/schemas/checkoutSchema";
import { CREATE_ORDER_MUTATION } from "@/apollo/mutations/createOrder";
import { useRouter } from "next/navigation";
import { useCartActions } from "@/redux/useCartActions";

type CheckoutFormData = z.infer<typeof CheckoutSchema>;

export default function CheckoutForm() {
    const router = useRouter();

    const { clearCart, refetch } = useCartActions();
  
    const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  
    const { contents, total, totalTax, shippingTotal, subtotal } = useAppSelector(
      (state) => state.cart
    );
    const { customer } = useAppSelector((state) => state.session);
  
    // Skip fetching countries if cart is empty
    const { data: countriesData } = useQuery(GET_COUNTRIES, {
      skip: contents.nodes.length === 0,
    });
  
    const {
      register,
      handleSubmit,
      watch,
      setValue,
      setError,
      formState: { errors },
    } = useForm<CheckoutFormData>({
      resolver: zodResolver(CheckoutSchema),
      defaultValues: {
        email: customer?.email || "",
        phone: customer?.shipping?.phone || "",
        shipping: {
          firstName: customer?.shipping?.firstName || "",
          lastName: customer?.shipping?.lastName || "",
          address1: customer?.shipping?.address1 || "",
          city: customer?.shipping?.city || "",
          state: customer?.shipping?.state || "",
          postcode: customer?.shipping?.postcode || "",
          country: customer?.shipping?.country || "",
        },
        billing: {
          firstName: customer?.billing?.firstName || "",
          lastName: customer?.billing?.lastName || "",
          address1: customer?.billing?.address1 || "",
          city: customer?.billing?.city || "",
          state: customer?.billing?.state || "",
          postcode: customer?.billing?.postcode || "",
          country: customer?.billing?.country || "",
        },
        paymentMethod: "cod",
        sameAsShipping: false,
      },
    });
  
    const selectedShippingCountry = watch("shipping.country");
    const selectedBillingCountry = watch("billing.country");
  
    // Skip fetching states if cart is empty or no country is selected
    const { data: shippingStatesData } = useQuery(GET_STATES, {
      variables: { country: selectedShippingCountry },
      skip: !selectedShippingCountry || contents.nodes.length === 0,
    });
    const { data: billingStatesData } = useQuery(GET_STATES, {
      variables: { country: selectedBillingCountry },
      skip: !selectedBillingCountry || contents.nodes.length === 0,
    });
  
    useEffect(() => {
      if (
        selectedShippingCountry &&
        shippingStatesData &&
        shippingStatesData.countryStates?.length === 0
      ) {
        setValue("shipping.state", "N/A");
      }
    }, [selectedShippingCountry, shippingStatesData, setValue]);
  
    useEffect(() => {
      if (
        selectedBillingCountry &&
        billingStatesData &&
        billingStatesData.countryStates?.length === 0
      ) {
        setValue("billing.state", "N/A");
      }
    }, [selectedBillingCountry, billingStatesData, setValue]);
  
    const [createOrder, { error }] = useMutation(CREATE_ORDER_MUTATION);
  
    const onSubmit = async (data: CheckoutFormData) => {
      setIsSubmittingOrder(true);
  
      if (data.sameAsShipping) {
        data.billing = { ...data.shipping };
      }
      try {
        const variables: Record<string, any> = {
          isPaid: false,
          paymentMethod: data.paymentMethod,
          billing: data.billing,
          shipping: data.shipping,
        };
        const response = await createOrder({ variables });
  
        if (response.data.checkout.result === "success") {
  
          await clearCart();
          await refetch();
          
          const orderId = response.data.checkout.order.orderNumber;
          router.push(`/thank-you?orderId=${orderId}`);
        } else {
          setError("root", {
            message: "Order creation failed. Please try again.",
          });
          console.error("Order creation failed:", response.data.checkout);
        }
      } catch (err) {
        setError("root", {
          message: "An error occurred. Please try again.",
        });
        console.error("Error creating order:", err);
      } finally {
        setIsSubmittingOrder(false);
      }
    };
  
    // Display message if cart is empty
    if (contents.nodes.length === 0) {
      return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
          <div className="text-center">
            <p className="text-xl font-semibold mb-4">Your cart is empty</p>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Please add products to your cart before checking out.
            </p>
            <Button onClick={() => router.push("/shop")}>Shop Now</Button>
          </div>
        </div>
      );
    }
  
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="min-h-screen bg-gray-50 dark:bg-gray-900"
      >
        <div className="max-w-7xl mx-auto px-4 py-8 md:px-6 md:py-12">
          <div className="flex items-center gap-3 mb-6 sm:mb-8">
            <ShoppingBag className="h-6 w-6 sm:h-8 sm:w-8" />
            <h1 className="text-2xl sm:text-3xl font-bold">Checkout</h1>
          </div>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Information */}
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    <h2 className="text-base sm:text-xl font-semibold">Contact Information</h2>
                  </div>
                </CardHeader>
                <CardContent className="grid gap-4 p-4 sm:p-6 pt-0">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        {...register("email")}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm">
                          {errors.email.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        {...register("phone")}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm">
                          {errors.phone.message}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Shipping Address */}
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex items-center gap-2">
                    <Truck className="h-5 w-5" />
                    <h2 className="text-base sm:text-xl font-semibold">Shipping Address</h2>
                  </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="grid gap-4 sm:gap-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="shipping-firstName">First Name</Label>
                        <Input
                          id="shipping-firstName"
                          placeholder="John"
                          {...register("shipping.firstName")}
                        />
                        {errors.shipping?.firstName && (
                          <p className="text-red-500 text-sm">
                            {errors.shipping.firstName.message}
                          </p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="shipping-lastName">Last Name</Label>
                        <Input
                          id="shipping-lastName"
                          placeholder="Doe"
                          {...register("shipping.lastName")}
                        />
                        {errors.shipping?.lastName && (
                          <p className="text-red-500 text-sm">
                            {errors.shipping.lastName.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="shipping-address">Street Address</Label>
                      <Input
                        id="shipping-address"
                        placeholder="123 Main St"
                        {...register("shipping.address1")}
                      />
                      {errors.shipping?.address1 && (
                        <p className="text-red-500 text-sm">
                          {errors.shipping.address1.message}
                        </p>
                      )}
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="shipping-city">City</Label>
                        <Input
                          id="shipping-city"
                          placeholder="New York"
                          {...register("shipping.city")}
                        />
                        {errors.shipping?.city && (
                          <p className="text-red-500 text-sm">
                            {errors.shipping.city.message}
                          </p>
                        )}
                      </div>
                      {(!selectedShippingCountry ||
                        (shippingStatesData?.countryStates &&
                          shippingStatesData.countryStates.length > 0)) && (
                        <div className="space-y-2">
                          <Label htmlFor="shipping-state">State</Label>
                          <Select
                            value={watch("shipping.state")}
                            onValueChange={(value) =>
                              setValue("shipping.state", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                            <SelectContent>
                              {shippingStatesData?.countryStates.map(
                                (state: { name: string; code: string }) => (
                                  <SelectItem key={state.code} value={state.code}>
                                    {state.name}
                                  </SelectItem>
                                )
                              )}
                            </SelectContent>
                          </Select>
                          {errors.shipping?.state && (
                            <p className="text-red-500 text-sm">
                              {errors.shipping.state.message}
                            </p>
                          )}
                        </div>
                      )}
                      <div className="space-y-2">
                        <Label htmlFor="shipping-postcode">ZIP Code</Label>
                        <Input
                          id="shipping-postcode"
                          placeholder="10001"
                          {...register("shipping.postcode")}
                        />
                        {errors.shipping?.postcode && (
                          <p className="text-red-500 text-sm">
                            {errors.shipping.postcode.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="shipping-country">Country</Label>
                      <Select
                        value={watch("shipping.country")}
                        onValueChange={(value) =>
                          setValue("shipping.country", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          {countriesData?.shippingCountries.map(
                            (country: { name: string; code: string }) => (
                              <SelectItem key={country.code} value={country.code}>
                                {country.name}
                              </SelectItem>
                            )
                          )}
                        </SelectContent>
                      </Select>
                      {errors.shipping?.country && (
                        <p className="text-red-500 text-sm">
                          {errors.shipping.country.message}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
              {/* Billing Address */}
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex items-center justify-between gap-1 sm:gap-2">
                    <div className="flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      <h2 className="sm:text-xl font-semibold">Billing Address</h2>
                    </div>
                    <div className="flex items-center space-x-1 sm:space-x-2">
                      <Label htmlFor="same-as-shipping" className="text-xs sm:text-sm">
                        Same as shipping
                      </Label>
                      <Switch
                        id="same-as-shipping"
                        checked={watch("sameAsShipping")}
                        onCheckedChange={(checked) =>
                          setValue("sameAsShipping", checked)
                        }
                      />
                    </div>
                  </div>
                </CardHeader>
                {!watch("sameAsShipping") && (
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <div className="grid gap-4 sm:gap-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="billing-firstName">First Name</Label>
                          <Input
                            id="billing-firstName"
                            placeholder="John"
                            {...register("billing.firstName")}
                          />
                          {errors.billing?.firstName && (
                            <p className="text-red-500 text-sm">
                              {errors.billing.firstName.message}
                            </p>
                          )}
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="billing-lastName">Last Name</Label>
                          <Input
                            id="billing-lastName"
                            placeholder="Doe"
                            {...register("billing.lastName")}
                          />
                          {errors.billing?.lastName && (
                            <p className="text-red-500 text-sm">
                              {errors.billing.lastName.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="billing-address">Street Address</Label>
                        <Input
                          id="billing-address"
                          placeholder="123 Main St"
                          {...register("billing.address1")}
                        />
                        {errors.billing?.address1 && (
                          <p className="text-red-500 text-sm">
                            {errors.billing.address1.message}
                          </p>
                        )}
                      </div>
                      <div className="grid md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="billing-city">City</Label>
                          <Input
                            id="billing-city"
                            placeholder="New York"
                            {...register("billing.city")}
                          />
                          {errors.billing?.city && (
                            <p className="text-red-500 text-sm">
                              {errors.billing.city.message}
                            </p>
                          )}
                        </div>
                        {(!selectedBillingCountry ||
                          (billingStatesData?.countryStates &&
                            billingStatesData.countryStates.length > 0)) && (
                          <div className="space-y-2">
                            <Label htmlFor="billing-state">State</Label>
                            <Select
                              value={watch("billing.state")}
                              onValueChange={(value) =>
                                setValue("billing.state", value)
                              }
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select state" />
                              </SelectTrigger>
                              <SelectContent>
                                {billingStatesData?.countryStates.map(
                                  (state: { name: string; code: string }) => (
                                    <SelectItem
                                      key={state.code}
                                      value={state.code}
                                    >
                                      {state.name}
                                    </SelectItem>
                                  )
                                )}
                              </SelectContent>
                            </Select>
                            {errors.billing?.state && (
                              <p className="text-red-500 text-sm">
                                {errors.billing.state.message}
                              </p>
                            )}
                          </div>
                        )}
                        <div className="space-y-2">
                          <Label htmlFor="billing-postcode">ZIP Code</Label>
                          <Input
                            id="billing-postcode"
                            placeholder="10001"
                            {...register("billing.postcode")}
                          />
                          {errors.billing?.postcode && (
                            <p className="text-red-500 text-sm">
                              {errors.billing.postcode.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="billing-country">Country</Label>
                        <Select
                          value={watch("billing.country")}
                          onValueChange={(value) =>
                            setValue("billing.country", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            {countriesData?.shippingCountries.map(
                              (country: { name: string; code: string }) => (
                                <SelectItem
                                  key={country.code}
                                  value={country.code}
                                >
                                  {country.name}
                                </SelectItem>
                              )
                            )}
                          </SelectContent>
                        </Select>
                        {errors.billing?.country && (
                          <p className="text-red-500 text-sm">
                            {errors.billing.country.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            </div>
            {/* Right Column - Order Summary & Payment */}
            <div className="space-y-6">
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="text-base sm:text-xl font-semibold">Order Summary</h2>
                    <span className="text-sm text-muted-foreground">
                      {contents.itemCount} items
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="space-y-4">
                    <ScrollArea className="max-h-[300px] pr-4">
                      <div className="space-y-4">
                        {contents.nodes.map((item: any) => (
                          <div
                            key={item.key}
                            className="flex gap-4 p-2 rounded-lg hover:bg-accent/50 transition-colors"
                          >
                            <div className="relative h-20 w-20 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={item.product.node.image.sourceUrl}
                                alt={item.product.node.image.altText}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h3 className="font-medium truncate">
                                {item.product.node.name}
                              </h3>
                              <div className="flex justify-between mt-1">
                                <p className="text-sm">Qty: {item.quantity}</p>
                                <p className="font-medium">{item.total}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                    <Separator className="my-4" />
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <p className="text-gray-500 dark:text-gray-400">
                          Subtotal
                        </p>
                        <p className="font-medium">{subtotal}</p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-gray-500 dark:text-gray-400">
                          Shipping
                        </p>
                        <p className="font-medium">{shippingTotal}</p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-gray-500 dark:text-gray-400">Tax</p>
                        <p className="font-medium">{totalTax}</p>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg font-semibold">
                        <p>Total</p>
                        <p>{total}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    <h2 className="text-base sm:text-xl font-semibold">Payment Method</h2>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 p-4 sm:p-6 pt-0">
                  <div className="grid gap-4">
                    <div className="flex items-center p-4 border rounded-lg">
                      <input
                        type="radio"
                        id="cod"
                        value="cod"
                        {...register("paymentMethod")}
                        className="h-4 w-4 border-gray-300"
                      />
                      <label htmlFor="cod" className="ml-3 block">
                        <span className="font-medium">Cash on Delivery</span>
                        <p className="text-sm text-gray-500">
                          Pay when you receive
                        </p>
                      </label>
                    </div>
                  </div>
                  {errors.root && (
                    <p className="text-red-500 text-sm">{errors.root.message}</p>
                  )}
                  {error && (
                    <p className="text-red-500 text-sm">
                      {error.message || "An error occurred. Please try again."}
                    </p>
                  )}
                  <Button
                    type="submit"
                    className="w-full"
                    size="lg"
                    disabled={isSubmittingOrder}
                  >
                    {isSubmittingOrder ? "Placing order..." : "Place Order"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </form>
  );
} 