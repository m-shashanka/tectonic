import Link from "next/link";
import calculateTime from "../../../utils/calculateTime";
import { deleteComment } from "../../../utils/postActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
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
            <FontAwesomeIcon 
              icon={faTrash} 
              className={styles.deleteComment} 
              onClick={()=>deleteComment(postId,comment._id,setComments)} 
            />
          }
        </div>
        <p>{comment.text}</p>
      </div>
    </div>
  );
}
