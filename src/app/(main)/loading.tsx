import Image from "next/image";

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="relative w-32 h-32">
        {/* Logo in the center */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <Image
            src="https://res.cloudinary.com/dnfqhy8di/image/upload/v1747350198/blueberrylogo_1_rzof8b.png"
            alt="Logo"
            width={50}
            height={50}
          />
        </div>

        {/* Spinner circle */}
        <div className="absolute inset-0 border-4 border-t-primary border-r-transparent border-t-primary border-l-transparent rounded-full animate-spin" />
      </div>
    </div>
  );
};

export default LoadingSpinner;
