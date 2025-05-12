// import Container from "@/components/ui/Container/Container";
// import FeatersCard from "./FeatersCard";

// const cardItemsArray = [
//   {
//     id: 1,
//     logo: "https://res.cloudinary.com/dnfqhy8di/image/upload/v1736068895/4_1_fkmnvk.png",
//     title: "Payment Secure",
//     description: "Contact us 24 hours a day, 7 days a week",
//   },
//   {
//     id: 2,
//     logo: "https://res.cloudinary.com/dnfqhy8di/image/upload/v1736068893/3_sza0cw.png",
//     title: "30 Days Return",
//     description: "Simply return it within 30 days for an exchange",
//   },
//   {
//     id: 3,
//     logo: "https://res.cloudinary.com/dnfqhy8di/image/upload/v1736068892/2_1_a4djkt.png",
//     title: "24x7 Support",
//     description: "Contact us 24 hours a day, 7 days a week",
//   },
//   {
//     id: 4,
//     logo: "https://res.cloudinary.com/dnfqhy8di/image/upload/v1736068891/1_hltvvr.png",
//     title: "Free Shipping",
//     description: "Free shipping on all Us order or above $20",
//   },
// ];

// const Featers = () => {
//   return (
//     <Container>
//       <div className="w-full grid grid-cols-4 gap-6">
//         {cardItemsArray.map((cardItem) => (
//           <div
//             key={cardItem.id}
//             className="col-span-4 md:col-span-2 lg:col-span-1"
//           >
//             <FeatersCard
//               logo={cardItem.logo}
//               title={cardItem.title}
//               description={cardItem.description}
//             ></FeatersCard>
//           </div>
//         ))}
//       </div>
//     </Container>
//   );
// };

// export default Featers;

import Container from "@/components/ui/Container/Container";
import FeatersCard from "./FeatersCard";

const cardItemsArray = [
  {
    id: 1,
    logo: "https://res.cloudinary.com/dnfqhy8di/image/upload/v1736068895/4_1_fkmnvk.png",
    title: "Payment Secure",
    description: "Contact us 24 hours a day, 7 days a week",
  },
  {
    id: 2,
    logo: "https://res.cloudinary.com/dnfqhy8di/image/upload/v1736068893/3_sza0cw.png",
    title: "30 Days Return",
    description: "Simply return it within 30 days for an exchange",
  },
  {
    id: 3,
    logo: "https://res.cloudinary.com/dnfqhy8di/image/upload/v1736068892/2_1_a4djkt.png",
    title: "24x7 Support",
    description: "Contact us 24 hours a day, 7 days a week",
  },
  {
    id: 4,
    logo: "https://res.cloudinary.com/dnfqhy8di/image/upload/v1736068891/1_hltvvr.png",
    title: "Free Shipping",
    description: "Free shipping on all Us order or above $20",
  },
];

const Featers = () => {
  return (
    <Container>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-10">
        {cardItemsArray.map((cardItem, index) => {
          let visibilityClass = "";

          if (index === 0) {
            visibilityClass = "block";
          } else if (index === 1) {
            visibilityClass = "hidden md:block";
          } else if (index >= 2) {
            visibilityClass = "hidden lg:block";
          }

          return (
            <div key={cardItem.id} className={`${visibilityClass}`}>
              <FeatersCard
                logo={cardItem.logo}
                title={cardItem.title}
                description={cardItem.description}
              />
            </div>
          );
        })}
      </div>
    </Container>
  );
};

export default Featers;
