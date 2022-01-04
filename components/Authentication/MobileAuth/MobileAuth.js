import { useState } from "react";
import Card from "../../Layout/Card/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import MobileLogin from "./MobileLogin/MobileLogin";
import MobileSignup from "./MobileSignup/MobileSignup";
import styles from "./mobileAuth.module.css";

export default function MobileAuth() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <FontAwesomeIcon icon={faPaw} size="3x" />
        <h1>Social Media</h1>
      </div>

      <Card className={styles.cardContainer}>
        {isLogin ? <MobileLogin /> : <MobileSignup />}
      </Card>

      <h3
        className={styles.authButton}
        onClick={() => setIsLogin((prev) => !prev)}
      >
        {isLogin ? `Signup Instead` : `SignIn Instead`}
      </h3>
    </div>
  );
}
