import Link from "next/link";
import styles from './likesListUser.module.css';

export default function LikesListUser({user, expand}) {
  return (
    <Link href={`/${user.username}`}>
      <div className={expand ? `${styles.user} ${styles.expand}` : styles.user}>
        <div className={styles.userPic}>
          <img
            src={user.profilePicUrl}
            alt="Profile Pic"
          />
        </div>
        <p>{user.username}</p>
      </div>
    </Link>
  );
}
