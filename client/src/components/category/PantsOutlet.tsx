import DashboardSliderCard from "../DashboardSliderCard";

type ItemType = {
  id: number;
  title: string;
  price: string;
  img: string;
};

type PantsOutletProps = {
  data?: ItemType[];
};

const PantsOutlet: React.FC<PantsOutletProps> = ({ data }) => {
  return (
    <div className="w-full grid grid-cols-2 lg:grid-cols-3 gap-8">
      {data?.map((item) => {
        const { id, img, price, title } = item;
        return (
          <DashboardSliderCard key={id} img={img} price={price} name={title} />
        );
      })}
    </div>
  );
};

export default PantsOutlet;
