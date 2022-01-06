import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Reset } from "../../components/Layout/NoData/NoData";
import Card from "../../components/Layout/Card/Card";
import Button from "../../components/Layout/Button/Button";
import Spinner from "../../components/Layout/Spinner/Spinner";
import baseUrl from "../../utils/baseUrl";
import catchErrors from "../../utils/catchErrors";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import styles from "./reset.module.css";

function TokenPage() {
  const router = useRouter();

  const [newPassword, setNewPassword] = useState({ field1: "", field2: "" });

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const { field1, field2 } = newPassword;

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPassword((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    errorMsg !== null && setTimeout(() => setErrorMsg(null), 5000);
  }, [errorMsg]);

  const resetPassword = async () => {
    
    if(field1.length < 6 || field2.length < 6)
      return setErrorMsg("Password should be atleast 6 characters long");

    setLoading(true);
    try {
      if (field1 !== field2) {
        return setErrorMsg("Passwords do not match");
      }

      await axios.post(`${baseUrl}/api/reset/token`, {
        password: field1,
        token: router.query.token,
      });
      
      setNewPassword({ field1: "", field2: "" });
      setSuccess(true);
    } catch (error) {
      setErrorMsg(catchErrors(error));
    }

    setLoading(false);
  };

  return (
    <div className={styles.container}>
      <Reset />
      <Card className={styles.reset}>
        <section>
          <label htmlFor="field1">New Password</label>
          <br />
          <div>
            <FontAwesomeIcon icon={faLock} className={styles.item} />
            <input
              type={showPassword1 ? "text" : "password"}
              placeholder="Enter new password"
              name="field1"
              value={field1}
              onChange={handleChange}
            />
            <FontAwesomeIcon
              icon={showPassword1 ? faEyeSlash : faEye}
              className={`${styles.item} ${styles.eye}`}
              onClick={() => {
                setShowPassword1((prev) => !prev);
              }}
            />
          </div>
          <label htmlFor="field2">Confirm Password</label>
          <br />
          <div>
            <FontAwesomeIcon icon={faLock} className={styles.item} />
            <input
              type={showPassword2 ? "text" : "password"}
              placeholder="Confirm new password"
              name="field2"
              value={field2}
              onChange={handleChange}
            />
            <FontAwesomeIcon
              icon={showPassword2 ? faEyeSlash : faEye}
              className={`${styles.item} ${styles.eye}`}
              onClick={() => {
                setShowPassword2((prev) => !prev);
              }}
            />
          </div>
        </section>
        {!loading && <Button className={styles.submit} onClick={resetPassword}>RESET</Button>}
        {loading && <Spinner className={styles.loading} />}
      </Card>
      {errorMsg && <p className={styles.error}>{errorMsg}</p>}
      {success && <>
        <p className={styles.success}>
          Password reset successfull
        </p>
        <p className={styles.redirectLink}>Click <Link href="/authentication"><span>here</span></Link> to login</p>
      </>}
    </div>
  );
}

export default TokenPage;