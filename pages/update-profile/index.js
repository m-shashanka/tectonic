import { useState } from "react";
import Button from "../../components/Layout/Button/Button";
import Card from "../../components/Layout/Card/Card";
import ProfilePic from "../../components/Authentication/Signup/ProfilePic/ProfilePic";
import Spinner from "../../components/Layout/Spinner/Spinner";
import { profileUpdate } from "../../utils/profileActions";
import uploadPic from "../../utils/uploadPicToCloudinary";
import { parseCookies } from "nookies";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import styles from "./update-profile.module.css";

function UpdateProfile({account}){

    const [media, setMedia] = useState(null);
    const [text,setText] = useState(account.bio);
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
        <div className={styles.layContent}>
            <Card className={styles.profileUpdate}>
                <h1>Update Profile</h1>
                <ProfilePic setMedia={setMedia} userImage={account.profilePicUrl}/>
                <div className={styles.bio}>
                    <FontAwesomeIcon icon={faInfoCircle} className={styles.item} />
                    <textarea name="bio" placeholder="Bio" value={text} onChange={(e)=>setText(e.target.value)}/>
                </div>
                {!loading && <Button className={styles.saveButton} onClick={submit}>Save</Button>}
                {loading && <Spinner />}
            </Card>
            {serverError && <p style={{marginTop:"20px",color:"red"}}>{serverError}</p>}
        </div>
    );
}

UpdateProfile.getInitialProps = async ctx => {
    try {
        const { token } = parseCookies(ctx);
        
        const res = await axios.get(`${baseUrl}/api/profile/account/info`, {
            headers: { Authorization: token }
        });
    
        return { account:res.data };
    } catch (error) {
      return { errorLoading: true };
    }
};

export default UpdateProfile;