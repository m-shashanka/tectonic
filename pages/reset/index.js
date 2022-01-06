import { useEffect, useState } from "react";
import { Reset } from "../../components/Layout/NoData/NoData";
import Card from "../../components/Layout/Card/Card";
import Button from "../../components/Layout/Button/Button";
import Spinner from "../../components/Layout/Spinner/Spinner";
import baseUrl from "../../utils/baseUrl";
import catchErrors from "../../utils/catchErrors";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import styles from "./reset.module.css";

function ResetPage() {
  const [email, setEmail] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);

  const [emailChecked, setEmailChecked] = useState(false);

  const [loading, setLoading] = useState(false);

  const resetPassword = async () => {

    if(email.length === 0)
      return setErrorMsg("Invalid email");

    setLoading(true);
    try {
      await axios.post(`${baseUrl}/api/reset`, { email });
      setEmailChecked(true);
    } catch (error) {
      setErrorMsg(catchErrors(error));
    }
    setLoading(false);
  };

  useEffect(() => {
    errorMsg !== null && setTimeout(() => setErrorMsg(null), 5000);
  }, [errorMsg]);

  return (
    <div className={styles.container}>
      <Reset />
      <Card className={styles.reset}>
        <div>
          <FontAwesomeIcon icon={faEnvelope} className={styles.item} />
          <input
            type="email"
            placeholder="Enter your email address"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {!loading && <Button className={styles.submit} onClick={resetPassword}>SUBMIT</Button>}
        {loading && <Spinner className={styles.loading} />}
      </Card>
      {errorMsg && <p className={styles.error}>{errorMsg}</p>}
      {emailChecked && (
        <p className={styles.success}>
          Please check your inbox for further instructions
        </p>
      )}
    </div>
  );
}

export default ResetPage;