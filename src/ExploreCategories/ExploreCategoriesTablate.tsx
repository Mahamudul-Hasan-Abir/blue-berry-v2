// "use client";
// import Image from "next/image";

// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay } from "swiper/modules";

// import "swiper/css";

// const items = [
//   {
//     id: 1,
//     logo: "https://res.cloudinary.com/dnfqhy8di/image/upload/v1736068103/2_n0vxhz.svg",
//     text: "Fruits",
//     count: "283",
//     background: "#e1fcf2",
//   },
//   {
//     id: 2,
//     logo: "https://res.cloudinary.com/dnfqhy8di/image/upload/v1736068103/3_hcemse.svg",
//     text: "Fruits",
//     count: "283",
//     background: "#f4f1fe",
//   },
//   {
//     id: 3,
//     logo: "https://res.cloudinary.com/dnfqhy8di/image/upload/v1736068103/4_nnhcex.svg",
//     text: "Fruits",
//     count: "283",
//     background: "#fbf9e4",
//   },
//   {
//     id: 4,
//     logo: "https://res.cloudinary.com/dnfqhy8di/image/upload/v1736068102/1_i8u7c6.svg",
//     text: "Fruits",
//     count: "283",
//     background: "#fef1f1",
//   },
// ];

// const ExploreCategories = () => {
//   return (
//     // <div className="bg-[#fef1f1] flex justify-center items-center rounded-2xl mx-3">
//     //   <div className=" py-5">
//     //     <div className="aspect-square relative h-14 w-14">
//     //       <Image
//     //         src="https://res.cloudinary.com/dnfqhy8di/image/upload/v1736068103/2_n0vxhz.svg"
//     //         fill
//     //         alt="carret"
//     //       ></Image>
//     //     </div>
//     //     <p className=" text-lg font-medium leading-[1.2] tracking-[0.03rem] text-[#3d4750] capitalize">
//     //       Fruits
//     //     </p>
//     //     <p className=" text-xs text-[#686e7d] leading-[25px] font-light tracking-[0.03rem]">
//     //       93 items
//     //     </p>
//     //   </div>
//     // </div>

//     <div className="w-full mx-3">
//       <Swiper
//         modules={[Autoplay]}
//         loop
//         grabCursor
//         autoplay={{ delay: 1500, disableOnInteraction: false }}
//         speed={2000}
//         slidesPerView={1}
//         spaceBetween={16}
//         breakpoints={{
//           640: { slidesPerView: 1 },
//           768: { slidesPerView: 2 },
//           1024: { slidesPerView: 4 },
//         }}
//         className="w-full"
//       >
//         {items.map((item) => (
//           <SwiperSlide key={item.id}>
//             <div
//               className={` bg-[${item.background}] flex justify-center items-center rounded-2xl`}
//             >
//               <div className=" py-5">
//                 <div className="aspect-square relative h-14 w-14">
//                   <Image src={item.logo} fill alt={item.text}></Image>
//                 </div>
//                 <p className=" text-lg font-medium leading-[1.2] tracking-[0.03rem] text-[#3d4750] capitalize">
//                   {item.text}
//                 </p>
//                 <p className=" text-xs text-[#686e7d] leading-[25px] font-light tracking-[0.03rem]">
//                   {item.count}
//                 </p>
//               </div>
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default ExploreCategories;

"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

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
];

const ExploreCategoriesTablate = () => {
  return (
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
          1024: { slidesPerView: 5 },
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
  );
};

export default ExploreCategoriesTablate;
