import MessageInputField from "./MessageInputField/MessageInputField";
import styles from "./chatBox.module.css";
import Message from "../Message/Message";

export default function ChatBox({bannerData, messages,setMessages,user,messagesWith,socket}){
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
                    key={i}
                    message={message} 
                    user={user}
                    setMessages={setMessages}
                    messagesWith={messagesWith}
                />)}
            </div>
            <MessageInputField socket={socket} user={user} messagesWith={messagesWith} />
        </>
    );
}