import { useState,useEffect } from "react";
import TopBar from "../../components/Layout/TopBar/TopBar";
import Card from "../../components/Layout/Card/Card";
import Button from "../../components/Layout/Button/Button";
import styles from "./settings.module.css";

export default function Settings(){

    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const [password,setPassword] = useState({password1:"",password2:""});

    const handleChange = (e) => {
        const {name,value} = e.target;
        setPassword(prevValue => {
            return {
                ...prevValue,
                [name]: value
            };
        });
    }

    const submit = () => {

    }

    const [updatePassword,setUpdatePassword] = useState(false);

    const [showNotification,setShowNotification] = useState(true);

    const handleNotification = (e) => {
        setShowNotification(prev => ! prev);
    }

    const [serverError,setServerError] = useState(null);
    const [success,setSuccess] = useState(false);
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        if(success){
            serverError && setServerError(null);
            setTimeout(() => setSuccess(false), 5000);
            setPassword({password1:"",password2:""});
        }
    }, [success]); 

    let user = {
        unreadNotification:"hello",
        email:"ha",
        unreadMessage:"an",
        username:"bs"
      }
    
      let temp = {user}

    return (
        <>
        <TopBar {...temp}/>
        <div className="layContent">
            <h1 style={{textAlign:"center"}}>Account Settings</h1>
            <Card className={styles.settingsCard}>
                <h3 onClick={()=>setUpdatePassword(prev=> !prev)}><i className="fas fa-key"/>Update Password</h3>
                {updatePassword &&
                    <section>
                    <label htmlFor="password1">Current Password</label><br />
                    <div className={serverError ? styles.invalid : null}>
                        <i className="fas fa-lock" />
                        <input
                            type={showPassword1 ? "text" : "password"}
                            placeholder="Enter current password"
                            name="password1"
                            value={password.password1}
                            onChange={handleChange}
                        />
                        <i
                        className={
                            showPassword1
                            ? `fas fa-eye-slash ${styles.eye}`
                            : `fas fa-eye ${styles.eye}`
                        }
                        onClick={() => {
                            setShowPassword1((prev) => !prev);
                        }}
                        />
                    </div>
                    <label htmlFor="password2">New Password</label><br />
                    <div className={serverError ? styles.invalid : null}>
                        <i className="fas fa-lock" />
                        <input
                            type={showPassword2 ? "text" : "password"}
                            placeholder="Enter new password"
                            name="password2"
                            value={password.password2}
                            onChange={handleChange}
                        />
                        <i
                        className={
                            showPassword2
                            ? `fas fa-eye-slash ${styles.eye}`
                            : `fas fa-eye ${styles.eye}`
                        }
                        onClick={() => {
                            setShowPassword2((prev) => !prev);
                        }}
                        />
                    </div>
                    <Button className={styles.submitButton} onClick={submit}>Confirm</Button>
                    {serverError && <p style={{color:"red"}}>{serverError}</p>}
                    {success && <p style={{color:"green"}}>Updated password successfully.</p>}
                </section>}
                <hr />
                <section className={styles.popUpNotification}>
                    <h3><i className="fab fa-telegram-plane"/>Show New Notification Popup?</h3>
                    <label className={styles.switch}>
                        <input type="checkbox" defaultChecked={showNotification} onChange={handleNotification} />
                        <span className={styles.slider}></span>
                    </label>
                </section>
            </Card>
        </div>
        </>
    );
}