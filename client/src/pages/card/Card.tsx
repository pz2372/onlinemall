import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { TProduct, TProductRating } from "../../types/products.type";
import { fetchProductsByIds } from "../../redux/slice/ProductSlice";
import Loader from "../../components/loader/Loader";
import ProductCard from "../../components/productCard/ProductCard";
import styles from "./Card.module.scss";

const Card = () => {
  const dispatch: AppDispatch = useDispatch();
  const { productsInCart } = useSelector((state: RootState) => state.product);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<TProduct[]>([]);

  useEffect(() => {
    if (productsInCart.length) {
      console.log("productsInCart", productsInCart);

      setIsLoading(true);
      dispatch(fetchProductsByIds(productsInCart))
        .then((res: any) => {
          if (res.payload.data?.success) {
            setProducts(res.payload.data.data);
            setIsLoading(false);
          }
        })
        .catch((err: any) => {
          console.error("err", err);
        });
    } else {
      setProducts([]);
      setIsLoading(false);
    }
  }, [productsInCart]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div>
        <div>
          <h3>My Bag</h3>
        </div>
        <div>
          {products.length && !isLoading ? (
            <div>
              {products.map((product: TProduct) => {
                let prod = { ...product };
                const sum = prod.ratings.reduce(
                  (accumulator: number, object: TProductRating) => {
                    return accumulator + object.rate;
                  },
                  0
                );
                let total = sum > 0 ? sum / prod.ratings.length : 0;
                prod.totalRatings = Number(total.toFixed(1));
                return <ProductCard key={prod._id} product={prod} />;
              })}
            </div>
          ) : (
            <div className="text-center text-[24px] italic opacity-[0.7]">
              No saved items...
            </div>
          )}
        </div>
      </div>
      <div>checkout</div>
    </div>
  );
};

export default Card;
