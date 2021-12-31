import React, { useEffect, useState } from "react";
// import { Form, Button, Message, Segment } from "semantic-ui-react";
import {Reset} from "../../components/Layout/NoData/NoData";
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

  const resetPassword = async e => {
    e.preventDefault();

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
          />
        </div>
        {!loading && <Button className={styles.submit}>SUBMIT</Button>}
        {loading && <Spinner className={styles.loading}/>}
      </Card>
      {errorMsg && <p className={styles.error}>{errorMsg}</p>}
      {emailChecked && <p className={styles.success}>Please check your inbox for further instructions</p>}
    </div>
  );

  // return (
  //   <>
  //     {emailChecked ? (
  //       <Message
  //         attached
  //         icon="mail"
  //         header="Check Your Inbox"
  //         content="Please check your inbox for further instructions"
  //         success
  //       />
  //     ) : (
  //       <Message attached icon="settings" header="Reset Password" color="teal" />
  //     )}

  //     <Form loading={loading} onSubmit={resetPassword} error={errorMsg !== null}>
  //       <Message error header="Oops!" content={errorMsg} />

  //       <Segment>
  //         <Form.Input
  //           fluid
  //           icon="mail outline"
  //           type="email"
  //           iconPosition="left"
  //           label="Email"
  //           placeholder="Enter email address"
  //           name="email"
  //           onChange={e => setEmail(e.target.value)}
  //           value={email}
  //           required
  //         />

  //         <Button
  //           disabled={loading || email.length === 0}
  //           icon="configure"
  //           type="submit"
  //           color="orange"
  //           content="Submit"
  //         />
  //       </Segment>
  //     </Form>
  //   </>
  // );
}

export default ResetPage;
