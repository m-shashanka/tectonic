import { useState,useEffect } from "react";
import Card from "../../components/Layout/Card/Card";
import Button from "../../components/Layout/Button/Button";
import { passwordUpdate, toggleMessagePopup } from "../../utils/profileActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faLock, faEye, faEyeSlash, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import styles from "./settings.module.css";

export default function Settings({user}){

    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);

    const [password,setPassword] = useState({password1:"",password2:""});

    const handleChange = (e) => {
        const {name,value} = e.target;
        setPassword((prev) => ({ ...prev, [name]: value }));
    }
    
    const [updatePassword,setUpdatePassword] = useState(false);
    
    const [showNotification,setShowNotification] = useState(user.newMessagePopup);
    
    const submit = async () => {
        setLoading(true);
        await passwordUpdate(setSuccess,password,setServerError);
        setLoading(false);
        setPassword({password1:"",password2:""});
        setShowPassword1(false);
        setShowPassword2(false);
    }

    const handleNotification = (e) => toggleMessagePopup(showNotification,setShowNotification);

    const [serverError,setServerError] = useState(null);
    const [success,setSuccess] = useState(false);
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        if(success){
            serverError && setServerError(null);
            setTimeout(() => setSuccess(false), 7000);
            setPassword({password1:"",password2:""});
        }
        else if(!success && serverError){
            setTimeout(() => setServerError(null), 5000);
        }
    }, [success,serverError]); 

    return (
        <>
            <h1 style={{textAlign:"center"}}>Account Settings</h1>
            <Card className={styles.settingsCard}>
                <h3 onClick={()=>setUpdatePassword(prev=> !prev)} className={styles.dropDown}>
                    <FontAwesomeIcon icon={faKey} className={styles.item} />
                    Update Password
                </h3>
                {updatePassword &&
                    <section>
                    <label htmlFor="password1">Current Password</label><br />
                    <div className={serverError ? styles.invalid : null}>
                        <FontAwesomeIcon icon={faLock} className={styles.item} />
                        <input
                            type={showPassword1 ? "text" : "password"}
                            placeholder="Enter current password"
                            name="password1"
                            value={password.password1}
                            onChange={handleChange}
                        />
                        <FontAwesomeIcon 
                            icon={showPassword1 ? faEyeSlash : faEye} 
                            className={`${styles.item} ${styles.eye}`} 
                            onClick={()=>{setShowPassword1(prev=>!prev)}}
                        />
                    </div>
                    <label htmlFor="password2">New Password</label><br />
                    <div className={serverError ? styles.invalid : null}>
                        <FontAwesomeIcon icon={faLock} className={styles.item} />
                        <input
                            type={showPassword2 ? "text" : "password"}
                            placeholder="Enter new password"
                            name="password2"
                            value={password.password2}
                            onChange={handleChange}
                        />
                        <FontAwesomeIcon 
                            icon={showPassword2 ? faEyeSlash : faEye} 
                            className={`${styles.item} ${styles.eye}`} 
                            onClick={()=>{setShowPassword2(prev=>!prev)}}
                        />
                    </div>
                    <Button className={styles.submitButton} onClick={submit} disabled={loading || password.password1 === "" || password.password2 === ""}>Confirm</Button>
                    {serverError && <p style={{color:"red"}}>{serverError}</p>}
                    {success && <p style={{color:"green"}}>Updated password successfully.</p>}
                </section>}
                <hr />
                <section className={styles.popUpNotification}>
                    <h3>
                        <FontAwesomeIcon icon={faPaperPlane} className={styles.item} />
                        Show New Message Popup?
                    </h3>
                    <label className={styles.switch}>
                        <input type="checkbox" defaultChecked={showNotification} onChange={handleNotification} />
                        <span className={styles.slider}></span>
                    </label>
                </section>
            </Card>
        </>
    );
}