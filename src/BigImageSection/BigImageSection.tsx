import { Heading } from "@/components/ui/Heading/Heading";

const BigImageSection = () => {
  return (
    <section className="section-banner-two overflow-hidden my-[50px] max-[1199px]:my-[35px] bg-[url('https://res.cloudinary.com/dnfqhy8di/image/upload/v1736068727/banner_ku4lel.jpg')] min-h-[600px] bg-no-repeat bg-cover bg-center max-[991px]:max-h-[400px] max-[991px]:min-h-[auto]">
      <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
        <div className="flex flex-wrap w-full">
          <div className="w-full px-[12px] banner-justify-box-contact h-[600px] flex justify-end items-end max-[991px]:h-[400px]">
            <div className="banner-two-box bg-white rounded-t-[30px] max-w-[400px] pt-[30px] px-[30px] flex flex-col items-start relative max-[991px]:max-w-[250px] max-[575px]:my-0 max-[575px]:mx-auto">
              <span className="text-[20px] font-semibold text-[#6c7fd8] leading-[26px] max-[991px]:text-[16px]">
                25% Off
              </span>
              <Heading className="font-quicksand mb-[20px] text-[40px] font-bold text-[#3d4750] tracking-[0.03rem] leading-[1.2] max-[991px]:text-[22px]">
                Fresh &amp; Organic vegetables
              </Heading>
              <a
                href="#"
                className="bb-btn-1 transition-all duration-[0.3s] ease-in-out font-Poppins leading-[28px] tracking-[0.03rem] py-[8px] px-[20px] max-[1199px]:py-[3px] max-[1199px]:px-[15px] text-[14px] font-normal text-[#3d4750] bg-transparent rounded-[10px] border border-solid border-[#3d4750] hover:bg-[#6c7fd8] hover:border-[#6c7fd8] hover:text-white"
              >
                Shop Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BigImageSection;
