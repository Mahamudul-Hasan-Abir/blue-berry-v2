"use client";
import "swiper/css";

import { Londrina } from "@/components/ui/Londria/Londira";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
const items = [
  {
    id: 1,
    logo: "https://res.cloudinary.com/dnfqhy8di/image/upload/v1736068103/2_n0vxhz.svg",
    text: "Fruits",
    count: "283",
    background: "#e1fcf2",
  },
  {
    id: 2,
    logo: "https://res.cloudinary.com/dnfqhy8di/image/upload/v1736068103/3_hcemse.svg",
    text: "Fruits",
    count: "283",
    background: "#f4f1fe",
  },
  {
    id: 3,
    logo: "https://res.cloudinary.com/dnfqhy8di/image/upload/v1736068103/4_nnhcex.svg",
    text: "Fruits",
    count: "283",
    background: "#fbf9e4",
  },
  {
    id: 4,
    logo: "https://res.cloudinary.com/dnfqhy8di/image/upload/v1736068102/1_i8u7c6.svg",
    text: "Fruits",
    count: "283",
    background: "#fef1f1",
  },
  {
    id: 5,
    logo: "https://res.cloudinary.com/dnfqhy8di/image/upload/v1736068103/2_n0vxhz.svg",
    text: "Fruits",
    count: "283",
    background: "#e1fcf2",
  },
  {
    id: 6,
    logo: "https://res.cloudinary.com/dnfqhy8di/image/upload/v1736068103/3_hcemse.svg",
    text: "Fruits",
    count: "283",
    background: "#f4f1fe",
  },
  {
    id: 7,
    logo: "https://res.cloudinary.com/dnfqhy8di/image/upload/v1736068103/4_nnhcex.svg",
    text: "Fruits",
    count: "283",
    background: "#fbf9e4",
  },
  {
    id: 8,
    logo: "https://res.cloudinary.com/dnfqhy8di/image/upload/v1736068102/1_i8u7c6.svg",
    text: "Fruits",
    count: "283",
    background: "#fef1f1",
  },
];

const ExploreCategoriesDesktop = () => {
  return (
    // <Container>
    //   <div className="grid grid-cols-5 ">
    //     <div className="col-span-2 relative">
    //       {/* <Image
    //         src="https://res.cloudinary.com/dnfqhy8di/image/upload/v1736067972/category_1_asp8dv.jpg"
    //         width={1200}
    //         height={1200}
    //         alt="something"
    //         className="object-contain rounded-4xl max-w-[600px]"
    //       ></Image> */}
    //       <Image
    //         src="https://res.cloudinary.com/dnfqhy8di/image/upload/v1736067972/category_1_asp8dv.jpg"
    //         width={1200}
    //         height={1200}
    //         alt="something"
    //         className="object-contain rounded-4xl w-full max-w-xs lg:max-w-md xl:max-w-xl"
    //       />

    //       <div className="absolute left-96  top-0 h-96">
    //         <Londrina className="text-8xl">Explore Categories</Londrina>
    //       </div>
    //       <div className="corner-edge h-8 w-8 absolute top-[487px] right-[133px]">
    //         <Image
    //           src="https://res.cloudinary.com/dnfqhy8di/image/upload/v1736068258/left-shape_oqb9wa.png"
    //           alt="corner"
    //           fill
    //         />
    //       </div>

    //       <div className="card-carusal max-w-[600px] lg:max-w-[700px] xl:max-w-[940px] absolute -bottom-5 xl:left-96 lg:left-64 2xl:left-[300px] bg-white p-6 rounded-tl-4xl">
    //         <Swiper
    //           modules={[Autoplay]}
    //           loop
    //           grabCursor
    //           autoplay={{ delay: 1500, disableOnInteraction: false }}
    //           speed={800}
    //           spaceBetween={16}
    //           breakpoints={{
    //             425: { slidesPerView: 2 },
    //             640: { slidesPerView: 2 },
    //             768: { slidesPerView: 4 },
    //             1024: { slidesPerView: 4 },
    //           }}
    //           className="w-full"
    //         >
    //           {items.map((item) => (
    //             <SwiperSlide key={item.id}>
    //               <div
    //                 className="rounded-2xl flex items-center justify-center p-4 w-full h-full"
    //                 style={{ background: item.background }}
    //               >
    //                 <div className="flex flex-col items-center text-center w-[150px]">
    //                   <div className="relative w-14 h-14 mb-2">
    //                     <Image src={item.logo} fill alt={item.text} />
    //                   </div>
    //                   <p className="text-lg font-medium text-[#3d4750] capitalize">
    //                     {item.text}
    //                   </p>
    //                   <p className="text-xs text-[#686e7d] leading-[25px] font-light">
    //                     {item.count} items
    //                   </p>
    //                 </div>
    //               </div>
    //             </SwiperSlide>
    //           ))}
    //         </Swiper>
    //       </div>
    //     </div>
    //   </div>
    // </Container>
    // <Container>
    //   <div className="grid grid-cols-5">
    //     <div className="col-span-2 relative">
    //       <Image
    //         src="https://res.cloudinary.com/dnfqhy8di/image/upload/v1736067972/category_1_asp8dv.jpg"
    //         width={1200}
    //         height={1200}
    //         alt="something"
    //         className="object-contain rounded-4xl w-full max-w-xs lg:max-w-md xl:max-w-xl"
    //       />

    //       {/* Card Carousel with Corner Edge */}
    //       <div className="relative">
    //         <div className="card-carusal max-w-[600px] lg:max-w-[700px] xl:max-w-[940px] absolute -bottom-5 xl:left-96 lg:left-64 2xl:left-[300px] bg-white p-6 rounded-tl-4xl">
    //           <Swiper
    //             modules={[Autoplay]}
    //             loop
    //             grabCursor
    //             autoplay={{ delay: 1500, disableOnInteraction: false }}
    //             speed={800}
    //             spaceBetween={16}
    //             breakpoints={{
    //               425: { slidesPerView: 2 },
    //               640: { slidesPerView: 2 },
    //               768: { slidesPerView: 4 },
    //               1024: { slidesPerView: 4 },
    //             }}
    //             className="w-full"
    //           >
    //             {items.map((item) => (
    //               <SwiperSlide key={item.id}>
    //                 <div
    //                   className="rounded-2xl flex items-center justify-center p-4 w-full h-full"
    //                   style={{ background: item.background }}
    //                 >
    //                   <div className="flex flex-col items-center text-center w-[150px]">
    //                     <div className="relative w-14 h-14 mb-2">
    //                       <Image src={item.logo} fill alt={item.text} />
    //                     </div>
    //                     <p className="text-lg font-medium text-[#3d4750] capitalize">
    //                       {item.text}
    //                     </p>
    //                     <p className="text-xs text-[#686e7d] leading-[25px] font-light">
    //                       {item.count} items
    //                     </p>
    //                   </div>
    //                 </div>
    //               </SwiperSlide>
    //             ))}
    //           </Swiper>
    //         </div>

    //         {/* Corner Edge - positioned relative to card-carusal */}
    //         <div className="absolute xl:left-[345px] xl:-bottom-[2px] lg:left-[218px] lg:-bottom-[2px] h-10 w-10 z-10">
    //           <Image
    //             src="https://res.cloudinary.com/dnfqhy8di/image/upload/v1736068258/left-shape_oqb9wa.png"
    //             alt="corner"
    //             fill
    //             className="object-contain"
    //           />
    //         </div>
    //         <div className="absolute xl:left-[478px] xl:bottom-[175px] h-10 w-10 z-10">
    //           <Image
    //             src="https://res.cloudinary.com/dnfqhy8di/image/upload/v1736068258/left-shape_oqb9wa.png"
    //             alt="corner"
    //             fill
    //             className="object-contain"
    //           />
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </Container>

    <div className="grid grid-cols-5 gap-5">
      <div className="col-span-2 relative  aspect-square">
        <Image
          src="https://res.cloudinary.com/dnfqhy8di/image/upload/v1736067972/category_1_asp8dv.jpg"
          fill
          alt="something"
          className="object-contain rounded-4xl w-full "
        />
      </div>
      <div className="col-span-3 flex flex-col justify-between">
        <div className="flex-1 flex items-center">
          <Londrina className="text-8xl xl:text-9xl">
            Explore <br /> Categories
          </Londrina>
        </div>
        <div className="w-full ">
          <Swiper
            modules={[Autoplay]}
            loop
            grabCursor
            autoplay={{ delay: 1500, disableOnInteraction: false }}
            speed={800}
            slidesPerView={1}
            spaceBetween={16}
            breakpoints={{
              425: { slidesPerView: 1 },
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 3 },
              1440: { slidesPerView: 4 },
            }}
            className="w-full"
          >
            {items.map((item) => (
              <SwiperSlide key={item.id}>
                <div
                  className="flex justify-center items-center rounded-2xl"
                  style={{ background: item.background }}
                >
                  <div className="py-5 text-center">
                    <div className="aspect-square relative h-14 w-14 mx-auto mb-2">
                      <Image src={item.logo} fill alt={item.text} />
                    </div>
                    <p className="text-lg font-medium leading-[1.2] tracking-[0.03rem] text-[#3d4750] capitalize">
                      {item.text}
                    </p>
                    <p className="text-xs text-[#686e7d] leading-[25px] font-light tracking-[0.03rem]">
                      {item.count} items
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default ExploreCategoriesDesktop;
