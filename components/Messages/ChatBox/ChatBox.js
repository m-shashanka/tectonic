import MessageInputField from "./MessageInputField/MessageInputField";
import styles from "./chatBox.module.css";
import Message from "../Message/Message";

export default function ChatBox({divRef,bannerData, messages,user,socket,sendMsg, deleteMsg}){
    return (
        <>
            <div className={styles.header}>
                <div className={styles.userPic}>
                    <img
                        src={bannerData.profilePicUrl}
                        alt="Profile Pic"
                    />
                </div>
                <h3>{bannerData.username}</h3>
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