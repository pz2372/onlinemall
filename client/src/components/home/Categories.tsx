const Categories = () => {
  const cardData = [
    {
      id: 1,
      pic: "./images/man-hoodie.png",
    },
    {
      id: 2,
      pic: "./images/dresses.png",
    },
    {
      id: 3,
      pic: "./images/jacket.png",
    },
    {
      id: 4,
      pic: "./images/shorts.png",
    },
  ];

  return (
    <div className="container mx-auto lg:w-10/12 w-11/12">
      <div className="w-full grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 lg:py-32 py-20">
        {/* Cards */}
        {cardData?.map((item) => (
          <div className="w-full" key={item.id}>
            <img src={item.pic} alt="hoodie" className="w-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
