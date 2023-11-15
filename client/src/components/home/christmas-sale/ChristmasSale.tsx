import bigsale_img from "../../../assets/images/bigsales.png";
import girl_image from "../../../assets/images/girl-in-hat.jpeg";
import Button from "../../button/Button";
import styles from "./ChristmasSale.module.scss";

const ChristmasSale = () => {
  return (
    <div className={styles.container}>
      <div
        style={{ backgroundImage: `url(${bigsale_img})` }}
        className={styles.rightDiv}
      >
        <Button variant="light">shop now</Button>
      </div>
      <div
        style={{ backgroundImage: `url(${girl_image})` }}
        className={styles.leftDiv}
      ></div>
    </div>
  );
};

export default ChristmasSale;
