import ProjectUploadCard from "./ProjectUploadCard";

const UploadProductsContainer = () => {
  return (
    <div className="py-8 md:py-16">
      {/* Cards*/}
      <ProjectUploadCard key="card-1" />
      <ProjectUploadCard key="card-2" />
      <ProjectUploadCard key="card-3" />
      <ProjectUploadCard key="card-4" />
      <ProjectUploadCard key="card-5" />
      <ProjectUploadCard key="card-6" />

    </div>
  );
};

export default UploadProductsContainer;
