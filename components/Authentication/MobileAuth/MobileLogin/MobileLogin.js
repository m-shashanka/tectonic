import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Spinner from "../../../Layout/Spinner/Spinner";
import cookie from "js-cookie";
import Link from "next/link";
import { loginUser } from "../../../../utils/authUser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import styles from "./mobileLogin.module.css";
const regexEmail =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function MobileLogin() {
  const [showPassword, setShowPassword] = useState(false);

  const [formLoading, setFormLoading] = useState(false);

  const [serverError, setServerError] = useState(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm();

  useEffect(() => {
    const previousUserEmail = cookie.get("userEmail");
    if (previousUserEmail) {
      document.title = "Welcome Back";
      setValue("email", previousUserEmail);
    }
  }, []);

  const onSubmit = async (data) => {
    if (serverError) setServerError(null);

    let user = {
      email: data.email,
      password: data.password,
    };

    await loginUser(user, setServerError, setFormLoading);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1>Sign in</h1>
        <div className={errors.email ? styles.invalid : null}>
          <FontAwesomeIcon icon={faEnvelope} className={styles.item} />
          <input
            type="email"
            placeholder="Email"
            name="email"
            {...register("email", {
              required: "email required",
              pattern: {
                value: regexEmail,
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
            onClick={() => {
                setShowPassword((prev) => !prev);
            }}
            />
        </div>
            {errors.password && (
              <p className={styles.errorMessage}>{errors.password.message}</p>
            )}
        <Link href="/reset">
          <p className={styles.reset}>Forgot password?</p>
        </Link>
        {!formLoading && <button type="submit">Sign In</button>}
        {formLoading && <Spinner className={styles.loading} />}
        {serverError && <p className={styles.serverError}>{serverError}</p>}
      </form>
    </div>
  );
}
