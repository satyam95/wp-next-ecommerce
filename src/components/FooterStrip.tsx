import React, { SVGProps } from "react";

const FooterStrip = () => {
  return (
    <section className="bg-gray-100 py-4 md:py-6 lg:py-8">
      <div className="container grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex items-center gap-4">
          <CalendarIcon className="w-8 h-8 text-primary" />
          <div>
            <h3 className="font-semibold">Preferred Time Slot Selection</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Choose a convenient time for delivery
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <TruckIcon className="w-8 h-8 text-primary" />
          <div>
            <h3 className="font-semibold">Delivery in 700+ Cities</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              We deliver to all major cities
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <UsersIcon className="w-8 h-8 text-primary" />
          <div>
            <h3 className="font-semibold">20 Million People Trust Us</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Our customers love our service
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <LocateIcon className="w-8 h-8 text-primary" />
          <div>
            <h3 className="font-semibold">18000+ Pincodes Serviced</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              We deliver to all major pincodes
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterStrip;

function CalendarIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}

function LocateIcon(props: SVGProps<SVGSVGElement>) {
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
      <line x1="2" x2="5" y1="12" y2="12" />
      <line x1="19" x2="22" y1="12" y2="12" />
      <line x1="12" x2="12" y1="2" y2="5" />
      <line x1="12" x2="12" y1="19" y2="22" />
      <circle cx="12" cy="12" r="7" />
    </svg>
  );
}

function TruckIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </svg>
  );
}

function UsersIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
