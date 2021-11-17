import { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { loginUser } from "../../../utils/authUser";
import Spinner from "../../Layout/Spinner/Spinner";
import Link from "next/link";
const regexEmail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
import cookie from "js-cookie";
import styles from './login.module.css';

export default function Login(){

    const [showPassword, setShowPassword] = useState(false);

    const [formLoading,setFormLoading] = useState(false);

    const [serverError,setServerError] = useState(null);

    const {register,formState: { errors },handleSubmit} = useForm();

    const onSubmit = async (data) => {

      let user = {
        email: data.email,
        password: data.password
      }

      await loginUser(user, setServerError, setFormLoading);
    };

    const [userEmail,setUserEmail] = useState("");

    useEffect(()=>{
      const previousUserEmail = cookie.get('userEmail');
      if(previousUserEmail){
        document.title = 'Welcome Back';
        setUserEmail(previousUserEmail);
      }
    },[]);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h1>Sign in</h1>
            <div className={errors.email ? styles.invalid : null}>
              <i className="fas fa-envelope" />
              <input type="email" placeholder="Email" name="email" defaultValue={userEmail || undefined}
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
              <input type={showPassword ? "text" : "password"} placeholder="Password" name="password"
                {...register("password", {
                  required: "password required",
                  minLength: {
                    value: 6,
                    message: "password must be atleast 6 characters long",
                  },
                })}
              />
              {errors.password && (
                <p className={styles.errorMessage}>{errors.password.message}</p>
              )}
              <i className={showPassword ? `fas fa-eye-slash ${styles.eye}`:`fas fa-eye ${styles.eye}`} onClick={()=>{setShowPassword(prev=>!prev)}}/>
            </div>
            <Link href="#" style={{color:"#1877F2"}}>Forgot your password?</Link>
            {!formLoading && <button type="submit">Sign In</button>}
            {formLoading && <Spinner className={styles.loading}/>}
            {serverError && <p className={styles.serverError}>{serverError}</p>}
        </form>
    );
}