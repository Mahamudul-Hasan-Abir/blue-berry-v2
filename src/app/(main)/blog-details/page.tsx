import Container from "@/components/ui/Container/Container";
import { Heading } from "@/components/ui/Heading/Heading";
import Image from "next/image";
import BlogCard from "../blog/BlogCard";
import BreadCrumb from "@/Breadcrumb/Breadcrumb";
const BlogsArray = [
  {
    id: 1,
    image:
      "https://res.cloudinary.com/dnfqhy8di/image/upload/v1747351112/blog1_ylpcvd.jpg",
    title: "Marketing Guide: 5 Steps to Success.",
    details:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta ab illum maiores error neque amet rem quod consequuntur? Iste, rerum.",
  },
  {
    id: 2,
    image:
      "https://res.cloudinary.com/dnfqhy8di/image/upload/v1747351112/blog3_u5ju8p.jpg",
    title: "Best way to solve business deal issue.",
    details:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta ab illum maiores error neque amet rem quod consequuntur? Iste, rerum.",
  },
  {
    id: 3,
    image:
      "https://res.cloudinary.com/dnfqhy8di/image/upload/v1747351112/blog2_fedlpk.jpg",
    title: "31 customer stats know in 2019.",
    details:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta ab illum maiores error neque amet rem quod consequuntur? Iste, rerum.",
  },
];
const BlogDetailsPage = () => {
  return (
    <Container>
      <BreadCrumb></BreadCrumb>
      <div className="space-y-6 mt-20">
        {/* Hero Image */}
        <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] rounded-xl overflow-hidden">
          <Image
            src="https://res.cloudinary.com/dnfqhy8di/image/upload/v1747352649/one_nug6bu.jpg"
            alt="blog image"
            fill
            className="object-cover w-full h-full"
            priority
          />
        </div>

        {/* Title */}
        <Heading className="text-2xl md:text-3xl font-bold">
          Marketing Guide: 5 Steps to Success.
        </Heading>

        {/* Main Content */}
        <p className="text-gray-700 leading-relaxed text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis
          inventore fuga at iure voluptate, laudantium commodi officiis
          provident facere quis quae, laboriosam ducimus nihil molestiae vel
          beatae numquam assumenda dicta modi. Mollitia soluta ipsa cum
          pariatur! Obcaecati similique amet fuga minima vitae corporis odio
          eius tenetur repudiandae quaerat maiores quo officia, sunt, ab omnis
          id soluta explicabo quas? Quasi nam, inventore voluptas tempore ex
          modi consequuntur reiciendis enim, molestias labore neque! A nostrum
          necessitatibus dolorem sequi earum inventore labore error. Lorem ipsum
          dolor sit amet consectetur adipisicing elit. Quibusdam harum
          inventore, ipsa velit, laudantium perspiciatis exercitationem
          veritatis, molestiae magnam voluptatibus suscipit accusamus fuga
          veniam laborum cumque vitae cum? Cumque, aliquid.
        </p>

        {/* Image Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative w-full h-64 rounded-lg overflow-hidden">
            <Image
              src="https://res.cloudinary.com/dnfqhy8di/image/upload/v1747351112/blog2_fedlpk.jpg"
              alt="blog image small"
              fill
              className="object-cover w-full h-full"
            />
          </div>
          <div className="relative w-full h-64 rounded-lg overflow-hidden">
            <Image
              src="https://res.cloudinary.com/dnfqhy8di/image/upload/v1747352352/blog4_t9emdq.jpg"
              alt="blog image small"
              fill
              className="object-cover w-full h-full"
            />
          </div>
        </div>

        {/* More Content */}
        <p className="text-gray-700 leading-relaxed text-base">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis
          inventore fuga at ducimus nihil molestiae vel beatae numquam assumenda
          dicta modi. Mollitia soluta ipsa repudiandae quaerat maiores quo
          officia, sunt, ab omnis id soluta explicabo quas? Quasi nam, inventore
          voluptas tempore ex modi consequuntur reiciendis enim, molestias
          labore neque! A nostrum necessitatibus dolorem sequi earum inventore
          labore error. Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Quibusdam harum inventore, ipsa suscipit accusamus fuga veniam laborum
          cumque vitae cum? Cumque, aliquid.
        </p>
      </div>
      <div className="my-20">
        <Heading className=" text-center my-10">
          Related <span className="text-primary">Blogs</span>
        </Heading>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {BlogsArray.map((blogData) => (
            <div key={blogData.id}>
              <BlogCard
                image={blogData.image}
                title={blogData.title}
                details={blogData.details}
              ></BlogCard>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default BlogDetailsPage;
