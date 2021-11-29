import { useState } from "react";
import Link from "next/link";
import calculateTime from "../../../utils/calculateTime";
import {followUser, unfollowUser} from "../../../utils/profileActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCheck, faUserPlus } from "@fortawesome/free-solid-svg-icons";
import styles from "./followerNotification.module.css";

export default function FollowerNotification({notification,loggedUserFollowStats,setUserFollowStats}) {

  const [loading,setLoading] = useState(false);

  const isFollowing = loggedUserFollowStats.following.length > 0 &&
    loggedUserFollowStats.following.filter(following => following.user === notification.user._id).length > 0;

  const handleChange = async() => {
    if(loading)
      return;
    setLoading(true);
    isFollowing ? await unfollowUser(notification.user._id, setUserFollowStats) 
                    : await followUser(notification.user._id, setUserFollowStats);
    setLoading(false);
  }

  return (
    <div className={styles.container}>
      <div className={styles.followerDetails}>
        <Link href={`/${notification.user.username}`}>
          <div className={styles.userPic}>
            <img
              src={notification.user.profilePicUrl}
              alt="Profile Pic"
            />
          </div>
        </Link>
        <div className={styles.followerInfo}>
          <h4>
          <Link href={`/${notification.user.username}`}><span>{notification.user.username}</span></Link>
           {` started following you.`}
          </h4>
          <p>{calculateTime(notification.date)}</p>
        </div>
      </div>
      <FontAwesomeIcon 
        icon={isFollowing ? faUserCheck : faUserPlus} 
        size="2x"
        className={styles.button} 
        onClick={handleChange} 
      />
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
