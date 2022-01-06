import {useRouter} from "next/router";
import calculateTime from "../../../utils/calculateTime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from "./messagePreview.module.css";

export default function MessagePreview({chat, connectedUsers, deleteChat}){

    const router = useRouter();
    
    const isOnline = connectedUsers.length > 0 &&
        connectedUsers.filter(user => user.userId === chat.messagesWith).length > 0;

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
                        {isOnline && <div className={styles.online}></div>}
                        <p>{calculateTime(chat.date)}</p>
                    </section>
                    <p className={styles.message}>
                        {chat.lastMessage.length > 15
                            ? `${chat.lastMessage.substring(0, 15)} ...`
                            : chat.lastMessage}
                    </p>
                </div>
            </div>
            <FontAwesomeIcon icon={faTrash} className={styles.item} onClick={()=>deleteChat(chat.messagesWith)} />
        </div>
    );
}