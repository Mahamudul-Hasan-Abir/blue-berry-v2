import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const CartItem = () => {
  return (
    <Card className="w-full">
      <CardContent>
        <div className="grid grid-cols-12">
          <div className="col-span-7">
            <Image
              className="object-contain"
              height={100}
              width={100}
              src="https://res.cloudinary.com/dnfqhy8di/image/upload/v1747084630/your_folder_name/1747084626376-item-4.png.png"
              alt="juice"
            ></Image>
            <div>
              <p>Fruit Juice</p>
              <p>SKU#:34NU7</p>
            </div>
          </div>
          <div className="col-span-3 flex justify-center items-center">
            <div>+</div>
            <div>25</div>
            <div>-</div>
          </div>
          <div className="col-span-2 flex justify-center items-center">
            <p>$225</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CartItem;
