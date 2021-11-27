import { useState } from "react";
import Link from "next/link";
import {useRouter} from "next/router";
import Card from "../Card/Card";
import UserSuggestion from "../../Profile/UserSuggestion/UserSuggestion";
import OnlineUser from "../../Profile/OnlineUser/OnlineUser";
import UserStats from "../../Profile/UserStats/UserStats";
import {logoutUser} from "../../../utils/authUser";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./topBar.module.css";

export default function TopBar({user:{unreadNotification,email,unreadMessage,username,profilePicUrl},userFollowStats}) {

  const [chatHovered, setChatHovered] = useState(false);
  const toggleChatHover = () => setChatHovered(!chatHovered);

  const [notificationHovered, setNotificationHovered] = useState(false);
  const toggleNotificationHover = () =>
    setNotificationHovered(!notificationHovered);

  const [leftMenuOpen, setLeftMenuOpen] = useState(true);
  const [rightMenuOpen, setRightMenuOpen] = useState(true);

  const leftMenuToggle = () => {
    setLeftMenuOpen((prevValue) => !prevValue);
  };

  const rightMenuToggle = () => {
    setRightMenuOpen((prevValue) => !prevValue);
  };

  const router = useRouter();

  const isActive = route => router.pathname === route;

  return (
    <>
      <div className={styles.topbarContainer}>
        <div className={styles.topbarLeft}>
          <span className={styles.logo}>
            <i className="fas fa-paw" /> Social Media
          </span>
        </div>

        <div className={styles.topbarCenter}>
          <SearchBar />
        </div>

        <div className={styles.topbarRight}>
          <div className={styles.topbarIcons}>
            <div className={styles.topbarIconItem}>
              <div className={styles.chatIcon}>
                <i
                  className={chatHovered ? "fas fa-comment" : "far fa-comment"}
                  onMouseEnter={toggleChatHover}
                  onMouseLeave={toggleChatHover}
                  onClick={()=>router.push("/messages")}
                />
              </div>
              {unreadMessage ? <span className={styles.topbarIconBadge}>{unreadMessage}</span> : null}
            </div>
            <div className={styles.topbarIconItem}>
              <div className={styles.bellIcon}>
                <i
                  className={
                    notificationHovered ? "fas fa-bell" : "far fa-bell"
                  }
                  onMouseEnter={toggleNotificationHover}
                  onMouseLeave={toggleNotificationHover}
                  onClick={()=>router.push("/notifications")}
                />
              </div>
              {unreadNotification ? <span className={styles.topbarIconBadge}>{unreadNotification}</span> : null}
            </div>
          </div>

          <div className={styles.userIcon} onClick={rightMenuToggle}>
            <i
              className={
                rightMenuOpen ? "fas fa-user fa-2x" : "far fa-user fa-2x"
              }
            />
          </div>
        </div>
      </div>

      {!isActive('/messages') && <div
        className={
          leftMenuOpen
            ? `${styles.leftMenu} ${styles.toggled}`
            : styles.leftMenu
        }
      >
        <p style={{marginTop:"10px"}}>People you may know</p>
        <div className={styles.layUsers}>
          <UserSuggestion />
          <UserSuggestion />
          <UserSuggestion />
          <UserSuggestion />
          <UserSuggestion />
          <UserSuggestion />
        </div>
        <p>Online Users</p>
        <div className={styles.layOnlineUsers}>
          <OnlineUser />
          <OnlineUser />
          <OnlineUser />
          <OnlineUser />
        </div>
        <div
          className={
            leftMenuOpen ? styles.leftMenuCloseArrow : styles.leftMenuOpenArrow
          }
          onClick={leftMenuToggle}
        >
          {leftMenuOpen ? (
            <i className="fas fa-chevron-left" />
          ) : (
            <i className="fas fa-chevron-right" />
          )}
        </div>
      </div>}

      <div
        className={
          rightMenuOpen
            ? `${styles.rightMenu} ${styles.toggled}`
            : styles.rightMenu
        }
      >
        <div className={styles.userProfile}>

          <div className={styles.userPic}>
            <img
              src={profilePicUrl}
              alt=""
            />
          </div>
          <h3>{username}</h3>

          <UserStats userFollowStats={userFollowStats}/>

        </div>

        <div className={styles.profileOptions}>
          <Link href="/">
            <div className={isActive('/') ? `${styles.profileFeed} ${styles.selectedOption}` : styles.profileFeed}>
              <i className={"fas fa-th"}/>
              <p>Feed</p>
            </div>
          </Link>
          <Link href="/notifications">
            <div className={isActive('/notifications') ? `${styles.profileNotifications} ${styles.selectedOption}` : styles.profileNotifications}>
              <i className={"fas fa-bell"}/>
              <p>Notifications</p>
            </div>
          </Link>
          <Link href="/messages">
            <div className={isActive('/messages') ? `${styles.profileMessages} ${styles.selectedOption}` : styles.profileMessages}>
              <i className={"fas fa-comment"}/>
              <p>Messages</p>
            </div>
          </Link>
          <Link href={`/${username}`}>
            <div className={(router.query.username === username) ? `${styles.profileUser} ${styles.selectedOption}` : styles.profileUser}>
              <i className={"fas fa-user"}/>
              <p>Profile</p>
            </div>
          </Link>
          <Link href={`/settings`}>
            <div className={isActive('/settings') ? `${styles.profileSettings} ${styles.selectedOption}` : styles.profileSettings}>
              <i className={"fas fa-cog"}/>
              <p>Settings</p>
            </div>
          </Link>
        </div>

        <div className={styles.userLogout} onClick={()=>logoutUser(email)}>
          <i className={"fas fa-sign-out-alt"}/>
          <p>Logout</p>
        </div>

        <div
          className={
            rightMenuOpen
              ? styles.rightMenuCloseArrow
              : styles.rightMenuOpenArrow
          }
          onClick={rightMenuToggle}
        >
          {rightMenuOpen ? (
            <i className="fas fa-chevron-right" />
          ) : (
            <i className="fas fa-chevron-left" />
          )}
        </div>
      </div>
    </>
  );
}
