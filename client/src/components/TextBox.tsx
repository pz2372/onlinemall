const TextBox = ({name}: any) => {
  return (
    <div className="flex items-center gap-3 p-5">
      <p className="text-categoryText md:text-base text-sm">{name}:</p>
      <input
        type="text"
        className="bg-transparent outline-none border border-dashboardBorder rounded-lg px-4 py-2 md:text-base text-sm"
      />
    </div>
  );
};

export default TextBox;
