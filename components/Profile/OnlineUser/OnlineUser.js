import { useState, useEffect } from "react";
import Link from "next/link";
import getUserInfo from "../../../utils/getUserInfo";
import styles from './onlineUser.module.css';

const OnlineUser = ({onlineUser}) => {

    const [userDetails,setUserDetails] = useState({username:"", profilePicUrl:""});

    useEffect(() => {

        const getData = async () => {
            const data = await getUserInfo(onlineUser);
            setUserDetails(data);
        }

        getData();
    
      }, []);

    return (
        <Link href={`/${userDetails.username}`}>
            <div className={styles.user}>
                <div className={styles.userPic}>
                    <img 
                        src={userDetails.profilePicUrl}
                        alt=""
                    />
                </div>
                <div className={styles.username}>
                    <h4>{userDetails.username}</h4>
                </div>
                <div className={styles.online}></div>
            </div>
        </Link>
    );
}

export default OnlineUser;