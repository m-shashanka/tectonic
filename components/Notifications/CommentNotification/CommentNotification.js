import Link from "next/link";
import calculateTime from "../../../utils/calculateTime";
import styles from "./commentNotification.module.css";

export default function CommentNotification({notification}) {
  return (
    <div className={styles.container}>
      <div className={styles.commentDetails}>
        <Link href={`/${notification.user.username}`}>
          <div className={styles.userPic}>
            <img
              src={notification.user.profilePicUrl}
              alt="Profile Pic"
            />
          </div>
        </Link>
        <div className={styles.commentInfo}>
        <h4>
            <Link href={`/${notification.user.username}`}><span>{notification.user.username}</span></Link> 
            {` commented on your `} 
            <Link href={`/post/${notification.post._id}`}><span>post</span></Link>
          </h4>
          <p>{calculateTime(notification.date)}</p>
        </div>
      </div>
      {notification.post.picUrl && <Link href={`/post/${notification.post._id}`}>
        <div className={styles.postImage}>
          <img
            src={notification.post.picUrl}
            alt="Post Pic"
          />
      </div></Link>}
      <p className={styles.comment}>
        {notification.text.length > 15 ? `${notification.text.substring(0,14)} ...` : notification.text}
      </p>
    </div>
  );
}

// import React from "react";
// import { Divider, Feed } from "semantic-ui-react";
// import calculateTime from "../../../utils/calculateTime";

// function CommentNotification({ notification }) {
//   return (
//     <>
//       <Feed.Event>
//         <Feed.Label image={notification.user.profilePicUrl} />
//         <Feed.Content>
//           <Feed.Summary>
//             <>
//               <Feed.User as="a" href={`/${notification.user.username}`}>
//                 {notification.user.name}
//               </Feed.User>{" "}
//               commented on your <a href={`/post/${notification.post._id}`}>post.</a>
//               <Feed.Date>{calculateTime(notification.date)}</Feed.Date>
//             </>
//           </Feed.Summary>

//           {notification.post.picUrl && (
//             <Feed.Extra images>
//               <a href={`/post/${notification.post._id}`}>
//                 <img src={notification.post.picUrl} />
//               </a>
//             </Feed.Extra>
//           )}
//           <Feed.Extra text>
//             <strong>{notification.text}</strong>
//           </Feed.Extra>
//         </Feed.Content>
//       </Feed.Event>
//       <Divider />
//     </>
//   );
// }

// export default CommentNotification;
