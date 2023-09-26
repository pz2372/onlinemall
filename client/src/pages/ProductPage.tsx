import { useParams } from "react-router-dom";
import SingleProduct from "../components/product/SingleProduct";

const ProductPage = () => {
  const params = useParams();
  const productId: string | undefined = params?.id;

  return <SingleProduct productId={productId} />;
};

export default ProductPage;
