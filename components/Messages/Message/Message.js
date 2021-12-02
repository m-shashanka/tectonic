import { useState, useEffect, useRef } from "react";
import useLongPress from "../../../custom-hooks/useLongPress";
import calculateTime from "../../../utils/calculateTime";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from "./message.module.css";

export default function Message({divRef,message,user,deleteMsg}){

  const [deleteIcon,showDeleteIcon] = useState(false);

  const ref = useRef();

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        deleteIcon && showDeleteIcon(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref,deleteIcon]);

  const myMessage = message.sender === user._id;

  const onLongPress = () => myMessage && showDeleteIcon(true)

  const longPressEvent = useLongPress(onLongPress);

  return (
    <div 
      className={myMessage ? `${styles.messageContainer} ${styles.myMessage}`
        :`${styles.messageContainer} ${styles.yourMessage}`}
      ref={divRef}
    >
      <div ref={ref} className={styles.messageBody}>

        {(deleteIcon && myMessage) && <FontAwesomeIcon 
          icon={faTrash} 
          className={styles.deleteMessage}
        />}

        <span {...longPressEvent}>
          {message.msg}
        </span>
        
        <p>{calculateTime(message.date)}</p>

      </div>

    </div>
  );
}

// import React, { useState } from "react";
// import { Icon, Popup } from "semantic-ui-react";
// import calculateTime from "../../../utils/calculateTime";

// function Message({ message, user, deleteMsg, bannerProfilePic, divRef }) {
//   const [deleteIcon, showDeleteIcon] = useState(false);

//   const ifYouSender = message.sender === user._id;

//   return (
//     <div className="bubbleWrapper" ref={divRef}>
//       <div
//         className={ifYouSender ? "inlineContainer own" : "inlineContainer"}
//         onClick={() => ifYouSender && showDeleteIcon(!deleteIcon)}
//       >
//         <img
//           className="inlineIcon"
//           src={ifYouSender ? user.profilePicUrl : bannerProfilePic}
//         />

//         <div className={ifYouSender ? "ownBubble own" : "otherBubble other"}>
//           {message.msg}
//         </div>

//         {deleteIcon && (
//           <Popup
//             trigger={
//               <Icon
//                 name="trash"
//                 color="red"
//                 style={{ cursor: "pointer" }}
//                 onClick={() => deleteMsg(message._id)}
//               />
//             }
//             content="This will only delete the message from your inbox!"
//             position="top right"
//           />
//         )}
//       </div>

//       <span className={ifYouSender ? "own" : "other"}>{calculateTime(message.date)}</span>
//     </div>
//   );
// }

// export default Message;
