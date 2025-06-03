import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  LocateIcon,
  MailIcon,
  Package2Icon,
  PhoneIcon,
  TwitterIcon,
} from "lucide-react";
import Link from "next/link";
import React from "react";

export const Footer = () => {
  return (
    <footer className=" bg-gray-100 py-6 w-full">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          <div className="flex flex-col">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 mb-2">
                <Package2Icon className="h-6 w-6" />
                <span className="text-base font-semibold">Store</span>
              </div>
              <p className="text-gray-500">
                Beautifully designed components that you can copy and paste into
                your apps.
              </p>
              <div className="flex gap-3">
                <Link className="text-gray-500 hover:text-gray-900" href="#">
                  <TwitterIcon className="h-5 w-5" />
                </Link>
                <Link className="text-gray-500 hover:text-gray-900" href="#">
                  <FacebookIcon className="h-5 w-5" />
                </Link>
                <Link className="text-gray-500 hover:text-gray-900" href="#">
                  <InstagramIcon className="h-5 w-5" />
                </Link>
                <Link className="text-gray-500 hover:text-gray-900" href="#">
                  <LinkedinIcon className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <Link className="text-gray-500 hover:text-gray-900" href="#">
                Home
              </Link>
              <Link className="text-gray-500 hover:text-gray-900" href="#">
                Shop
              </Link>
              <Link className="text-gray-500 hover:text-gray-900" href="#">
                About
              </Link>
              <Link className="text-gray-500 hover:text-gray-900" href="#">
                Contact
              </Link>
              <Link
                className="text-gray-500 hover:text-gray-900"
                href="/track-order"
              >
                Track order
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold">Contact</h3>
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-gray-500">
                <PhoneIcon className="h-5 w-5" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <MailIcon className="h-5 w-5" />
                <span>support@acme.com</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <LocateIcon className="h-5 w-5" />
                <span>123 Main St, Anytown USA</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="font-semibold">Legal</h3>
            <div className="flex flex-col gap-2">
              <Link className="text-gray-500 hover:text-gray-900" href="#">
                Terms of Service
              </Link>
              <Link className="text-gray-500 hover:text-gray-900" href="#">
                Privacy Policy
              </Link>
              <Link className="text-gray-500 hover:text-gray-900" href="#">
                Refund Policy
              </Link>
              <Link className="text-gray-500 hover:text-gray-900" href="#">
                Shipping Policy
              </Link>
            </div>
          </div>
        </div>
        <div className="container max-w-7xl mt-8 flex justify-center text-sm text-gray-500">
          <p>© 2025 Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
