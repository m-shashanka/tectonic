import Link from "next/link";
import MessageInputField from "../MessageInputField/MessageInputField";
import Message from "../Message/Message";
import styles from "./chatBox.module.css";

export default function ChatBox({divRef,bannerData, messages,user,sendMsg, deleteMsg}){
    return (
        <>
            <div className={styles.header}>
                <Link href={`/${bannerData.username}`}>
                    <div className={styles.userPic}>
                        <img src={bannerData.profilePicUrl}/>
                    </div>
                </Link>
                <Link href={`/${bannerData.username}`}>
                    <h3>{bannerData.username}</h3>
                </Link>
            </div>
            <div className={styles.chatBody}>
                {messages.length > 0 
                && messages.map((message,i) => 
                <Message 
                    divRef={divRef}
                    key={i}
                    message={message} 
                    user={user}
                    deleteMsg={deleteMsg}
                />)}
            </div>
            <MessageInputField sendMsg={sendMsg} />
        </>
    );
}