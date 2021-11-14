import styles from "./commentNotification.module.css";

export default function CommentNotification() {
  return (
    <div className={styles.container}>
      <div className={styles.commentDetails}>
        <div className={styles.userPic}>
          <img
            src="https://res.cloudinary.com/drnc3bkx7/image/upload/v1636035901/user_f2qa5w.png"
            alt=""
          />
        </div>
        <div className={styles.commentInfo}>
          <h4>
            <span>Username</span> commented on your <span>post</span>
          </h4>
          <p>4 days ago</p>
        </div>
      </div>
      <p className={styles.comment}>Cut text after 5 words</p>
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
