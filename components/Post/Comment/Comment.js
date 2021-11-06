import styles from "./comment.module.css";

export default function Comment() {
  return (
    <div className={styles.commentDetails}>
      <div className={styles.commentUserPic}>
        <img
          src="https://res.cloudinary.com/drnc3bkx7/image/upload/v1636035901/user_f2qa5w.png"
          alt=""
        />
      </div>
      <div className={styles.comment}>
        <div className={styles.commentUserDetails}>
          <span className={styles.commentUser}>Shashank</span>
          <span>Date and Time</span>
          <i className={`${styles.deleteComment} fas fa-trash`} />
        </div>
        <p>Actual comment goes here rgergeergerherrrbrtbrtfvbgbtfvbrf</p>
      </div>
    </div>
  );
}
