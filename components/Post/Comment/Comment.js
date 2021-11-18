import Link from "next/link";
import calculateTime from "../../../utils/calculateTime";
import styles from "./comment.module.css";

export default function Comment({ comment, user, setComments, postId }) {
  return (
    <div className={styles.commentDetails}>
      <Link href={`/${comment.user.username}`}>
        <div className={styles.commentUserPic}>
          <img
            src={comment.user.profilePicUrl}
            alt="Comment User Pic"
          />
        </div>
      </Link>
      <div className={styles.comment}>
        <div className={styles.commentUserDetails}>
          <Link href={`/${comment.user.username}`}>
            <span className={styles.commentUser}>{comment.user.username}</span>
          </Link>
          <span>{calculateTime(comment.date)}</span>
          {(user.role === "root" || comment.user._id === user._id) &&
            <i className={`${styles.deleteComment} fas fa-trash`} />}
        </div>
        <p>{comment.text}</p>
      </div>
    </div>
  );
}
