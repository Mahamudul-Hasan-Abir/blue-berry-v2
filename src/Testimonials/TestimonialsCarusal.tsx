"use client";
import "swiper/css";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { Heading } from "@/components/ui/Heading/Heading";

const items = [
  {
    id: 1,
    image:
      "https://res.cloudinary.com/dnfqhy8di/image/upload/v1731187281/user_profiles/b1ls4rxgwiaheaxy1rwx.jpg",
    name: "Nadia Ondhokar Shudha",
    role: "Co-Founder",
    comment:
      "I recently ordered from this food delivery platform and was genuinely impressed. The user interface is clean and easy to navigate. Delivery was on time, and the packaging was neat. The products were fresh and exactly as described. Definitely one of the best online food shopping experiences I’ve had!",
  },
  {
    id: 2,
    image:
      "https://res.cloudinary.com/dnfqhy8di/image/upload/v1731026373/user_profiles/sa0myjl3faz7x9kfi9d6.jpg",
    name: "Mecho Bagg Sumiya",
    role: "Team-Leader",

    comment:
      "I recently ordered from this food delivery platform and was genuinely impressed. The user interface is clean and easy to navigate. Delivery was on time, and the packaging was neat. The products were fresh and exactly as described. Definitely one of the best online food shopping experiences I’ve had!",
  },
  {
    id: 3,
    image:
      "https://res.cloudinary.com/dnfqhy8di/image/upload/v1736069028/3_1_tu1poo.jpg",
    name: "The Drunk Fish",
    role: "Founder",
    comment:
      "I recently ordered from this food delivery platform and was genuinely impressed. The user interface is clean and easy to navigate. Delivery was on time, and the packaging was neat. The products were fresh and exactly as described. Definitely one of the best online food shopping experiences I’ve had!",
  },
];

const TestimonialsCarusal = () => {
  return (
    <div>
      <Swiper
        modules={[Autoplay]}
        loop
        grabCursor
        autoplay={{ delay: 1500, disableOnInteraction: false }}
        speed={1000}
        spaceBetween={16}
        breakpoints={{
          425: { slidesPerView: 1 },
          640: { slidesPerView: 1 },
          768: { slidesPerView: 1 },
          1024: { slidesPerView: 1 },
        }}
        className="w-full"
      >
        {items.map((item) => (
          <SwiperSlide key={item.id}>
            {/* SM version */}
            <div className="block md:hidden">
              <div className="grid grid-cols-1 gap-5">
                <div className="flex gap-5">
                  <div className="w-20 h-20 relative aspect-square rounded-xl overflow-hidden">
                    <Image src={item.image} alt={item.name} fill />
                  </div>
                  <div>
                    <Heading className="text-lg">{item.name}</Heading>
                    <p className="text-sm text-[#777]">{`(${item.role})`}</p>
                  </div>
                </div>
                <div>
                  <div className="border-[1px] border-accent p-5 rounded-3xl">
                    {item.comment}
                  </div>
                </div>
              </div>
            </div>

            {/* MD and up version */}
            <div className="hidden md:block">
              <div className="grid grid-cols-3 gap-5">
                <div className="col-span-1 relative aspect-square rounded-3xl overflow-hidden max-w-xs">
                  <Image src={item.image} alt={item.name} fill />
                </div>
                <div className="col-span-2 relative">
                  <div className="absolute bottom-0">
                    <Heading className="text-lg">{item.name}</Heading>
                    <p className="text-sm text-[#777]">{`(${item.role})`}</p>
                    <div className="border-[1px] border-accent p-5 rounded-3xl mt-2">
                      {item.comment}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TestimonialsCarusal;
