import { Message, Button } from "semantic-ui-react";
import styles from "./noData.module.css";

export const NoProfilePosts = () => (
  <>
    <Message info icon="meh" header="Sorry" content="User has not posted anything yet!" />
    <Button icon="long arrow alternate left" content="Go Back" as="a" href="/" />
  </>
);

export const NoFollowData = ({ followersComponent, followingComponent }) => (
  <>
    {followersComponent && (
      <Message icon="user outline" info content={`User does not have followers`} />
    )}

    {followingComponent && (
      <Message icon="user outline" info content={`User does not follow any users`} />
    )}
  </>
);

export const NoMessages = () => (
  <Message
    info
    icon="telegram plane"
    header="Sorry"
    content="You have not messaged anyone yet.Search above to message someone!"
  />
);

export const NoPosts = () => (
  <div className={styles.container}>
    <i className="fas fa-meh"/>
     <div>
       <h3>Hey!</h3>
       <h4>No Posts found. &nbsp; Make sure you are following somebody.</h4>
     </div>
  </div>
);

export const NoProfile = () => (
  <Message info icon="meh" header="Hey!" content="No Profile Found." />
);

export const NoNotifications = () => (
  <div className={styles.container} style={{padding:"15px"}}>
    <i className="fas fa-grin"/>
     <div>
       <h4>No Notifications</h4>
     </div>
  </div>
);

export const NoPostFound = () => (
  <div className={styles.container}>
    <i className="fas fa-meh"/>
     <div>
       <h3>Hey!</h3>
       <h4>Post not found.</h4>
     </div>
  </div>
);
