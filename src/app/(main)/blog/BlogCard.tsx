import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heading } from "@/components/ui/Heading/Heading";
import Image from "next/image";
import Link from "next/link";

const BlogCard = ({
  image,
  title,
  details,
}: {
  image: string;
  title: string;
  details: string;
}) => {
  return (
    <Card className="overflow-hidden rounded-xl shadow-none py-0">
      <CardContent className="p-0">
        <div className="w-full">
          {/* Image */}
          <div className="relative w-full h-[250px] sm:h-[160px] md:h-[160px] lg:h-[160px] xl:h-[250px] overflow-hidden">
            <Image
              src={image}
              alt={title}
              fill
              priority
              className="object-cover w-full h-full"
            />
          </div>

          {/* Content */}
          <div className="p-5">
            <Heading className="text-lg md:text-xl font-semibold">
              {title}
            </Heading>
            <p className="my-3 text-sm text-gray-700">{details}</p>
            <Link href="/blog-details">
              <Button variant="default" type="button">
                See Details
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BlogCard;
