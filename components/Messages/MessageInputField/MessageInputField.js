import React, { useState } from "react";
import styles from "./messageInputField.module.css";

export default function MessageInputField({sendMsg,isPopUp}) {
  
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () =>{
    if(loading || !text || text.trim().length === 0)
      return;
    setLoading(true);
    sendMsg(text);
    setLoading(false);
    setText("");
  }

  return (
    <div className={isPopUp ? styles.yourMessage : `${styles.yourMessage} ${styles.chatBox}`}>
      <input
        type="text"
        placeholder="Send Message"
        name="message"
        value={text}
        onChange={e=>setText(e.target.value)}
      />
      <img src="/send.png" alt="send" onClick={handleSubmit}/>
    </div>
  );
}