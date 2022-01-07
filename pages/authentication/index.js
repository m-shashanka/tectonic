import { useState } from "react";
import Login from "../../components/Authentication/Login/Login";
import Signup from "../../components/Authentication/Signup/Signup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import MobileAuth from "../../components/Authentication/MobileAuth/MobileAuth";
import { Media, MediaContextProvider } from "../../Responsive/Media";
import styles from "./auth.module.css";

function Authentication() {
  const [rightPanelActive, setRightPanelActive] = useState(false);

  return (
    <MediaContextProvider>
      
      <Media greaterThanOrEqual="computer">
        <div className={styles.cover}>
          <div className={rightPanelActive ? `${styles.rightPanelActive} ${styles.container}`: styles.container}>
            <div className={`${styles.formContainer} ${styles.signUpContainer}`}>
              <Signup />
            </div>
            <div className={`${styles.formContainer} ${styles.signInContainer}`}>
              <Login />
            </div>
            <div className={styles.overlayContainer}>
              <div className={styles.overlay}>
                <div className={`${styles.overlayPanel} ${styles.overlayLeft}`}>
                  <span className={`${styles.logo} ${styles.logoColorLeft}`}>
                    <FontAwesomeIcon icon={faPaw} size="4x" />
                    <h1>Tectonic</h1>
                  </span>
                  <h1>Welcome Back!</h1>
                  <p>To keep connected with us please login with your personal info</p>
                  <button className={styles.ghost} onClick={() => setRightPanelActive(false)}>
                    Sign In
                  </button>
                </div>
                <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
                  <span className={`${styles.logo} ${styles.logoColorRight}`}>
                    <FontAwesomeIcon icon={faPaw} size="4x" />
                    <h1>Tectonic</h1>
                  </span>
                  <h1>Hello, Friend!</h1>
                  <p>Enter your personal details and start your journey with us</p>
                  <button className={styles.ghost} onClick={() => setRightPanelActive(true)}>
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Media>

      <Media lessThan="computer">
        <MobileAuth />
      </Media>

    </MediaContextProvider>
  );
}

export default Authentication;