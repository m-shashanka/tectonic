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