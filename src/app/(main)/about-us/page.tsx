import BreadCrumb from "@/Breadcrumb/Breadcrumb";
import Container from "@/components/ui/Container/Container";
import { Heading } from "@/components/ui/Heading/Heading";
import Featers from "@/Featers/Featers";
import Image from "next/image";

const AboutUs = () => {
  return (
    <Container>
      <BreadCrumb></BreadCrumb>
      <div className="grid grid-cols-2 gap-10 my-20">
        <div className="col-span-2 lg:col-span-1 relative aspect-square">
          <Image
            src="https://res.cloudinary.com/dnfqhy8di/image/upload/v1736070562/aboutus_nwzl15.png"
            alt="leaf"
            height={800}
            width={800}
            className="object-center"
          />
        </div>
        <div className="col-span-2 lg:col-span-1 flex justify-center  flex-col gap-6">
          <Heading className="text-3xl">
            About the <span className="text-primary">BlueBerry</span>
          </Heading>
          <Heading>Farm-fresh Goodness, just a click Away.</Heading>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
            Reprehenderit, rem! Et obcaecati rem nulla, aut assumenda unde
            minima earum distinctio porro excepturi veritatis officiis dolorem
            quod. sapiente amet rerum beatae dignissimos aperiam id quae quia
            velit. Ab optio doloribus hic quas sit corporis numquam. Lorem ipsum
            dolor sit amet consectetur, adipisicing elit. Reprehenderit, rem! Et
            obcaecati rem nulla, aut assumenda unde minima earum distinctio
            porro excepturi veritatis officiis dolorem quod. sapiente amet rerum
            beatae dignissimos aperiam id quae quia velit. Ab optio doloribus
            hic quas sit corporis numquam.
          </p>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-[#f8f8fb] px-10 py-5 rounded-2xl col-span-3 md:col-span-1 flex justify-center items-center flex-col">
              <Heading className="text-3xl  ">200+</Heading>
              <p>vendor</p>
            </div>
            <div className="bg-[#f8f8fb] px-10 py-5 rounded-2xl col-span-3 md:col-span-1  flex justify-center items-center flex-col">
              <Heading className="text-3xl">654k+</Heading>
              <p>Sales</p>
            </div>
            <div className="bg-[#f8f8fb] px-10  py-5 rounded-2xl col-span-3 md:col-span-1  flex justify-center items-center flex-col">
              <Heading className="text-3xl">587k+</Heading>
              <p>Customers</p>
            </div>
          </div>
        </div>
      </div>
      <div className="my-10">
        <Heading className="text-center">
          Our <span className="text-primary">Services</span>
        </Heading>
        <p className="text-center my-5">
          Customer service should not be a department. <br /> It should be the
          entire company.
        </p>
        <Featers></Featers>
      </div>
    </Container>
  );
};

export default AboutUs;
