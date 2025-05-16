import Container from "@/components/ui/Container/Container";
import BlogCard from "./BlogCard";

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
  {
    id: 4,
    image:
      "https://res.cloudinary.com/dnfqhy8di/image/upload/v1747352352/blog4_t9emdq.jpg",
    title: "Business ideas to grow your business.",
    details:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta ab illum maiores error neque amet rem quod consequuntur? Iste, rerum.",
  },
  {
    id: 5,
    image:
      "https://res.cloudinary.com/dnfqhy8di/image/upload/v1747352352/blog5_bjbzxu.jpg",
    title: "Marketing Guide: 5 Steps to Success.",
    details:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta ab illum maiores error neque amet rem quod consequuntur? Iste, rerum.",
  },
  {
    id: 6,
    image:
      "https://res.cloudinary.com/dnfqhy8di/image/upload/v1747352352/blog6_kauvfp.jpg",
    title: "31 customer stats know in 2019.",
    details:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dicta ab illum maiores error neque amet rem quod consequuntur? Iste, rerum.",
  },
];
const BlogPage = () => {
  return (
    <Container>
      <div className="my-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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
    </Container>
  );
};

export default BlogPage;
