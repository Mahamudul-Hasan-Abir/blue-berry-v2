"use client";
import { Button } from "@/components/ui/button";
import Container from "@/components/ui/Container/Container";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../../../Map/Map"), { ssr: false });
const ContactUs = () => {
  return (
    <Container>
      <div className="grid grid-cols-2 gap-6 my-20">
        <form className="border-[1px] border-accent p-10 rounded-3xl col-span-2 lg:col-span-1">
          <div className="grid w-full  items-center gap-1.5 mb-6">
            <Input
              className="w-full"
              type="text"
              id="email"
              placeholder="Your First Name"
            />
          </div>
          <div className="grid w-full  items-center gap-1.5 mb-6">
            <Input
              className="w-full"
              type="text"
              id="email"
              placeholder="Your Last Name"
            />
          </div>
          <div className="grid w-full  items-center gap-1.5 mb-6">
            <Input
              className="w-full"
              type="email"
              id="email"
              placeholder="Your Email"
            />
          </div>
          <div className="grid w-full  items-center gap-1.5 mb-6">
            <Input
              className="w-full"
              type="number"
              id="email"
              placeholder="Your Phone Number"
            />
          </div>
          <div>
            <Textarea
              placeholder="Please leave your comment here"
              className="border-[1px] border-accent"
            />
          </div>
          <Button type="button" className="mt-10">
            Submit
          </Button>
        </form>
        <div className="border-[1px] border-accent p-10 rounded-3xl col-span-2 lg:col-span-1">
          <Map></Map>
        </div>
      </div>
    </Container>
  );
};

export default ContactUs;
