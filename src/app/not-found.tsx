import Link from "next/link";
import Image from "next/image";
import { Heading } from "@/components/ui/Heading/Heading";

export default function NotFound() {
  return (
    <div className="relative py-16 px-4 w-full min-h-screen bg-white flex justify-center items-center">
      <div className="flex flex-col items-center">
        {/* TITLE */}
        <div className="text-center space-y-5">
          <p className="text-6xl sm:text-7xl text-primary font-bold tracking-wide">
            404
          </p>
          <Heading className="text-3xl sm:text-4xl md:text-5xl text-gray-700 font-semibold capitalize">
            This page does not exist
          </Heading>
          <p className="text-sm text-gray-500 font-medium">
            Sorry! We could not find the page you are looking for. Please check
            the URL in the address bar and try again.
          </p>
        </div>

        {/* OPTION LINKS */}
        <div className="mt-8 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <Link
            href="/"
            className="px-5 py-2.5 rounded border border-transparent bg-primary  text-center text-base text-white font-medium hover:bg-primary/90"
          >
            Get back to Homepage
          </Link>
          {/* <Link
            href="/contact-us"
            className="px-5 py-2.5 rounded border-2 border-primary  bg-transparent text-center text-base text-primary  font-medium hover:border-primary/70  hover:text-primary/70"
          >
            Contact Support
          </Link> */}
        </div>

        {/* ILLUSTRATION */}
        <div className="mt-10 max-h-72 relative w-full max-w-md h-72">
          <Image
            src="https://fancytailwind.com/static/under_construction-503cab99df4458de6d2801e7ee4fa400.svg"
            alt="Under construction"
            layout="fill"
            objectFit="contain"
            priority
          />
        </div>
      </div>
    </div>
  );
}
