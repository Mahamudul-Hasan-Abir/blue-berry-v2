import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Container from "@/components/ui/Container/Container";
import { Heading } from "@/components/ui/Heading/Heading";
import Image from "next/image";

const accordianItems = [
  {
    id: 1,
    questions: "What is the multi vendor services?",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate sint atque pariatur cupiditate beatae voluptates quidem. Et tenetur autem itaque? Eum exercitationem assumenda enim eos voluptas. Ad incidunt laborum aliquam, expedita, voluptatibus quo id adipisci ea ratione ut, dignissimos natus?",
  },
  {
    id: 2,
    questions: "How to buy many products at a time?",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate sint atque pariatur cupiditate beatae voluptates quidem. Et tenetur autem itaque? Eum exercitationem assumenda enim eos voluptas. Ad incidunt laborum aliquam, expedita, voluptatibus quo id adipisci ea ratione ut, dignissimos natus?",
  },
  {
    id: 3,
    questions: "Refund policy for customer",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate sint atque pariatur cupiditate beatae voluptates quidem. Et tenetur autem itaque? Eum exercitationem assumenda enim eos voluptas. Ad incidunt laborum aliquam, expedita, voluptatibus quo id adipisci ea ratione ut, dignissimos natus?",
  },
  {
    id: 4,
    questions: "Exchange policy for customer",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate sint atque pariatur cupiditate beatae voluptates quidem. Et tenetur autem itaque? Eum exercitationem assumenda enim eos voluptas. Ad incidunt laborum aliquam, expedita, voluptatibus quo id adipisci ea ratione ut, dignissimos natus?",
  },
  {
    id: 5,
    questions: "Give a way products available",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate sint atque pariatur cupiditate beatae voluptates quidem. Et tenetur autem itaque? Eum exercitationem assumenda enim eos voluptas. Ad incidunt laborum aliquam, expedita, voluptatibus quo id adipisci ea ratione ut, dignissimos natus?",
  },
  {
    id: 6,
    questions: "Exchange policy for customer",
    answer:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate sint atque pariatur cupiditate beatae voluptates quidem. Et tenetur autem itaque? Eum exercitationem assumenda enim eos voluptas. Ad incidunt laborum aliquam, expedita, voluptatibus quo id adipisci ea ratione ut, dignissimos natus?",
  },
];

const AboutUs = () => {
  return (
    <Container>
      <Heading className="text-center mt-20 text-3xl">
        Frequently Asked <span className="text-primary">Questions</span>
      </Heading>
      <p className="text-center mt-5">Customer service management.</p>

      <div className="mt-10 grid md:grid-cols-3 gap-10 items-center">
        <div className="relative col-span-3 xl:col-span-1 flex justify-center">
          <Image
            src="https://res.cloudinary.com/dnfqhy8di/image/upload/v1746999401/vendor-4_mlhtol.jpg"
            alt="women"
            width={500}
            height={500}
            className="rounded-xl shadow-md"
          />
        </div>
        <div className="col-span-3 xl:col-span-2">
          {accordianItems.map((item) => (
            <Accordion
              key={item.id}
              type="single"
              collapsible
              className="border-[1px] border-accent rounded-2xl my-6 px-5"
            >
              <AccordionItem value={`item-${item.id}`}>
                <AccordionTrigger className="text-lg">
                  {" "}
                  {item.questions}
                </AccordionTrigger>
                <AccordionContent>{item.answer}</AccordionContent>
              </AccordionItem>
            </Accordion>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default AboutUs;
