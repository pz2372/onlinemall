import styles from "./BlackFriday.module.scss";
import Button from "../../button/Button";

const BlackFriday = () => {
  return (
    <div className={styles.container}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h2>Black Friday</h2>
        <Button variant="dark">Shop Now</Button>
      </div>
    </div>
  );
};

export default BlackFriday;
