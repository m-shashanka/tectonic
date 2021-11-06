import styles from './friend.module.css';
import Button from "../../Layout/Button/Button";
import Card from "../../Layout/Card/Card";

const Friend = (props) => {
    return (
        <Card className={styles.friendCard}>
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
                <Button className={styles.followUserButton}>Follow</Button>
            </div>
        </Card>
    );
}

export default Friend;