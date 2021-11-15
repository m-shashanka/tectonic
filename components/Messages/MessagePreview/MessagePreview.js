import styles from "./messagePreview.module.css";

export default function MessagePreview(){
    return (
        <div className={styles.container}>
            <div className={styles.messageInfo}>
                <div className={styles.userPic}>
                    <img
                        src="https://res.cloudinary.com/drnc3bkx7/image/upload/v1636035901/user_f2qa5w.png"
                        alt=""
                    />
                </div>
                <div className={styles.userInfo}>
                    <section>
                        <h5>Username</h5>
                        <p>4 days ago</p>
                    </section>
                    <p className={styles.message}>Hi there buddy</p>
                </div>
            </div>
            <i className="fas fa-trash" />
        </div>
    );
}