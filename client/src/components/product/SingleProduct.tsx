import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  addToFavorites,
  fetchProductById,
} from "../../redux/slice/ProductSlice";
import { toast } from "react-toastify";
import Loader from "../../components/loader/Loader";
import styles from "../../components/product/product.module.scss";
import {
  TProduct,
  TProductColor,
  TProductSize,
} from "../../types/products.type";
import ImageGallery from "react-image-gallery";
import Button from "../../components/button/Button";
import BagIcon from "../../components/svgs/BagIcon";
import HeartIcon from "../../components/svgs/HeartIcon";
import ShareIcon from "../../components/svgs/ShareIcon";
import { useWindowSize } from "../../hooks/useWindowSize";
import { useNavigate } from "react-router-dom";
import { toggleQuickviewPopup } from "../../redux/slice/PopupSlice";

type TProductImage = {
  original: string;
  thumbnail: string;
};

type TSingleProductProps = {
  productId: string | undefined;
};

type TProductInCart = {
  id: string;
  quantity: number;
};

const SingleProduct = ({ productId }: TSingleProductProps) => {
  const { isLoading } = useSelector((state: RootState) => state.product);
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const [width] = useWindowSize();
  const [product, setProduct] = useState<TProduct>();
  const [productImages, setProductImages] = useState<TProductImage[]>([]);
  const [filteredProductImages, setFilteredProductImages] = useState<
    TProductImage[]
  >([]);
  const [selectedColor, setSelectedColor] = useState<TProductColor>();
  const [selectedSize, setSelectedSize] = useState<TProductSize>();
  const [quantityValue, setQuantityValue] = useState<number>(1);

  const handleIncrement = () => {
    if (quantityValue >= 10) return;
    setQuantityValue(quantityValue + 1);
  };

  const handleDecrement = () => {
    if (quantityValue <= 1) return;
    setQuantityValue(quantityValue - 1);
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

  const handleAddToCartClick = (productId: string) => {
    if (selectedColor && selectedSize) {
      if (localStorage.productsInCart) {
        const products = JSON.parse(localStorage.productsInCart);
        const productIndex = products.findIndex(
          (p: TProductInCart) => p.id === productId
        );
        if (productIndex === -1) {
          products.push({ id: productId, quantity: quantityValue });
        } else {
          products[productIndex].quantity += quantityValue;
        }
        localStorage.productsInCart = JSON.stringify(products);
        dispatch(addToCart(products));
      } else {
        localStorage.productsInCart = JSON.stringify([
          { id: productId, quantity: quantityValue },
        ]);
        dispatch(addToCart([{ id: productId, quantity: quantityValue }]));
      }
      toast.success("Product is in your cart", {
        autoClose: 2000,
      });
    } else {
      if (!selectedColor) {
        toast.error("Please select a color", {
          autoClose: 2000,
        });
      } else if (!selectedSize) {
        toast.error("Please select a size", {
          autoClose: 2000,
        });
      }
    }
  };

  useEffect(() => {
    if (productId) {
      dispatch(fetchProductById(productId))
        .then((res: any) => {
          if (res.payload.data?.success) {
            const images: TProductImage[] = [];
            res.payload.data.data.images.forEach((image: string) => {
              images.push({
                original: process.env.REACT_APP_S3_BUCKET_URL + image,
                thumbnail: process.env.REACT_APP_S3_BUCKET_URL + image,
              });
            });
            setProduct(res.payload.data.data);
            setProductImages(images);
            setFilteredProductImages(images);
          } else {
            toast.error(res.payload.message || res.payload);
          }
        })
        .catch((err) => {
          toast.error(err.message, {
            autoClose: 2000,
          });
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedColor) {
      let images = [...productImages];
      images = images.filter((image: TProductImage) =>
        image.original.includes(selectedColor.name)
      );
      setFilteredProductImages(images);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedColor]);

  return !isLoading && product ? (
    <div className="container mx-auto my-20 lg:w-10/12 w-11/12">
      <div className={styles.productPageGrid}>
        <div>
          <ImageGallery
            thumbnailPosition={width > 576 ? "left" : "bottom"}
            items={filteredProductImages}
            showPlayButton={false}
            lazyLoad
          />
        </div>
        <div>
          <div
            className="mb-5 cursor-pointer inline-flex"
            onClick={() => {
              dispatch(
                toggleQuickviewPopup({ show: false, productId: undefined })
              );
              navigate(`/brand/${product.brand._id}`);
            }}
          >
            <img
              className="w-auto h-[50px]"
              src={`${process.env.REACT_APP_S3_BUCKET_URL}${product?.brand.logo}`}
              alt={product?.brand.name}
            />
          </div>
          <h1 className="text-2xl font-bold mb-1">{product?.name}</h1>
          <p className="mb-1 font-sm text-[#636363]">{product?.description}</p>
          <p className="font-bold mb-5">${product?.price}</p>
          <div className="mb-5">
            <p className="mb-3">
              Color:
              <span className="font-bold ml-2">{selectedColor?.name}</span>
            </p>
            <div className="flex items-center gap-4">
              {product?.colors.map((color: TProductColor) => {
                return (
                  <div
                    key={color._id}
                    className={`p-1 border-2 border-solid rounded-full hover:border-primary cursor-pointer ${
                      color._id === selectedColor?._id
                        ? "border-primary"
                        : "border-[#e0ded7]"
                    }`}
                    onClick={() => setSelectedColor(color)}
                  >
                    <div
                      className={`w-[30px] h-[30px] rounded-full`}
                      style={{
                        backgroundColor: color.hex,
                      }}
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mb-5">
            <p className="mb-3">
              Size:
              <span className="font-bold ml-2">{selectedSize?.name}</span>
            </p>
            <div className="flex items-center gap-4">
              {product?.sizes.map((size: TProductSize) => {
                return (
                  <div
                    key={size._id}
                    className={`flex justify-center items-center text-sm w-[40px] h-[40px] rounded-full cursor-pointer ${
                      size._id === selectedSize?._id
                        ? "bg-primary text-white"
                        : "bg-[#f5f4f2] text-black"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size.name}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className={styles.inputNumber}>
              <button type="button" onClick={handleDecrement}>
                &minus;
              </button>
              <span>{quantityValue}</span>
              <button type="button" onClick={handleIncrement}>
                &#43;
              </button>
            </div>
            <div>
              <Button
                variant="primary"
                onClick={() => handleAddToCartClick(product._id)}
              >
                <BagIcon width="20px" height="20px" fill="#ffffff" />
                Add to cart
              </Button>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-4">
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
            <Button variant="secondary">
              <ShareIcon width="20px" height="20px" fill="#FF6D2E" />
              Share
            </Button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default SingleProduct;
