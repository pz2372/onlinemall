import React from "react";

const Loader = () => {
  return (
    <div className="fixed left-0 top-0 w-full h-full bg-white/[.7] z-50 flex items-center justify-center">
      <div className="absolute right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2 ">
        <div className="border-t-transparent border-solid animate-spin rounded-full border-primary border-8 h-32 w-32"></div>
      </div>
      Loading...
    </div>
  );
};

export default Loader;
