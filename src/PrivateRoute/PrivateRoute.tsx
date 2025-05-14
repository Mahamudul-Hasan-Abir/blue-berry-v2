import Cart from "@/app/(main)/cart/page";
import AuthBlocker from "./AuthBlocker";

const PrivateRoute = () => {
  return (
    <AuthBlocker>
      <Cart></Cart>
    </AuthBlocker>
  );
};

export default PrivateRoute;
