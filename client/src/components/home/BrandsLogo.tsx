import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { TBrandState } from "../../types/redux.type";

const BrandsLogo = () => {
  const brandState: TBrandState = useSelector(
    (state: RootState) => state.brand
  );
  const brands = brandState.brands;

  return (
    <div className="bg-grayBg">
      <div className="container mx-auto lg:w-10/12 w-11/12 py-[60px]">
        <div className="grid grid-cols-3 md:grid-cols-5 gap-10">
          {brands?.map((brand) => (
            <div key={brand._id} className="flex items-center justify-center">
              <img
                src={`${process.env.REACT_APP_S3_BUCKET_URL}/${brand.logo}`}
                alt={brand.name}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandsLogo;
