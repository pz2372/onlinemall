import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import {
  fetchProductById,
  fetchProductsByIds,
} from "../../redux/slice/ProductSlice";
import Loader from "../../components/loader/Loader";
import { TProduct, TProductRating } from "../../types/products.type";
import ProductCard from "../../components/productCard/ProductCard";

const Favorites = () => {
  const dispatch: AppDispatch = useDispatch();
  const { favorites } = useSelector((state: RootState) => state.product);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<TProduct[]>([]);

  useEffect(() => {
    if (favorites.length) {
      setIsLoading(true);
      dispatch(fetchProductsByIds(favorites))
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
  }, [favorites]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full">
      <div className="bg-[#eee] px-5 py-32 font-bold flex justify-center text-[#2d2d2d] text-[30px]">
        Saved Items
      </div>
      <div className="container mx-auto my-20 lg:w-10/12 w-11/12">
        {products.length && !isLoading ? (
          <div className={`grid grid-cols-5 gap-2`}>
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
  );
};

export default Favorites;
