"use client";

import Container from "@/components/ui/Container/Container";
import { Heading } from "@/components/ui/Heading/Heading";

const AdminPage = () => {
  return (
    <Container>
      <div className="bg-primary h-40 flex justify-center items-center mt-10 rounded-2xl">
        <Heading className="text-white text-center">
          Welcome to Blue Berry Admin Dashboard!!!
        </Heading>
      </div>
    </Container>
  );
};

export default AdminPage;
