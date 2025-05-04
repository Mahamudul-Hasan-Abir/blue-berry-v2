import { Heading } from "@/components/ui/Heading/Heading";
import Image from "next/image";

const HeroSeciton = () => {
  return (
    <section className="section-hero mt-5 mb-[50px] max-[1199px]:mb-[35px] py-[50px] relative bg-[#f8f8fb] overflow-hidden">
      <div className="bb-social-follow absolute left-[20px] bottom-[30px] max-[1250px]:hidden">
        <ul className="inner-links">
          {["Fb", "Li", "Dr", "In"].map((item) => (
            <li key={item} className="p-[6px] rotate-[270deg]">
              <a
                href="#"
                className="transition-all duration-300 ease-in-out font-Poppins text-[16px] font-medium text-[#777] hover:text-[#6c7fd8] leading-[28px] tracking-[0.03rem] uppercase"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
        <div className="flex flex-wrap w-full">
          <div className="w-full">
            {/* Replace this with Swiper React component */}
            <div className="flex flex-wrap w-full mb-[-24px]">
              <div className="min-[992px]:w-[50%] w-full px-[12px] min-[992px]:order-1 order-2 mb-[24px]">
                <div className="hero-contact h-full flex flex-col items-start justify-center max-[991px]:items-center">
                  <p className="mb-[20px] font-Poppins text-[18px] text-[#777] font-light leading-[28px] tracking-[0.03rem] max-[1199px]:mb-[10px] max-[1199px]:text-[16px]">
                    Flat 30% Off
                  </p>
                  <Heading className="mb-[20px] font-quicksand text-[50px] text-[#3d4750] font-bold tracking-[0.03rem] leading-[1.2] max-[1199px]:mb-[10px] max-[1199px]:text-[38px] max-[991px]:text-center max-[991px]:text-[45px] max-[767px]:text-[40px] max-[575px]:text-[35px] max-[420px]:text-[30px] max-[360px]:text-[28px]">
                    Explore{" "}
                    <span className="relative text-[#6c7fd8]">Organic</span>
                    <br />
                    &amp; Fresh Vegetables
                  </Heading>
                  <a
                    href="/shop-left-sidebar-col-3"
                    className="bb-btn-1 transition-all duration-300 ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] py-[8px] px-[20px] text-[14px] font-normal text-[#3d4750] bg-transparent rounded-[10px] border border-[#3d4750] max-[1199px]:py-[3px] max-[1199px]:px-[15px] hover:bg-[#6c7fd8] hover:border-[#6c7fd8] hover:text-white"
                  >
                    Shop Now
                  </a>
                </div>
              </div>

              <div className="min-[992px]:w-[50%] w-full px-[12px] min-[992px]:order-2 order-1 mb-[24px]">
                <div className="hero-image pr-[50px] relative max-[991px]:px-[50px] max-[575px]:px-[30px] flex justify-center max-[420px]:p-0">
                  <Image
                    src="https://res.cloudinary.com/dnfqhy8di/image/upload/v1736342063/hero-1_isrggd.png"
                    alt="hero"
                    width={1900}
                    height={1080}
                    className="w-full pb-[50px] opacity-100 max-[1199px]:pr-[30px] max-[991px]:pr-0 max-[575px]:pb-[30px] max-[420px]:pb-[15px]"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 300 300"
                    className="animate-shape w-[120%] absolute top-[-50px] right-[-50px] z-[-1] max-[1399px]:right-[-30px] max-[1199px]:w-[125%] max-[991px]:w-[100%] max-[991px]:top-0 max-[575px]:right-0 max-[420px]:w-[110%] max-[420px]:right-[-30px]"
                  >
                    <linearGradient
                      id="shape_3"
                      x1="80%"
                      x2="0%"
                      y1="80%"
                      y2="0%"
                    />
                    <path>
                      <animate
                        repeatCount="indefinite"
                        attributeName="d"
                        dur="15s"
                        values="M37.5,186c-12.1-10.5...z; M51,171.3c-6.1-17.7...z; M37.5,186c-12.1-10.5...z"
                      />
                    </path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSeciton;
