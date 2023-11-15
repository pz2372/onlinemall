import blue_top_img from "../../../assets/images/blue-top.jpeg";
import merry_top_img from "../../../assets/images/merry-top.jpeg";
import jeans_img from "../../../assets/images/jeans.jpeg";
import jacket_img from "../../../assets/images/jacket.jpeg";
import styles from "./Categories.module.scss";
import Button from "../../button/Button";

const Categories = () => {
  const cardData = [
    {
      id: 1,
      pic: blue_top_img,
      title: "Tops",
    },
    {
      id: 2,
      pic: merry_top_img,
      title: "Sweaters",
    },
    {
      id: 3,
      pic: jeans_img,
      title: "Jeans",
    },
    {
      id: 4,
      pic: jacket_img,
      title: "Jackets",
    },
  ];

  return (
    <div className="container mx-auto lg:w-10/12 w-11/12">
      <div className="w-full grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 lg:py-32 py-20">
        {/* Cards */}
        {cardData?.map((item) => (
          <div
            key={item.id}
            className={styles.card}
            style={{ backgroundImage: `url(${item.pic})` }}
          >
            <Button variant="dark">{item.title}</Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
