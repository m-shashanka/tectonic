import styles from "./likeNotification.module.css";

export default function LikeNotification() {
  return (
    <div className={styles.container}>
      <div className={styles.likeDetails}>
        <div className={styles.userPic}>
          <img
            src="https://res.cloudinary.com/drnc3bkx7/image/upload/v1636035901/user_f2qa5w.png"
            alt=""
          />
        </div>
        <div className={styles.likeInfo}>
          <h4>
            <span>Username</span> liked your <span>post</span>
          </h4>
          <p>4 days ago</p>
        </div>
      </div>
      <div className={styles.postImage}>
        <img
          src="https://res.cloudinary.com/drnc3bkx7/image/upload/v1636035901/user_f2qa5w.png"
          alt=""
        />
      </div>
    </div>
  );
}

// import React from "react";
// import { Feed, Divider } from "semantic-ui-react";
// import calculateTime from "../../utils/calculateTime";

// function LikeNotification({ notification }) {
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
//               liked your <a href={`/post/${notification.post._id}`}>post.</a>
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
//         </Feed.Content>
//       </Feed.Event>
//       <Divider />
//     </>
//   );
// }

// export default LikeNotification;
