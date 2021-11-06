import styles from './userStats.module.css';

const UserStats = (props) =>{
    return (
        <div className={styles.menuCard}>
            <div className={`${styles.profileStats} ${styles.profileFollowers}`}>
              <h4>0</h4>
              <span>Followers</span>
            </div>
            <div className={`${styles.profileStats} ${styles.profilePosts}`}>
              <h4>0</h4>
              <span>Posts</span>
            </div>
            <div className={`${styles.profileStats} ${styles.profileFollowing}`}>
              <h4>0</h4>
              <span>Following</span>
            </div>
          </div>
    );
}

export default UserStats;