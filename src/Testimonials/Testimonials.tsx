import Container from "@/components/ui/Container/Container";

import TestimonialsContainer from "./TestimonialCaontainer";
import TestimonialsCarusal from "./TestimonialsCarusal";

const Testimonials = () => {
  return (
    <Container>
      <div className="my-20">
        <div className="hidden lg:block">
          <TestimonialsContainer></TestimonialsContainer>
        </div>
        <div className="lg:hidden block">
          <TestimonialsCarusal></TestimonialsCarusal>
        </div>
      </div>
    </Container>
  );
};

export default Testimonials;
