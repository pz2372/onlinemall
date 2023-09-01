interface BlogCardProps {
  title: string;
  content: string;
  img: string;
}

const BlogCard: React.FunctionComponent<BlogCardProps> = ({
  title,
  content,
  img,
}) => {
  return (
    <div className="w-full">
      <img src={img} alt="" className="w-full" />

      <p className="text-themeOrange pt-4 md:text-base text-sm">FASHION NEWS</p>

      <h2 className="text-themeBlackBold text-lg md:text-xl leading-[130%] font-semibold pt-2 pb-3">
        {title}
      </h2>

      <p className="text-dropdownText leading-[163%] md:text-base text-sm">
        {content}
      </p>
    </div>
  );
};

export default BlogCard;
