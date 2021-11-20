import { useState } from "react";
import Button from "../../components/Layout/Button/Button";
import Card from "../../components/Layout/Card/Card";
import ProfilePic from "../../components/Authentication/Signup/ProfilePic/ProfilePic";
import Spinner from "../../components/Layout/Spinner/Spinner";
import { profileUpdate } from "../../utils/profileActions";
import uploadPic from "../../utils/uploadPicToCloudinary";
import styles from "./update-profile.module.css";

export default function UpdateProfile({user}){

    const [media, setMedia] = useState(null);
    const [text,setText] = useState(user.bio);
    const [loading,setLoading] = useState(false);
    const [serverError,setServerError] = useState(null);

    const submit = async () => {

        setLoading(true);
        
        let profilePicUrl;
        if(media != null){
            profilePicUrl = await uploadPic(media);
            if(!profilePicUrl){
                setLoading(false);
                setServerError('Error uploading image');
                return;
            }
        }

        let profile = {bio: text};

        await profileUpdate(profile,setLoading,setServerError,profilePicUrl,user.username);
    }

    return (
        <>
        <div className="layContent">
            <Card className={styles.profileUpdate}>
                <h1>Update Profile</h1>
                <ProfilePic setMedia={setMedia} userImage={user.profilePicUrl}/>
                <div className={styles.bio}>
                    <i className="fas fa-info-circle" />
                    <textarea name="bio" placeholder="Bio" value={text} onChange={(e)=>setText(e.target.value)}/>
                </div>
                {!loading && <Button className={styles.saveButton}>Save</Button>}
                {loading && <Spinner />}
            </Card>
            {serverError && <p style={{marginTop:"20px",color:"red"}}>{serverError}</p>}
        </div>
        </>
    );
}