import Container from "@/components/ui/Container/Container";
import ExploreCategoriesTablate from "./ExploreCategoriesTablate";
import ExploreCategoriesDesktop from "./ExploreCategoriesDesktop";

const ExploreCategories = () => {
  return (
    <Container>
      <div className="block lg:hidden">
        <ExploreCategoriesTablate></ExploreCategoriesTablate>
      </div>
      <div className="hidden lg:block">
        <ExploreCategoriesDesktop></ExploreCategoriesDesktop>
      </div>
    </Container>
  );
};

export default ExploreCategories;
