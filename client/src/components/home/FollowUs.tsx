const FollowUs = () => {
  return (
    <div className="container mx-auto lg:w-10/12 w-11/12 lg:py-32 py-20">
      <div className="flex justify-between gap-6 md:flex-row flex-col">
        <div className="bg-black md:w-60 md:h-60 w-full rounded-lg p-6">
          <h2 className="font-bold text-3xl leading-[118%] text-white">
            Follow us Instagram
          </h2>

          <p className="text-sm leading-[154%] text-followText my-5">
            Come experience our clothes and consult.
          </p>

          <h2 className="font-bold text-xl leading-[128%] text-white">@Logo</h2>
        </div>
        <div className="md:w-60 md:h-60 w-full overflow-hidden rounded-lg">
          <img
            src="./images/follow-1.png"
            alt="image"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:w-60 md:h-60 w-full overflow-hidden rounded-lg">
          <img
            src="./images/follow-2.png"
            alt="image"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:w-60 md:h-60 w-full overflow-hidden rounded-lg">
          <img
            src="./images/follow-3.png"
            alt="image"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:w-60 md:h-60 w-full overflow-hidden rounded-lg">
          <img
            src="./images/follow-4.png"
            alt="image"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default FollowUs;
