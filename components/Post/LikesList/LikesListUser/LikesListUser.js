import styles from './likesListUser.module.css';

export default function LikesListUser() {
  return (
    <div className={styles.user}>
      <div className={styles.userPic}>
        <img
          src="https://res.cloudinary.com/drnc3bkx7/image/upload/v1636035901/user_f2qa5w.png"
          alt=""
        />
      </div>
      <p>Username</p>
    </div>
  );
}
