import styles from './userSuggestion.module.css';
import Card from '../../Layout/Card/Card';

const UserSuggestion = (props) => {
    return (
        <Card className={styles.user}>
            <div className={styles.userPic}>
              <img 
                src="https://res.cloudinary.com/indersingh/image/upload/v1593464618/App/user_mklcpl.png"
                alt=""
              />
            </div>
            <h4>Name</h4>
        </Card>
    );
}

export default UserSuggestion;