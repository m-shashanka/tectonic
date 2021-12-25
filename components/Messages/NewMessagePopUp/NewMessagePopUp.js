import { useState } from "react";
import Link from "next/link";
import calculateTime from "../../../utils/calculateTime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import MessageInputField from "../MessageInputField/MessageInputField";
import styles from "./newMessagePopUp.module.css";

export default function NewMessagePopUp({closeModal,socket,newMessageReceived,user}){
    
    const sendMsg = msg => {
        if (socket.current) {
          socket.current.emit("sendNewMsg", {
            userId: user._id,
            msgSendToUserId: newMessageReceived.sender,
            msg
          });
          socket.current.on('msgSent',(_)=>{
              closeModal();
          });
        }
      };

    return (<div className={styles.container}>
        <div className={styles.title}>
            <Link href={`/${newMessageReceived.senderName}`}><h3>{newMessageReceived.senderName}</h3></Link>
            <FontAwesomeIcon icon={faTimes} className={styles.item} onClick={closeModal} />
        </div>
        <div className={styles.messageContainer}>
            <div className={styles.messageBody} >
                <span>{newMessageReceived.msg}</span>
                <p>{calculateTime(newMessageReceived.date)}</p>
            </div>
        </div>
        <MessageInputField isPopUp={true} sendMsg={sendMsg} />
        <Link href={`/messages?message=${newMessageReceived.sender}`}>
            <span className={styles.viewMore} >View all messages</span>
        </Link>
    </div>);
}