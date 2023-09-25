import { TBrandHeroSectonProps } from "../../types/props.type";

const BrandHeroSecton = ({ brand }: TBrandHeroSectonProps) => {
  return (
    <div className="bg-navBG">
      <div className="container mx-auto lg:w-10/12 w-11/12 flex flex-col justify-center items-center gap-8 py-20">
        <img
          src={`${process.env.REACT_APP_S3_BUCKET_URL}${brand?.logo}`}
          alt={brand?.name}
        />
        <p className="md:text-lg text-base text-categoryText">
          {brand?.description}
        </p>
      </div>
    </div>
  );
};

export default BrandHeroSecton;
