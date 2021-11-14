import styles from "./followerNotification.module.css";

export default function FollowerNotification() {
  return (
    <div className={styles.container}>
      <div className={styles.followerDetails}>
        <div className={styles.userPic}>
          <img
            src="https://res.cloudinary.com/drnc3bkx7/image/upload/v1636035901/user_f2qa5w.png"
            alt=""
          />
        </div>
        <div className={styles.followerInfo}>
          <h4>
            <span>Username</span> started following you.
          </h4>
          <p>4 days ago</p>
        </div>
      </div>
      <i className={`fas fa-user-plus ${styles.button}`} />
      {/* <i className={`fas fa-user-check ${styles.button}`}/> */}
    </div>
  );
}

// import React, { useState } from "react";
// import { Feed, Button, Divider } from "semantic-ui-react";
// import calculateTime from "../../../utils/calculateTime";
// import { followUser, unfollowUser } from "../../../utils/profileActions";

// function FollowerNotification({
//   notification,
//   loggedUserFollowStats,
//   setUserFollowStats
// }) {
//   const [disabled, setDisabled] = useState(false);

//   const isFollowing =
//     loggedUserFollowStats.following.length > 0 &&
//     loggedUserFollowStats.following.filter(
//       following => following.user === notification.user._id
//     ).length > 0;

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
//               started following you.
//               <Feed.Date>{calculateTime(notification.date)}</Feed.Date>
//             </>
//           </Feed.Summary>

//           <div style={{ position: "absolute", right: "5px" }}>
//             <Button
//               size="small"
//               compact
//               icon={isFollowing ? "check circle" : "add user"}
//               color={isFollowing ? "instagram" : "twitter"}
//               disabled={disabled}
//               onClick={async () => {
//                 setDisabled(true);

//                 isFollowing
//                   ? await unfollowUser(notification.user._id, setUserFollowStats)
//                   : await followUser(notification.user._id, setUserFollowStats);

//                 setDisabled(false);
//               }}
//             />
//           </div>
//         </Feed.Content>
//       </Feed.Event>
//       <Divider />
//     </>
//   );
// }

// export default FollowerNotification;
