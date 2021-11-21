import {useRouter} from "next/router";
import calculateTime from "../../../utils/calculateTime";
import styles from "./messagePreview.module.css";

export default function MessagePreview({chat,setChats}){

    const router = useRouter();

    const isActive = (router.query.message === chat.messagesWith);

    return (
        <div 
            className={isActive ? `${styles.active} ${styles.container}` : styles.container}
            onClick={() => router.push(`/messages?message=${chat.messagesWith}`,undefined,{shallow:true})}
        >
            <div className={styles.messageInfo}>
                <div className={styles.userPic}>
                    <img
                        src={chat.profilePicUrl}
                        alt="Profile Pic"
                    />
                </div>
                <div className={styles.userInfo}>
                    <section>
                        <h5>{chat.username}</h5>
                        <p>{calculateTime(chat.date)}</p>
                    </section>
                    <p className={styles.message}>
                        {chat.lastMessage.length > 9
                            ? `${chat.lastMessage.substring(0, 9)} ...`
                            : chat.lastMessage}
                    </p>
                </div>
            </div>
            <i className="fas fa-trash" />
        </div>
    );
}