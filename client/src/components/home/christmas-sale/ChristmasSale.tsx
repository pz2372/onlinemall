import bigsale_img from "../../../assets/images/bigsales.png";
import styles from "./ChristmasSale.module.scss";

const ChristmasSale = () => {
  return (
    <div className={styles.container}>
      <div
        style={{ backgroundImage: `url(${bigsale_img})` }}
        className={styles.rightDiv}
      ></div>
      <div></div>
    </div>
  );
};

export default ChristmasSale;
