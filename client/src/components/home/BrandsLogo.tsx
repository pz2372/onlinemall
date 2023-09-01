const BrandsLogo = () => {
  const brandsLogo = [
    {
      id: 1,
      image: "./images/brands/nike.png",
    },
    {
      id: 2,
      image: "./images/brands/adidas.png",
    },
    {
      id: 3,
      image: "./images/brands/levis.png",
    },
    {
      id: 4,
      image: "./images/brands/puma.png",
    },
    {
      id: 5,
      image: "./images/brands/louis.png",
    },
  ];

  return (
    <div className="bg-grayBg">
      <div className="container mx-auto lg:w-10/12 w-11/12 py-[60px]">
        <div className="grid grid-cols-3 md:grid-cols-5 gap-10">
          {brandsLogo?.map((logo) => (
            <div key={logo.id} className="flex items-center justify-center">
              <img src={logo.image} alt="" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandsLogo;
