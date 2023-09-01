import DashboardSliderCard from "../DashboardSliderCard";

type ItemType = {
  id: number;
  title: string;
  price: string;
  img: string;
};

type JeansOutletProps = {
  data?: ItemType[];
};

const JeansOutlet: React.FC<JeansOutletProps> = ({ data }) => {
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

export default JeansOutlet;
