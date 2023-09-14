import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductUpload from "../components/propductUpload/ProductUpload";
import UploadCategories from "../components/propductUpload/UploadCategories";
import { addProduct } from "../redux/slice/EditProductSlice";
import { Product } from "../redux/slice/EditProductSlice";

const BrandProductUpload = ({ onChange }: any, brand: string) => {
  const [category, setCategory] = useState("");
  const images = useSelector(
    (state: { uploadImg: string[] }) => state.uploadImg
  );
  const links = useSelector(
    (state: { uploadLink: string[] }) => state.uploadLink
  );
  const names = useSelector(
    (state: { uploadName: string[] }) => state.uploadName
  );
  const prices = useSelector(
    (state: { uploadPrice: string[] }) => state.uploadPrice
  );
  const products = useSelector(
    (state: { editProduct: Product[] }) => state.editProduct
  );
  const [numOfProducts, setNumOfProducts] = useState(0);
  const [numOfNewProducts, setNumOfNewProducts] = useState(0);
  const [row, setRow] = useState<React.ReactElement<any>[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const query = encodeURIComponent(
      JSON.stringify({ brand: brand, category: category })
    );
    const url = `./getDashboardProducts/data?json=${query}`;
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network error");
        }
        return response.json();
      })
      .then((data) => {
        for (var i = 0; i < data.length; i++) {
          dispatch(addProduct(data[i]));
        }
      })
      .catch((error) => {
        console.error("There was a problem getting product", error);
      });
  }, [category]);

  //Creates and updates each product
  useEffect(() => {
    var tempRow = [];

    for (var i = 0; i < products.length; i++) {
      tempRow[i] = (
        <ProductUpload
          key={i}
          index={i}
          img={products[i].images}
          link={products[i].link}
          name={products[i].name}
          price={products[i].price}
          onChange={onChange}
        />
      );
    }
    setRow(tempRow);
  }, [products]);

  const handleAddProduct = (event: any) => {
    dispatch(
      addProduct({
        key: numOfProducts + 1,
        name: "",
        price: 0,
        description: "",
        SKU: 0,
        link: "",
        images: [],
        brand: brand,
        category: category,
      })
    );
  };

  return (
    <>
      {/* Container */}
      <div className="container mx-auto lg:w-7/12 w-11/12 my-14">
        {/* Mens and womens dropdown */}
        <UploadCategories onChange={setCategory} />
        {/* Product Upload Cards */}
        {row}
        <div className="text-center md:mt-20 mt-14">
          {category && (
            <button
              className="px-6 py-3 md:text-base text-sm border border-categoryBorder rounded-lg"
              onClick={handleAddProduct}
            >
              Add A Product
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default BrandProductUpload;
