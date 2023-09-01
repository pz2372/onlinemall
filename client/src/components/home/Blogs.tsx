import { NavLink } from "react-router-dom";
import Heading from "./Heading";
import BlogCard from "./BlogCard";

const Blogs = () => {
  // blogs data
  const blogsData = [
    {
      id: 1,
      img: "./images/blog-1.png",
      title: "Helena Bonham Carter Steps Out in This Season's Blog",
      content:
        "Did we think we'd ever see the meme-like pointy-toe sneaker ever go from the runway?",
    },
    {
      id: 2,
      img: "./images/blog-2.png",
      title: "Helena Bonham Carter Steps Out in This Season's Blog",
      content:
        "Did we think we'd ever see the meme-like pointy-toe sneaker ever go from the runway?",
    },
    {
      id: 3,
      img: "./images/blog-3.png",
      title: "Helena Bonham Carter Steps Out in This Season's Blog",
      content:
        "Did we think we'd ever see the meme-like pointy-toe sneaker ever go from the runway?",
    },
  ];

  return (
    <div className="container mx-auto lg:w-10/12 w-11/12">
      <div className="lg:pb-32 pb-16">
        {/* heading */}
        <div className="flex items-center justify-between">
          <Heading title="Recent Blog" />
          <NavLink to="/">
            <button className="text-themeBlackBold md:text-base text-sm py-3 px-6 border border-categoryBorder rounded-lg">
              See All
            </button>
          </NavLink>
        </div>

        {/* Blog Cards */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
          {/* card */}
          {blogsData?.map((blog) => {
            const { content, id, title, img } = blog;

            return (
              <BlogCard img={img} key={id} content={content} title={title} />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
