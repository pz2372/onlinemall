import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import {
  addReviewToProduct,
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
  TProductRating,
  TProductReview,
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
import CommentIcon from "../svgs/CommentIcon";
// @ts-ignore
import ReactStars from "react-rating-stars-component";
import { TUser } from "../../types/users.type";
import { TAddReview, TUserState } from "../../types/redux.type";
import moment from "moment";
import AvatarIcon from "../svgs/AvatarIcon";

type TProductImage = {
  original: string;
  thumbnail: string;
};

type TSingleProductProps = {
  productId: string | undefined;
  hideReviews?: boolean;
};

type TProductInCart = {
  id: string;
  quantity: number;
  color: TProductColor;
  size: TProductSize;
};

const SingleProduct = ({ productId, hideReviews }: TSingleProductProps) => {
  const userState: TUserState = useSelector((state: RootState) => state.user);
  const userInfo: TUser | null = userState.userInfo;
  const { isLoading, isAddReviewLoading } = useSelector(
    (state: RootState) => state.product
  );
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
  const [reviewText, setReviewText] = useState<string>("");
  const [ratingValue, setRatingValue] = useState<number>(0);
  const [ratingKey, setRatingKey] = useState<number>(1);
  const [totalRatings, setTotalRatings] = useState<number>(0);

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
          (p: TProductInCart) =>
            p.id === productId &&
            p.color._id === selectedColor._id &&
            p.size._id === selectedSize._id
        );
        if (productIndex === -1) {
          products.push({
            id: productId,
            quantity: quantityValue,
            color: selectedColor,
            size: selectedSize,
          });
        } else {
          products[productIndex].quantity += quantityValue;
        }
        localStorage.productsInCart = JSON.stringify(products);
        dispatch(addToCart(products));
      } else {
        localStorage.productsInCart = JSON.stringify([
          {
            id: productId,
            quantity: quantityValue,
            color: selectedColor,
            size: selectedSize,
          },
        ]);
        dispatch(
          addToCart([
            {
              id: productId,
              quantity: quantityValue,
              color: selectedColor,
              size: selectedSize,
            },
          ])
        );
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

  const handleAddReviewClick = () => {
    if (ratingValue === 0) {
      toast.error("Please add a rating", {
        autoClose: 2000,
      });
    } else if (!reviewText) {
      toast.error("Please write your review", {
        autoClose: 2000,
      });
    } else {
      const data: TAddReview = {
        productId,
        user: userInfo?._id,
        ratingValue,
        reviewText,
      };
      dispatch(addReviewToProduct(data))
        .then((res: any) => {
          if (res.payload.data?.success) {
            setProduct(res.payload.data.data);
            setRatingValue(0);
            setReviewText("");
            setRatingKey(Math.floor(Math.random() * 100) + 1);
            toast.success(res.payload.data.message, {
              autoClose: 2000,
            });
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
            const sum = res.payload.data.data.ratings.reduce(
              (accumulator: number, object: TProductRating) => {
                return accumulator + object.rate;
              },
              0
            );
            let total =
              sum > 0 ? sum / res.payload.data.data.ratings.length : 0;
            setTotalRatings(Number(total.toFixed(1)));
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
            className="mb-5 cursor-pointer flex justify-between"
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
            <div title={`${totalRatings} OUT OF 5`}>
              <ReactStars
                count={5}
                size={24}
                activeColor="#FF6D2E"
                isHalf
                value={totalRatings}
                edit={false}
              />
            </div>
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

      {!hideReviews ? (
        <div className="my-20">
          <div className="border-b-[3px] border-primary border-solid">
            <h1 className="relative inline-flex items-center gap-2 m-0 py-0 text-white bg-primary h-[40px] leading-[40px] text-center px-[30px] text-xl before:content[''] before:absolute before:bottom-0 before:left-[100%] before:width-0 before:height-0 before:border-[20px] before:border-primary before:border-solid before:border-t-white before:border-r-white">
              <CommentIcon width="25px" height="25px" fill="#ffffff" />
              Reviews
            </h1>
          </div>

          {product.reviews.length ? (
            <>
              {product.reviews.map((review: TProductReview) => {
                return (
                  <div
                    key={review._id}
                    className="card bg-white flex p-6 rounded-md sm:flex-row flex-col-reverse self-center w-full shadow-2xl mt-6"
                  >
                    <div className="flex flex-col w-full">
                      <div className="flex flex-row mb-4 items-center flex-wrap">
                        {review.user.avatar ? (
                          <img
                            className="w-10 h-10 rounded-full mr-4"
                            src={
                              process.env.REACT_APP_S3_BUCKET_URL +
                              review.user.avatar
                            }
                            alt="avatar"
                          />
                        ) : (
                          <div className="rounded-full mr-4">
                            <AvatarIcon
                              width="40px"
                              height="40px"
                              fill="#000000"
                            />
                          </div>
                        )}
                        <h1 className="h-fit mr-4">{review.user.username}</h1>
                        {review.user._id === userInfo?._id ? (
                          <div className="bg-primary text-white px-2 py-[1px] text-sm rounded-sm mr-4">
                            you
                          </div>
                        ) : null}
                        <div className="h-fit min-h-fit opacity-60 flex-1">
                          {moment(review.createdAt).fromNow()}
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="opacity-70">{review.text}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </>
          ) : (
            <p className="opacity-70 mt-6 text-lg">No reviews yet...</p>
          )}

          {userInfo ? (
            <div className="mt-10">
              <div className="bg-white shadow-2xl p-6 rounded-md">
                <h1 className="text-2xl mb-6">Add a Review</h1>
                <div className="mb-2">
                  <p className="opacity-70">Your Rating</p>
                  <ReactStars
                    key={ratingKey}
                    count={5}
                    size={24}
                    activeColor="#FF6D2E"
                    value={ratingValue}
                    onChange={(val: number) => setRatingValue(val)}
                  />
                </div>
                <p className="opacity-70 mb-2">Your Review</p>
                <div className="flex items-start">
                  {userInfo?.avatar ? (
                    <img
                      className="w-10 h-10 rounded-full mr-4"
                      src={
                        process.env.REACT_APP_S3_BUCKET_URL + userInfo.avatar
                      }
                      alt="avatar"
                    />
                  ) : (
                    <div className="rounded-full mr-4">
                      <AvatarIcon width="40px" height="40px" fill="#000000" />
                    </div>
                  )}
                  <textarea
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="border-[1px] h-24 rounded-md resize-none w-full px-4 py-2 mr-4"
                    placeholder="Your review"
                  />
                </div>
                <div className="flex justify-center mt-6">
                  <Button
                    classNames="w-full sm:w-36"
                    variant="primary"
                    onClick={handleAddReviewClick}
                    disabled={isAddReviewLoading}
                  >
                    Send
                  </Button>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  ) : (
    <Loader />
  );
};

export default SingleProduct;
