interface HeadingProps {
  title: string;
}

const Heading: React.FunctionComponent<HeadingProps> = ({ title }) => {
  return (
    <h1 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-themeBlackBold">
      {title}
    </h1>
  );
};

export default Heading;
