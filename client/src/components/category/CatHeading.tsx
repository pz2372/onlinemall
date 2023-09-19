const CatHeading = () => {
  return (
    <div className="bg-navBG pt-24">
      <div className="container mx-auto lg:w-10/12 w-11/12 flex flex-col justify-center items-center gap-8 min-h-[40vh] lg:min-h-[55vh]">
        <img src="../images/nike-logo.png" alt="nike" />
        <p className="md:text-lg text-base text-categoryText">
          Nike is an athletic and sports brand. etc
        </p>
      </div>
    </div>
  );
};

export default CatHeading;
