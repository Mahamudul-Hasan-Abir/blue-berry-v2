import BreadCrumb from "@/Breadcrumb/Breadcrumb";
import CategoriesCarusal from "@/CategoriesCarusal/CategoriesCarusal";
import Container from "@/components/ui/Container/Container";
import { ProductCard } from "@/ProductCard/ProductCard";

interface Product {
  _id: string;
  name: string;
  price: number;
  sale_price: number;
  image: string;
  category: string;
}

const AllProducts = ({ products }: { products: Product[] }) => {
  return (
    <div>
      <BreadCrumb></BreadCrumb>
      <Container>
        <CategoriesCarusal></CategoriesCarusal>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              name={product.name}
              price={product.price}
              salePrice={product.sale_price}
              image={product.image}
              category={product.category} // provide actual category if available
              rating={4.5}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default AllProducts;
