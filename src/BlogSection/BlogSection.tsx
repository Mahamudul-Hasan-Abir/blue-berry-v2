// import Container from "@/components/ui/Container/Container";
// import Image from "next/image";

// const BlogSection = () => {
//   const marketingData = [
//     {
//       img: "https://res.cloudinary.com/dnfqhy8di/image/upload/v1736069585/7_qxbuzg.jpg",
//       date: "June 30, 2024 - organic",
//       title: "Marketing Guide: 5 Steps to Success",
//     },
//     {
//       img: "https://res.cloudinary.com/dnfqhy8di/image/upload/v1736069586/8_fwahuc.jpg",
//       date: "June 30, 2024 - organic",
//       title: "Marketing Guide: 5 Steps to Success",
//     },
//     {
//       img: "https://res.cloudinary.com/dnfqhy8di/image/upload/v1736069588/10_vfl555.jpg",
//       date: "June 30, 2024 - organic",
//       title: "Marketing Guide: 5 Steps to Success",
//     },
//     {
//       img: "https://res.cloudinary.com/dnfqhy8di/image/upload/v1736069590/9_iyebdu.jpg",
//       date: "June 30, 2024 - organic",
//       title: "Marketing Guide: 5 Steps to Success",
//     },
//   ];

//   return (
//     <Container>
//       <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
//         {marketingData.map((item, index) => {
//           let visibilityClass = "";

//           // Show first card always
//           if (index === 0) {
//             visibilityClass = "block";
//           }
//           // Show second and third cards in md and up
//           else if (index === 1 || index === 2) {
//             visibilityClass = "hidden md:block";
//           }
//           // Show fourth card in lg only
//           else if (index === 3) {
//             visibilityClass = "hidden lg:block";
//           }

//           return (
//             <div
//               key={index}
//               className={`border relative rounded-3xl overflow-hidden aspect-square ${visibilityClass}`}
//             >
//               <div className="absolute inset-0">
//                 <Image
//                   src={item.img}
//                   alt={item.title}
//                   fill
//                   className="object-cover"
//                 />
//               </div>
//               <div className="bg-white rounded-3xl py-5 absolute bottom-2 w-[95%] right-2 opacity-70 text-center">
//                 <p className="text-lg">{item.date}</p>
//                 <h1 className="text-xl font-bold">{item.title}</h1>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </Container>
//   );
// };

// export default BlogSection;

import Container from "@/components/ui/Container/Container";
import Image from "next/image";

const BlogSection = () => {
  const marketingData = [
    {
      img: "https://res.cloudinary.com/dnfqhy8di/image/upload/v1736069585/7_qxbuzg.jpg",
      title: "Marketing Guide: 5 Steps to Success",
    },
    {
      img: "https://res.cloudinary.com/dnfqhy8di/image/upload/v1736069586/8_fwahuc.jpg",
      title: "Marketing Guide: 5 Steps to Success",
    },
    {
      img: "https://res.cloudinary.com/dnfqhy8di/image/upload/v1736069588/10_vfl555.jpg",
      title: "Marketing Guide: 5 Steps to Success",
    },
    {
      img: "https://res.cloudinary.com/dnfqhy8di/image/upload/v1736069590/9_iyebdu.jpg",
      title: "Marketing Guide: 5 Steps to Success",
    },
  ];

  // Get current date in the same format as your existing dates
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const dateString = `${currentDate} - organic`;

  return (
    <Container>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {marketingData.map((item, index) => {
          let visibilityClass = "";

          if (index === 0) {
            visibilityClass = "block";
          } else if (index === 1 || index === 2) {
            visibilityClass = "hidden md:block";
          } else if (index === 3) {
            visibilityClass = "hidden lg:block";
          }

          return (
            <div
              key={index}
              className={`border relative rounded-3xl overflow-hidden aspect-square ${visibilityClass}`}
            >
              <div className="absolute inset-0">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="bg-white rounded-3xl py-5 absolute bottom-2 w-[95%] right-2 opacity-70 text-center">
                <p className="text-sm">{dateString}</p>
                <h1 className="text-lg font-bold">{item.title}</h1>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default BlogSection;
