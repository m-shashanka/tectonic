import styles from './onlineUser.module.css';
import Card from "../../Layout/Card/Card";

const OnlineUser = (props) => {
    return (
        // <Card className={styles.friendCard}>
            <div className={styles.user}>
                <div className={styles.userPic}>
                    <img 
                    src="https://res.cloudinary.com/indersingh/image/upload/v1593464618/App/user_mklcpl.png"
                    alt=""
                    />
                </div>
                <div className={styles.username}>
                    <h4>Name</h4>
                </div>
                <div className={styles.online}></div>
            </div>
        // </Card> 
    );
}

export default OnlineUser;