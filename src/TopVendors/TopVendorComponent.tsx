"use client";

import { Heading } from "@/components/ui/Heading/Heading";
import VendorCard from "./VendorCard";
import Image from "next/image";
import { useState } from "react";

const TopVendorsComponent = () => {
  const vendorArray = [
    {
      id: 1,
      vendorName: "Abir Fashion Pvt. Ltd.",
      description: "Fruits (5) | Vegetables (30) | Snacks (09) ",
      image:
        "https://res.cloudinary.com/dnfqhy8di/image/upload/v1736072052/user_profiles/qvxvfyrifdu19xpkjhna.jpg",
    },
    {
      id: 2,
      vendorName: "Shagor Fashion Pvt. Ltd.",
      description: "Fruits (8) | Vegetables (15) | Snacks (04)  ",
      image:
        "https://res.cloudinary.com/dnfqhy8di/image/upload/v1746999401/vendor-2_qd3rvc.jpg",
    },
    {
      id: 3,
      vendorName: "Shakil Fashion Pvt. Ltd.",
      description: "Fruits (2) | Vegetables (10) | Snacks (03) ",
      image:
        "https://res.cloudinary.com/dnfqhy8di/image/upload/v1746999400/vendor-3_nel15f.jpg",
    },
    {
      id: 4,
      vendorName: "Fahim Fashion Pvt. Ltd.",
      description: "Fruits (16) | Vegetables (42) | Snacks (18) ",
      image:
        "https://res.cloudinary.com/dnfqhy8di/image/upload/v1746999401/vendor-4_mlhtol.jpg",
    },
  ];

  const [selectedId, setSelectedId] = useState(1);

  const selectedVendor = vendorArray.find((v) => v.id === selectedId);

  return (
    <div className="my-20">
      <div>
        <Heading className="text-center">
          Top <span className="text-primary">Vendors</span>
        </Heading>
        <p className="text-center my-5">
          Discover Our Trusted Partners: Excellence & Reliability in Every
          Choice
        </p>
      </div>
      <div className="grid grid-cols-5 gap-5">
        {/* LEFT IMAGE SECTION */}
        <div className="relative lg:col-span-2 col-span-5 w-full aspect-square rounded-t-3xl rounded-bl-3xl overflow-hidden">
          <Image
            src={selectedVendor?.image ?? ""}
            fill
            alt="vendor"
            className="object-contain"
          />
          <div className="h-48 w-48 absolute bottom-0 right-0">
            <div className="relative">
              <div className="h-8 w-8 absolute top-40 right-36">
                <Image
                  src="https://res.cloudinary.com/dnfqhy8di/image/upload/v1736068258/left-shape_oqb9wa.png"
                  alt="corner"
                  fill
                />
              </div>
              <div className="h-36 w-36 aspect-square absolute top-12 right-0 bg-white rounded-tl-4xl">
                <div className="h-28 w-28 relative mx-auto my-5 rounded-2xl overflow-hidden">
                  <Image
                    src="https://res.cloudinary.com/dnfqhy8di/image/upload/v1746997748/local_shop_pf4znd.jpg"
                    alt="corner"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="h-8 w-8 absolute top-4 right-0">
                <Image
                  src="https://res.cloudinary.com/dnfqhy8di/image/upload/v1736068258/left-shape_oqb9wa.png"
                  alt="corner"
                  fill
                />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT CARD LIST */}
        <div className="grid grid-cols-1 gap-5 lg:col-span-3 col-span-5">
          {vendorArray.map((cardItem) => (
            <div key={cardItem.id}>
              <VendorCard
                vendorName={cardItem.vendorName}
                description={cardItem.description}
                focused={selectedId === cardItem.id}
                onClick={() => setSelectedId(cardItem.id)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopVendorsComponent;
