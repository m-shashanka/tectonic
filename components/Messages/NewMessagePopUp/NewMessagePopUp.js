import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import MessageInputField from "../MessageInputField/MessageInputField";
import styles from "./newMessagePopUp.module.css";

export default function NewMessagePopUp({closeModal}){
    return (<div className={styles.container}>
        <div className={styles.title}>
            <h3>Sasuke</h3>
            <FontAwesomeIcon icon={faTimes} className={styles.item} onClick={closeModal} />
        </div>
        <div className={styles.messageContainer}>
            <div className={styles.messageBody} >
                <span>Hello hunny bunny!</span>
                <p>Date and time</p>
            </div>
        </div>
        <MessageInputField isPopUp={true}/>
        <span className={styles.viewMore} >View all messages</span>
    </div>);
}