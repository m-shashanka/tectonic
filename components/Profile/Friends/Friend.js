import { useState } from "react";
import Button from "../../Layout/Button/Button";
import Card from "../../Layout/Card/Card";
import Link from "next/link";
import { followUser, unfollowUser } from "../../../utils/profileActions";
import styles from "./friend.module.css";

const Friend = ({ showButton, isFollowing, friend, updateStats }) => {
  const [followLoading, setFollowLoading] = useState(false);

  return (
    <Card className={styles.friendCard}>
      <div className={styles.user}>
        <Link href={`/${friend.username}`}>
          <div className={styles.userPic}>
            <img src={friend.profilePicUrl} alt="User Pic" />
          </div>
        </Link>
        <Link href={`/${friend.username}`}>
          <div className={styles.username}>
            <h4>{friend.username}</h4>
          </div>
        </Link>
        {showButton && (
          <Button 
          className={isFollowing ? `${styles.followButton} ${styles.followingButton}` : styles.followButton}
          disabled={followLoading}
          onClick={async()=>{
            setFollowLoading(true);

            isFollowing
              ? await unfollowUser(friend._id, updateStats)
              : await followUser(friend._id, updateStats);

            setFollowLoading(false);
          }}
          >
            {isFollowing ? `Following` : `Follow`}
          </Button>
        )}
      </div>
    </Card>
  );
};

export default Friend;
