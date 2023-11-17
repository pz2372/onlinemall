import styles from "./BlackFriday.module.scss";
import Button from "../../button/Button";
import { useNavigate } from "react-router-dom";

const BlackFriday = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.overlay} />
      <div className={styles.content}>
        <h2>Black Friday</h2>
        <Button variant="dark" onClick={() => navigate("/women?cat=tops")}>
          Shop Now
        </Button>
      </div>
    </div>
  );
};

export default BlackFriday;
