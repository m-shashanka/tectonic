import MessageInputField from "./MessageInputField/MessageInputField";
import styles from "./chatBox.module.css";

export default function ChatBox(){
    return (
        <>
            <div className={styles.header}>
                <div className={styles.userPic}>
                    <img
                        src="https://res.cloudinary.com/drnc3bkx7/image/upload/v1636035901/user_f2qa5w.png"
                        alt=""
                    />
                </div>
                <h3>Username</h3>
            </div>
            <MessageInputField />
        </>
    );
}