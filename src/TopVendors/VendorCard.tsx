import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heading } from "@/components/ui/Heading/Heading";
import clsx from "clsx";

type VendorCardProps = {
  vendorName: string;
  description: string;
  focused?: boolean;
  onClick?: () => void;
};

const VendorCard = ({
  vendorName,
  description,
  focused,
  onClick,
}: VendorCardProps) => {
  return (
    <Card
      onClick={onClick}
      className={clsx(
        "w-full cursor-pointer border-[1px] border-accent rounded-4xl bg-secondary transition",
        focused && "ring-1 ring-primary"
      )}
    >
      <CardHeader>
        <CardTitle className="font-bold">
          <Heading className={clsx("text-lg", focused && "text-primary")}>
            {vendorName}
          </Heading>
        </CardTitle>
        <CardDescription className="text-start overflow-hidden text-ellipsis line-clamp-2 text-sm text-muted-foreground">
          {description}
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default VendorCard;
