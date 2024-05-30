import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

export default function Shipping() {
  return (
    <>
      <div className="w-full max-w-2xl mx-auto px-4 py-12 md:px-6 md:py-16">
        <div className="grid gap-8">
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Shipping Address</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Enter your shipping address details.
            </p>
          </div>
          <div className="grid gap-6">
            <div className="grid gap-4">
              <Card>
                <CardHeader className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h3 className="text-lg font-semibold">John Doe</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      123 Main St, Anytown USA 12345
                    </p>
                  </div>
                  <Link href="/payment">
                    <Button variant="outline">Deliver here</Button>
                  </Link>
                </CardHeader>
              </Card>
            </div>
            <form className="grid gap-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Enter your name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address-line-1">Address Line 1</Label>
                  <Input
                    id="address-line-1"
                    placeholder="Enter address line 1"
                    required
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="address-line-2">Address Line 2</Label>
                  <Input
                    id="address-line-2"
                    placeholder="Enter address line 2"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="Enter your city" required />
                </div>
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Input id="state" placeholder="Enter your state" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zip-code">Zip Code</Label>
                  <Input
                    id="zip-code"
                    placeholder="Enter your zip code"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="us">United States</SelectItem>
                      <SelectItem value="ca">Canada</SelectItem>
                      <SelectItem value="mx">Mexico</SelectItem>
                      <SelectItem value="gb">United Kingdom</SelectItem>
                      <SelectItem value="au">Australia</SelectItem>
                      <SelectItem value="nz">New Zealand</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button className="w-full" type="submit">
                Save Address
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
