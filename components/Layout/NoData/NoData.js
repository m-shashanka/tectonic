import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMeh, faUserFriends, faPaperPlane, faGrin } from "@fortawesome/free-solid-svg-icons";
import styles from "./noData.module.css";

export const NoProfilePosts = () => (
  <>
    <div className={styles.container} style={{padding:"15px"}}>
      <FontAwesomeIcon icon={faMeh} className={styles.item} />
      <div>
        <h4>User has not posted anything yet!</h4>
      </div>
    </div>
  </>
);

export const NoFollowData = ({ followersComponent, followingComponent }) => (
  <>
    {followersComponent && (
      <div className={styles.container} style={{padding:"15px"}}>
        <FontAwesomeIcon icon={faUserFriends} className={styles.item} />
        <div>
          <h4>User does not have any followers.</h4>
        </div>
      </div>
    )}

    {followingComponent && (
      <div className={styles.container} style={{padding:"15px"}}>
        <FontAwesomeIcon icon={faUserFriends} className={styles.item} />
        <div>
          <h4>User does not follow any users.</h4>
        </div>
      </div>
    )}
  </>
);

export const NoMessages = () => (
  <div className={styles.container} style={{padding:"15px"}}>
    <FontAwesomeIcon icon={faPaperPlane} className={styles.item} />
     <div>
       <h4>You have not messaged anyone yet. Search above to message someone!</h4>
     </div>
  </div>
);

export const NoPosts = () => (
  <div className={styles.container}>
    <FontAwesomeIcon icon={faMeh} className={styles.item} />
     <div>
       <h3>Hey!</h3>
       <h4>No Posts found. &nbsp; Make sure you are following somebody.</h4>
     </div>
  </div>
);

export const NoProfile = () => (
  <div className={styles.container}>
    <FontAwesomeIcon icon={faMeh} className={styles.item} />
     <div>
       <h3>Hey!</h3>
       <h4>Profile not found.</h4>
     </div>
  </div>
);

export const NoNotifications = () => (
  <div className={styles.container} style={{padding:"15px"}}>
    <FontAwesomeIcon icon={faGrin} className={styles.item} />
     <div>
       <h4>No Notifications</h4>
     </div>
  </div>
);

export const NoPostFound = () => (
  <div className={styles.container}>
    <FontAwesomeIcon icon={faMeh} className={styles.item} />
     <div>
       <h3>Hey!</h3>
       <h4>Post not found.</h4>
     </div>
  </div>
);
