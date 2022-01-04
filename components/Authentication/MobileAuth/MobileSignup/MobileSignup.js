import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import baseUrl from "../../../../utils/baseUrl";
import { registerUser } from "../../../../utils/authUser";
import uploadPic from "../../../../utils/uploadPicToCloudinary";
import Spinner from "../../../Layout/Spinner/Spinner";
import ProfilePic from "../../Signup/ProfilePic/ProfilePic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
    faUser, faEnvelope, faLock, faEye, faEyeSlash, faUserCircle, faCheck, faTimes, faInfoCircle
  } from "@fortawesome/free-solid-svg-icons";
import styles from "./mobileSignup.module.css";
const regexUserName = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/;
const regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
let cancel;

export default function MobileSignup(){

    const [showPassword, setShowPassword] = useState(false);

  const [username, setUsername] = useState("");
  const [usernameLoading, setUsernameLoading] = useState(false);
  const [usernameErrorMessage, setUsernameErrorMessage] = useState("");

  const [formLoading,setFormLoading] = useState(false);

  const [serverError,setServerError] = useState(null);
 
  const [media, setMedia] = useState(null);

  const {register,formState: { errors },handleSubmit} = useForm();

  const onSubmit = async (data) => {
    if(usernameErrorMessage)
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
        <div className={styles.container}>
            <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Create Account</h1>

      <ProfilePic setMedia={setMedia} userImage="https://res.cloudinary.com/drnc3bkx7/image/upload/v1636035901/user_f2qa5w.png" />

      <div className={errors.name ? styles.invalid : null}>
        <FontAwesomeIcon icon={faUser} className={styles.item} />
        <input
          type="text"
          placeholder="Name"
          name="name"
          {...register("name", { required: "name required" })}
        />
      </div>
        {errors.name && (
          <p className={styles.errorMessage}>{errors.name.message}</p>
        )}
      <div className={errors.email ? styles.invalid : null}>
        <FontAwesomeIcon icon={faEnvelope} className={styles.item} />
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
      </div>
        {errors.email && (
          <p className={styles.errorMessage}>{errors.email.message}</p>
        )}
      <div className={errors.password ? styles.invalid : null}>
        <FontAwesomeIcon icon={faLock} className={styles.item} />
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
        <FontAwesomeIcon 
          icon={showPassword ? faEyeSlash : faEye} 
          className={`${styles.item} ${styles.eye}`} 
          onClick={()=>{setShowPassword(prev=>!prev)}}
        />
      </div>
        {errors.password && (
          <p className={styles.errorMessage}>{errors.password.message}</p>
        )}
      <div className={!usernameErrorMessage ? null : styles.invalid}>
        {!usernameLoading && !username && <FontAwesomeIcon icon={faUserCircle} className={styles.item} />}
        {!usernameLoading && username && !usernameErrorMessage && (
          <FontAwesomeIcon icon={faCheck} className={styles.green} />
        )}
        {!usernameLoading && username && usernameErrorMessage && (
          <FontAwesomeIcon icon={faTimes} className={styles.red} />
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
      </div>
        {usernameErrorMessage && (
          <p className={styles.errorMessage}>{usernameErrorMessage}</p>
        )}
      <div className={styles.bio}>
        <FontAwesomeIcon icon={faInfoCircle} className={styles.item} />
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
        </div>
    );
}