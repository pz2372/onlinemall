import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TProduct } from "../../types/products.type";
import { fetchProductsByIds } from "../../redux/slice/ProductSlice";
import Loader from "../../components/loader/Loader";
import BucketCart from "../../components/bucketCard/BucketCard";
import styles from "./Card.module.scss";
import Button from "../../components/button/Button";

const Card = () => {
  const dispatch: AppDispatch = useDispatch();
  const { productsInCart } = useSelector((state: RootState) => state.product);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<TProduct[]>([]);
  const [total, setTotal] = useState<number>(0);
  const productIds: Array<string> = [];

  const isCartEmpty = products.length === 0;

  useEffect(() => {
    if (productsInCart.length) {
      productsInCart.forEach((prod: any) => {
        productIds.push(prod.id);
      });

      setIsLoading(true);
      dispatch(fetchProductsByIds(productIds))
        .then((res: any) => {
          if (res.payload.data?.success) {
            const arr: any = [];
            productsInCart.forEach((p: any) => {
              res.payload.data.data.forEach((pr: any) => {
                if (pr._id === p.id) {
                  const newProduct = {
                    ...pr,
                    selectedColor: p.color,
                    selectedSize: p.size,
                    quantity: p.quantity,
                  };
                  arr.push(newProduct);
                }
              });
            });
            setProducts(arr);
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

  useEffect(() => {
    const totalSum = products.reduce((accumulator: number, object: any) => {
      return accumulator + object.price;
    }, 0);

    setTotal(totalSum);
  }, [productsInCart, products]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={styles.bucket_container}>
      <div className={styles.bucket}>
        <div className={styles.bucket_products}>
          <div className={styles.header}>
            <h3>My Bag</h3>
          </div>
          <div className={styles.products}>
            {products.length && !isLoading ? (
              <>
                {products.map((product: TProduct, index: number) => {
                  let prod = { ...product };
                  return <BucketCart key={index} product={prod} />;
                })}
              </>
            ) : (
              <div className="text-center text-[24px] italic opacity-[0.7]">
                No saved items...
              </div>
            )}
          </div>
        </div>
        <div className={styles.checkout}>
          <div>
            <div className={styles.header}>
              <h3>Total: ${total}</h3>
            </div>
            <hr />
            <div>
              {isCartEmpty ? (
                <Button variant="checkout-btn" disabled>
                  Checkout
                </Button>
              ) : (
                <Link
                  to="/checkout"
                  state={{
                    products: products,
                  }}
                >
                  <Button variant="checkout-btn">Checkout</Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
