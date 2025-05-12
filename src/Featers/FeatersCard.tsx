import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heading } from "@/components/ui/Heading/Heading";
import Image from "next/image";

type FeaturesCardProps = {
  logo: string;
  title: string;
  description: string;
};

const FeaturesCard = ({ logo, title, description }: FeaturesCardProps) => {
  return (
    <Card className="w-full shadow-none border-[1px] border-accent rounded-2xl">
      <CardContent className="flex justify-center items-center">
        <div className="relative w-12 h-12 mb-4">
          <Image src={logo} alt={title} fill />
        </div>
      </CardContent>
      <CardHeader className="text-center">
        <CardTitle className="font-bold">
          <Heading className="text-[18px]">{title}</Heading>
        </CardTitle>
        <CardDescription className="h-[48px] overflow-hidden text-ellipsis line-clamp-2 text-sm text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default FeaturesCard;
