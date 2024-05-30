import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { SVGProps } from "react";

export default function Orders() {
  return (
    <div className="flex flex-col w-full min-h-screen py-8">
      <div className="border-b">
        <div className="container">
          <div className="flex items-center h-16 shrink-0">
            <h1 className="text-lg font-bold md:text-xl">Orders</h1>
            <div className="flex items-center w-full gap-4 md:ml-auto md:gap-2 lg:gap-4">
              <form className="flex-1 ml-auto sm:flex-initial">
                <div className="relative">
                  <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <Input
                    className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
                    placeholder="Search orders..."
                    type="search"
                  />
                </div>
              </form>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="shrink-0" variant="outline">
                    <ArrowUpDownIcon className="w-4 h-4 mr-2" />
                    Sort by
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuRadioGroup value="date">
                    <DropdownMenuRadioItem value="date">
                      Date
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="order">
                      Order #
                    </DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="total">
                      Total
                    </DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="mt-4">
          <div className="flex flex-col gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Image
                      alt="Product Image"
                      className="rounded-md object-cover"
                      height={64}
                      src="/placeholder.svg"
                      style={{
                        aspectRatio: "64/64",
                        objectFit: "cover",
                      }}
                      width={64}
                    />
                    <div className="flex flex-col gap-1">
                      <div className="font-medium">Acme Prism Tee</div>
                      <div>Total: $150.00</div>
                    </div>
                  </div>
                  <div className="flex items-end flex-col gap-2 justify-between">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Order #12345
                    </div>
                    <div className="px-2 py-1 rounded-full bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400 text-xs font-medium">
                      Delivered
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Image
                      alt="Product Image"
                      className="rounded-md object-cover"
                      height={64}
                      src="/placeholder.svg"
                      style={{
                        aspectRatio: "64/64",
                        objectFit: "cover",
                      }}
                      width={64}
                    />
                    <div className="flex flex-col gap-1">
                      <div className="font-medium">Acme Prism Tee</div>
                      <div>Total: $150.00</div>
                    </div>
                  </div>
                  <div className="flex items-end flex-col gap-2 justify-between">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Order #12345
                    </div>
                    <div className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-600 dark:bg-yellow-900 dark:text-yellow-400 text-xs font-medium">
                      Shipped
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Image
                      alt="Product Image"
                      className="rounded-md object-cover"
                      height={64}
                      src="/placeholder.svg"
                      style={{
                        aspectRatio: "64/64",
                        objectFit: "cover",
                      }}
                      width={64}
                    />
                    <div className="flex flex-col gap-1">
                      <div className="font-medium">Acme Prism Tee</div>
                      <div>Total: $150.00</div>
                    </div>
                  </div>
                  <div className="flex items-end flex-col gap-2 justify-between">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Order #12345
                    </div>
                    <div className="px-2 py-1 rounded-full bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-400 text-xs font-medium">
                      Pending
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Image
                      alt="Product Image"
                      className="rounded-md object-cover"
                      height={64}
                      src="/placeholder.svg"
                      style={{
                        aspectRatio: "64/64",
                        objectFit: "cover",
                      }}
                      width={64}
                    />
                    <div className="flex flex-col gap-1">
                      <div className="font-medium">Acme Prism Tee</div>
                      <div>Total: $150.00</div>
                    </div>
                  </div>
                  <div className="flex items-end flex-col gap-2 justify-between">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Order #12345
                    </div>
                    <div className="px-2 py-1 rounded-full bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400 text-xs font-medium">
                      Delivered
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Image
                      alt="Product Image"
                      className="rounded-md object-cover"
                      height={64}
                      src="/placeholder.svg"
                      style={{
                        aspectRatio: "64/64",
                        objectFit: "cover",
                      }}
                      width={64}
                    />
                    <div className="flex flex-col gap-1">
                      <div className="font-medium">Acme Prism Tee</div>
                      <div>Total: $150.00</div>
                    </div>
                  </div>
                  <div className="flex items-end flex-col gap-2 justify-between">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Order #12345
                    </div>
                    <div className="px-2 py-1 rounded-full bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400 text-xs font-medium">
                      Delivered
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArrowUpDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m21 16-4 4-4-4" />
      <path d="M17 20V4" />
      <path d="m3 8 4-4 4 4" />
      <path d="M7 4v16" />
    </svg>
  );
}

function SearchIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}
