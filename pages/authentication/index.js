import React, { useState} from "react";
import { Form, Button, Message, Segment, Divider } from "semantic-ui-react";
import { loginUser } from "../../utils/authUser";
import Login from "../../components/Authentication/Login/Login";
import Signup from "../../components/Authentication/Signup/Signup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import styles from "./auth.module.css";

function Authentication() {
  const [rightPanelActive,setRightPanelActive] = useState(false);

  return (
    <div className={styles.cover}>

      <div className={rightPanelActive ? `${styles.rightPanelActive} ${styles.container}` : styles.container}>

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
                <h1>Social Media</h1>
              </span>
              <h1>Welcome Back!</h1>
              <p>
                To keep connected with us please login with your personal info
              </p>
              <button className={styles.ghost} onClick={()=>{setRightPanelActive(false)}}>Sign In</button>
            </div>

            <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
              <span className={`${styles.logo} ${styles.logoColorRight}`}>
              <FontAwesomeIcon icon={faPaw} size="4x" />
                <h1>Social Media</h1>
              </span>
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start your journey with us</p>
              <button className={styles.ghost} onClick={()=>{setRightPanelActive(true)}}>Sign Up</button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

// function Login() {
//   const [user, setUser] = useState({
//     email: "",
//     password: ""
//   });

//   const { email, password } = user;
//   const [showPassword, setShowPassword] = useState(false);
//   const [errorMsg, setErrorMsg] = useState(null);
//   const [formLoading, setFormLoading] = useState(false);
//   const [submitDisabled, setSubmitDisabled] = useState(true);

//   const handleChange = e => {
//     const { name, value } = e.target;

//     setUser(prev => ({ ...prev, [name]: value }));
//   };

//   useEffect(() => {
//     const isUser = Object.values({ email, password }).every(item => Boolean(item));
//     isUser ? setSubmitDisabled(false) : setSubmitDisabled(true);
//   }, [user]);

//   const handleSubmit = async e => {
//     e.preventDefault();

//     await loginUser(user, setErrorMsg, setFormLoading);
//   };

//   useEffect(() => {
//     document.title = "Welcome Back";
//     const userEmail = cookie.get("userEmail");
//     if (userEmail) setUser(prev => ({ ...prev, email: userEmail }));
//   }, []);

//   return (
//     <>
//       <HeaderMessage />
//       <Form loading={formLoading} error={errorMsg !== null} onSubmit={handleSubmit}>
//         <Message
//           error
//           header="Oops!"
//           content={errorMsg}
//           onDismiss={() => setErrorMsg(null)}
//         />

//         <Segment>
//           <Form.Input
//             required
//             label="Email"
//             placeholder="Email"
//             name="email"
//             value={email}
//             onChange={handleChange}
//             fluid
//             icon="envelope"
//             iconPosition="left"
//             type="email"
//           />

//           <Form.Input
//             label="Password"
//             placeholder="Password"
//             name="password"
//             value={password}
//             onChange={handleChange}
//             fluid
//             icon={{
//               name: "eye",
//               circular: true,
//               link: true,
//               onClick: () => setShowPassword(!showPassword)
//             }}
//             iconPosition="left"
//             type={showPassword ? "text" : "password"}
//             required
//           />

//           <Divider hidden />
//           <Button
//             icon="signup"
//             content="Login"
//             type="submit"
//             color="orange"
//             disabled={submitDisabled}
//           />
//         </Segment>
//       </Form>

//       <FooterMessage />
//     </>
//   );
// }

export default Authentication;
