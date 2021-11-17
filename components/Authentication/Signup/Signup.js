import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import baseUrl from "../../../utils/baseUrl";
import { registerUser } from "../../../utils/authUser";
import uploadPic from "../../../utils/uploadPicToCloudinary";
import Spinner from "../../Layout/Spinner/Spinner";
import ProfilePic from "./ProfilePic/ProfilePic";
import styles from "./signup.module.css";
const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
const regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let cancel;

export default function Signup() {
  const [showPassword, setShowPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [usernameLoading, setUsernameLoading] = useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");

  const [formLoading,setFormLoading] = useState(false);

  const [serverError,setServerError] = useState(null);
 
  const [media, setMedia] = useState(null);

  const {register,formState: { errors },handleSubmit} = useForm();

  const onSubmit = async (data) => {
    if(usernameErrorMessage || serverError)
      return;
    
    setFormLoading(true);
    
    let profilePicUrl;
    if(media !== null){
      profilePicUrl = await uploadPic(media);
      if(!profilePicUrl){
        setFormLoading(false);
        setServerError("Error Uploading Image");
        return;
      }
    }

    let user = {
      name: data.name,
      email: data.email,
      password: data.password,
      username,
      bio: data.bio || " "
    }

    await registerUser(user, profilePicUrl, setServerError, setFormLoading);
  };

  const checkUsername = async () => {
    if (usernameErrorMessage && usernameErrorMessage !== "Username Not Available") return;

    setUsernameLoading(true);

    try {
      cancel && cancel();

      const CancelToken = axios.CancelToken;

      const res = await axios.get(`${baseUrl}/api/signup/${username}`, {
        cancelToken: new CancelToken(canceler => {
          cancel = canceler;
        })
      });

      if (usernameErrorMessage) setUsernameErrorMessage("");

      if (res.data !== "Available") setUsernameErrorMessage("Username Not Available")
    } catch (error) {
      setUsernameErrorMessage("Username Not Available");
    }

    setUsernameLoading(false);
  };

  useEffect(() => {
    username && checkUsername();
  }, [username]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Create Account</h1>

      <ProfilePic setMedia={setMedia} userImage="https://res.cloudinary.com/drnc3bkx7/image/upload/v1636035901/user_f2qa5w.png" />

      <div className={errors.name ? styles.invalid : null}>
        <i className="fas fa-user" />
        <input
          type="text"
          placeholder="Name"
          name="name"
          {...register("name", { required: "name required" })}
        />
        {errors.name && (
          <p className={styles.errorMessage}>{errors.name.message}</p>
        )}
      </div>
      <div className={errors.email ? styles.invalid : null}>
        <i className="fas fa-envelope" />
        <input
          type="email"
          placeholder="Email"
          name="email"
          {...register("email", {
            required: "email required",
            pattern: {
              value:
                regexEmail,
                message: "invalid email address",
              },
          })}
        />
        {errors.email && (
          <p className={styles.errorMessage}>{errors.email.message}</p>
        )}
      </div>
      <div className={errors.password ? styles.invalid : null}>
        <i className="fas fa-lock" />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          name="password"
          {...register("password", {
            required: "password required",
            minLength: {
              value: 6,
              message: "password must be atleast 6 characters long",
            },
          })}
        />
        <i
          className={
            showPassword
              ? `fas fa-eye-slash ${styles.eye}`
              : `fas fa-eye ${styles.eye}`
          }
          onClick={() => {
            setShowPassword((prev) => !prev);
          }}
        />
        {errors.password && (
          <p className={styles.errorMessage}>{errors.password.message}</p>
        )}
      </div>
      <div className={!usernameErrorMessage ? null : styles.invalid}>
        {!usernameLoading && !username && <i className="fas fa-user-circle" />}
        {!usernameLoading && username && !usernameErrorMessage && (
          <span className={`${styles.green} fas fa-check`} />
        )}
        {!usernameLoading && username && usernameErrorMessage && (
          <span className={`${styles.red} fas fa-times`} />
        )}
        {usernameLoading && <Spinner className={styles.usernameLoader} />}
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            if (e.target.value.length === 0) {
              setUsernameErrorMessage("username required");
              return;
            }
            if (regexUserName.test(e.target.value)) {
              setUsernameErrorMessage("");
            } else {
              setUsernameErrorMessage("username cannot contain '@' or spaces");
            }
          }}
        />
        {usernameErrorMessage && (
          <p className={styles.errorMessage}>{usernameErrorMessage}</p>
        )}
      </div>
      <div className={styles.bio}>
        <i className="fas fa-info-circle" />
        <textarea name="bio" {...register("bio")} placeholder="Bio" />
      </div>
      {!formLoading && <button
        type="submit"
        style={{ marginTop: "10px" }}
        onClick={() => {
          !username && setUsernameErrorMessage("username required");
        }}
      >
        Sign Up
      </button>}
      {formLoading && <Spinner className={styles.loading}/>}
      {serverError && <p className={styles.serverError}>{serverError}</p>}
    </form>
  );
}
