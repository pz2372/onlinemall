import { ProductCardProps } from "../../types/props.type";
import { CancelIcon } from "../svgs/Cancel";
import styles from "./BucketCard.module.scss";
import placeholderImage from "../../assets/images/product-placeholder.jpg";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { addToCart, addToFavorites } from "../../redux/slice/ProductSlice";
import Button from "../button/Button";
import HeartIcon from "../svgs/HeartIcon";
import { toast } from "react-toastify";

const BucketCart = ({ product }: ProductCardProps) => {
  console.log("product", product);

  const dispatch: AppDispatch = useDispatch();
  const {
    _id,
    name,
    price,
    brand,
    images,
    selectedColor,
    selectedSize,
    quantity,
  } = product;

  const deleteProductFromBucket = () => {
    if (localStorage.productsInCart) {
      const products = JSON.parse(localStorage.productsInCart);
      const filteredProducts = products.filter(
        (elm: any) =>
          elm.id !== _id ||
          elm.color._id !== selectedColor?._id ||
          elm.size._id !== selectedSize?._id
      );
      localStorage.productsInCart = JSON.stringify(filteredProducts);
      dispatch(addToCart(filteredProducts));
    }
  };

  const handleAddToFavoritesClick = (productId: string) => {
    if (localStorage.favoritesIds) {
      const favoritesIds = JSON.parse(localStorage.favoritesIds);
      if (!favoritesIds.includes(productId)) {
        favoritesIds.push(productId);
        toast.success("Product added to your favorites", {
          autoClose: 2000,
        });
      } else {
        favoritesIds.splice(favoritesIds.indexOf(productId), 1);
      }
      localStorage.favoritesIds = JSON.stringify(favoritesIds);
      dispatch(addToFavorites(favoritesIds));
    } else {
      localStorage.favoritesIds = JSON.stringify([productId]);
      dispatch(addToFavorites([productId]));
      toast.success("Product added to your favorites", {
        autoClose: 2000,
      });
    }
  };

  const addDefaultSrc = (e: any) => {
    e.target.src = placeholderImage;
  };

  return (
    <div className={styles.bucket_cart}>
      <div className={styles.cart_img}>
        <img
          src={process.env.REACT_APP_S3_BUCKET_URL + "/" + images[0]}
          alt={name}
          onError={addDefaultSrc}
        />
      </div>
      <div className={styles.cart_content}>
        <div className={styles.price}>${price}</div>
        <div className={styles.product_name}>
          <b>{brand.name}</b> {name}
        </div>
        <div className={styles.product_info}>
          <div className={styles.color}>{selectedColor?.name}</div>
          <div>size: {selectedSize?.name}</div>
          <div>Qty: {quantity}</div>
        </div>
        <div>
          <Button
            variant="secondary"
            onClick={() => handleAddToFavoritesClick(product._id)}
          >
            <HeartIcon width="20px" height="20px" fill="#FF6D2E" />
            {localStorage.favoritesIds &&
            JSON.parse(localStorage.favoritesIds).includes(product._id)
              ? "Remove from favorites"
              : "Add to favorites"}
          </Button>
        </div>
      </div>
      <div className={styles.cancel_icon} onClick={deleteProductFromBucket}>
        <CancelIcon />
      </div>
    </div>
  );
};

export default BucketCart;
