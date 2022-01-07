import { useState,useEffect } from "react";
import Card from "../../components/Layout/Card/Card";
import { NoNotifications } from "../../components/Layout/NoData/NoData";
import LikeNotification from "../../components/Notifications/LikeNotification/LikeNotification";
import CommentNotification from "../../components/Notifications/CommentNotification/CommentNotification";
import FollowerNotification from "../../components/Notifications/FollowerNotification/FollowerNotification";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import { parseCookies } from "nookies";
import cookie from "js-cookie";
import styles from "./notifications.module.css";

export default function Notifications({ notifications, errorLoading, user, userFollowStats }) {

  const [loggedUserFollowStats, setUserFollowStats] = useState(userFollowStats);

    useEffect(() => {
      const notificationRead = async () => {
        try {
          await axios.post(
            `${baseUrl}/api/notifications`,
            {},
            { headers: { Authorization: cookie.get("token") } }
          );
        } catch (error) {
          console.log(error);
        }
      };

      notificationRead();
    }, []);

  return (
    <>
          <h1 style={{textAlign:"center"}}>Notifications</h1>
          {(!errorLoading && notifications.length > 0) ?
            <Card className={styles.notificationsCard}>
              {notifications.map(notification =><div key={notification._id}>

                {notification.type === "newLike" && notification.post !== null && 
                  <LikeNotification  notification={notification}/>}

                {notification.type === "newComment" && notification.post !== null && 
                  <CommentNotification notification={notification}/>}

                {notification.type === "newFollower" &&  
                  <FollowerNotification 
                    notification={notification} 
                    loggedUserFollowStats={loggedUserFollowStats}
                    setUserFollowStats={setUserFollowStats}
                  />}
                  <hr />
              </div>)}
          </Card> : <NoNotifications />}
    </>
  );
}

Notifications.getInitialProps = async ctx => {
  try {
    const { token } = parseCookies(ctx);

    const res = await axios.get(`${baseUrl}/api/notifications`, {
      headers: { Authorization: token }
    });

    return { notifications: res.data };
  } catch (error) {
    return { errorLoading: true };
  }
};