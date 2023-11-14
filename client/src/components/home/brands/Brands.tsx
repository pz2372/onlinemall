import hyfyv_image from "../../../assets/images/hyfyv.png";
import lelis_image from "../../../assets/images/lelis.jpeg";
import styles from "./Brands.module.scss";

const Brands = () => {
  return (
    <div className={`${styles.container}`}>
      <div
        className={`${styles.rightDiv}`}
        style={{ backgroundImage: `url(${hyfyv_image})` }}
      >
        <h3>HYFYV</h3>
      </div>
      <div
        className={styles.lefttDiv}
        style={{ backgroundImage: `url(${lelis_image})` }}
      >
        <h3>Le Lis</h3>
      </div>
    </div>
  );
};

export default Brands;
