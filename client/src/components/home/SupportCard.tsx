interface SupportCardPorps {
  img: string;
  heading: string;
  content: string;
}

const SupportCard: React.FC<SupportCardPorps> = ({ img, heading, content }) => {
  return (
    <div className="w-full flex items-center justify-center lg:gap-6 gap-4 lg:flex-row flex-col">
      <img src={img} alt="support" />

      {/* content */}
      <div className="lg:text-start text-center">
        <p className="text-xl lg:text-2xl font-bold text-themeBlackBold pb-2">
          {heading}
        </p>

        <span className="text-sm lg:text-[17px] text-placeholderColor">
          {content}
        </span>
      </div>
    </div>
  );
};

export default SupportCard;
