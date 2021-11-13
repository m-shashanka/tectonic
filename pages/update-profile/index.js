import { useState } from "react";
import TopBar from "../../components/Layout/TopBar/TopBar";
import Button from "../../components/Layout/Button/Button";
import Card from "../../components/Layout/Card/Card";
import ProfilePic from "../../components/Authentication/Signup/ProfilePic/ProfilePic";
import styles from "./update-profile.module.css";

export default function UpdateProfile(){

    const [media, setMedia] = useState(null);
    const [text,setText] = useState("user's bio goes here");

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
            <Card className={styles.profileUpdate}>
                <h1>Update Profile</h1>
                <ProfilePic setMedia={setMedia} userImage={"https://res.cloudinary.com/drnc3bkx7/image/upload/v1636035901/user_f2qa5w.png"}/>
                <div className={styles.bio}>
                    <i className="fas fa-info-circle" />
                    <textarea name="bio" placeholder="Bio" value={text} onChange={(e)=>setText(e.target.value)}/>
                </div>
                <Button className={styles.saveButton}>Save</Button>
            </Card>
        </div>
        </>
    );
}