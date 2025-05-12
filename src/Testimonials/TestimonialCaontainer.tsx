import Image from "next/image";
import TestimonialsCarusal from "./TestimonialsCarusal";

import { Londrina_Outline } from "next/font/google";
const quicksand = Londrina_Outline({
  subsets: ["latin"],
  weight: "400",
});

const TestimonialsSection = () => {
  return (
    <section className="section-testimonials  py-24 max-[1199px]:py-16 max-[991px]:p-[0]">
      <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
        <div className="flex flex-wrap w-full">
          <div className="w-full px-[12px]">
            <div
              className="bb-testimonials relative"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-delay="400"
            >
              {/* Decorative small images */}
              <Image
                src="https://res.cloudinary.com/dnfqhy8di/image/upload/v1736069030/img-1_cvgtkh.png"
                alt="testimonials-1"
                width={70}
                height={70}
                className="testimonials-img-1 z-[-1] h-16 w-16 absolute top-[0] left-[25px] rounded-[20px] rotate-[-10deg] max-[1399px]:h-[60px] max-[1399px]:w-[60px] max-[1399px]:left-[10px] max-[1199px]:hidden"
              />
              <Image
                src="https://res.cloudinary.com/dnfqhy8di/image/upload/v1736069035/img-5_zqlla3.png"
                alt="testimonials-2"
                width={50}
                height={50}
                className="testimonials-img-2 z-[-1] h-12 w-12 absolute bottom-[0] left-[0] rounded-[15px] rotate-[15deg] blur-[3px] max-[1199px]:hidden"
              />
              <Image
                src="https://res.cloudinary.com/dnfqhy8di/image/upload/v1736069034/img-4_egelqj.png"
                alt="testimonials-3"
                width={60}
                height={60}
                className="testimonials-img-3 z-[-1] h-14 w-14 absolute top-[-50px] right-[500px] rounded-[20px] rotate-[-30deg] blur-[3px] max-[991px]:hidden"
              />
              <Image
                src="https://res.cloudinary.com/dnfqhy8di/image/upload/v1736069032/img-3_zezpwe.png"
                alt="testimonials-4"
                width={60}
                height={60}
                className="testimonials-img-4 z-[-1] h-14 w-14 absolute top-[40px] right-[250px] rounded-[20px] rotate-[15deg] max-[1399px]:top-[20px] max-[991px]:hidden"
              />
              <Image
                src="https://res.cloudinary.com/dnfqhy8di/image/upload/v1736069031/img-2_echgpg.png"
                alt="testimonials-5"
                width={70}
                height={70}
                className="testimonials-img-5 z-[-1] h-20 w-20 absolute top-[0] right-[20px] rounded-[20px] blur-[3px] max-[991px]:hidden"
              />
              <Image
                src="https://res.cloudinary.com/dnfqhy8di/image/upload/v1736069036/img-6_uzedim.png"
                alt="testimonials-6"
                width={60}
                height={60}
                className="testimonials-img-6 z-[-1] h-[60px] w-[60px] absolute bottom-[30px] right-[100px] rounded-[20px] rotate-[-25deg] max-[1399px]:h-[50px] max-[1399px]:w-[50px] max-[1399px]:right-[50px] max-[1199px]:right-[0] max-[991px]:hidden"
              />

              {/* Rotated banner text */}
              <div className="inner-banner rotate-[270deg] absolute top-[0] z-[-1] left-[150px] bottom-[0] max-[1399px]:left-[110px] max-[1199px]:left-[30px] max-[991px]:hidden">
                <h4
                  className={`${quicksand.className} tracking-[0.03rem] text-gray-400 text-5xl font-bold leading-[1.2] max-[1399px]:text-[38px] max-[1199px]:text-[34px]`}
                >
                  Testimonials
                </h4>
              </div>

              {/* Carousel component */}
              <div className="max-w-[800px] mx-auto">
                <TestimonialsCarusal />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
