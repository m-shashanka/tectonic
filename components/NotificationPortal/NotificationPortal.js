import { useEffect } from "react";
import newMsgSound from "../../utils/newMsgSound";
import { useRouter } from "next/router";
import calculateTime from "../../utils/calculateTime";
import styles from "./notificationPortal.module.css";

export default function NotificationPortal({ newNotification }) {
  const router = useRouter();

  const { profilePicUrl, username, postId, like } = newNotification;

  useEffect(() => {
    newMsgSound();
  }, []);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.userPic}>
          <img src={profilePicUrl} alt="Profile Pic" />
        </div>
        <p className={styles.content}>
          <span onClick={() => router.push(`/${username}`)}>{username}</span>
          {like ? ` liked your ` : ` commented on your `}
          <span onClick={() => router.push(`/post/${postId}`)}>post</span>
        </p>
      </div>
      <p className={styles.footer}>{calculateTime(Date.now())}</p>
    </>
  );
}