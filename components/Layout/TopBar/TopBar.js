import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import baseUrl from "../../../utils/baseUrl";
import Link from "next/link";
import {useRouter} from "next/router";
import Card from "../Card/Card";
import UserSuggestion from "../../Profile/UserSuggestion/UserSuggestion";
import OnlineUser from "../../Profile/OnlineUser/OnlineUser";
import UserStats from "../../Profile/UserStats/UserStats";
import {logoutUser} from "../../../utils/authUser";
import SearchBar from "../SearchBar/SearchBar";
import Modal from "../Modal/Modal";
import NewMessagePopUp from "../../Messages/NewMessagePopUp/NewMessagePopUp";
import getUserInfo from "../../../utils/getUserInfo";
import newMsgSound from "../../../utils/newMsgSound";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { 
  faPaw, faChevronLeft, faChevronRight, faTh, faBell, faComment, faUser, faCog, faSignOutAlt
} from "@fortawesome/free-solid-svg-icons";
import {faComment as farComment,faBell as farBell, faUser as farUser} from "@fortawesome/free-regular-svg-icons";
import styles from "./topBar.module.css";

export default function TopBar({user:{unreadNotification,email,unreadMessage,username,profilePicUrl,_id,newMessagePopup},userFollowStats}) {

  const [chatHovered, setChatHovered] = useState(false);
  const toggleChatHover = () => setChatHovered(!chatHovered);

  const [notificationHovered, setNotificationHovered] = useState(false);
  const toggleNotificationHover = () =>
    setNotificationHovered(!notificationHovered);

  const [leftMenuOpen, setLeftMenuOpen] = useState(true);
  const [rightMenuOpen, setRightMenuOpen] = useState(true);

  const [connectedUsers, setConnectedUsers] = useState([]);

  const socket = useRef();

  const [newMessageReceived, setNewMessageReceived] = useState(null);
  const [newMessageModal, showNewMessageModal] = useState(false);

  const router = useRouter();

  const isActive = route => router.pathname === route;

  useEffect(() => {
    if (!socket.current) {
      socket.current = io(baseUrl);
    }

    if (socket.current) {
      socket.current.emit("join", { userId: _id });

      socket.current.on("connectedUsers", ({ users }) => {
        setConnectedUsers(users);
      });
    }

    if (socket.current && newMessagePopup) {

      socket.current.on("newMsgReceived", async ({ newMsg }) => {
        const { username, profilePicUrl } = await getUserInfo(newMsg.sender);

        
        setNewMessageReceived({
          ...newMsg,
          senderName: username,
          senderProfilePic: profilePicUrl
        });

        showNewMessageModal(true);

        newMsgSound(username);
      });
    }

  }, []);


  const leftMenuToggle = () => {
    setLeftMenuOpen((prevValue) => !prevValue);
  };

  const rightMenuToggle = () => {
    setRightMenuOpen((prevValue) => !prevValue);
  };

  if(isActive('/notifications'))
    unreadNotification=0;
  
  if(isActive('/messages'))
    unreadMessage=0;

  return (
    <>
      {newMessageModal && !isActive('/messages') && <Modal closeModal={()=>showNewMessageModal(false)}>
          <NewMessagePopUp 
            closeModal={()=>showNewMessageModal(false)} 
            socket={socket}
            newMessageReceived={newMessageReceived}
            userId={_id}
          />
        </Modal>}
      <div className={styles.topbarContainer}>
        <div className={styles.topbarLeft} onClick={()=>router.push('/')}>
          <span className={styles.logo}>
            <FontAwesomeIcon icon={faPaw} />
            {` Social Media`}
          </span>
        </div>

        <div className={styles.topbarCenter}>
          <SearchBar />
        </div>

        <div className={styles.topbarRight}>
          <div className={styles.topbarIcons}>
            <div className={styles.topbarIconItem}>
                <FontAwesomeIcon 
                  icon={chatHovered ? faComment : farComment} 
                  className={styles.chatIcon}
                  onMouseEnter={toggleChatHover}
                  onMouseLeave={toggleChatHover}
                  onClick={()=>router.push("/messages")}
                />
              {unreadMessage ? <span className={styles.topbarIconBadge}>{unreadMessage}</span> : null}
            </div>
            <div className={styles.topbarIconItem}>
                <FontAwesomeIcon 
                  icon={notificationHovered ? faBell : farBell} 
                  className={styles.bellIcon}
                  onMouseEnter={toggleNotificationHover}
                  onMouseLeave={toggleNotificationHover}
                  onClick={()=>router.push("/notifications")}
                />
              {unreadNotification ? <span className={styles.topbarIconBadge}>{unreadNotification}</span> : null}
            </div>
          </div>

          <FontAwesomeIcon 
            icon={rightMenuOpen ? faUser : farUser} 
            size="2x" 
            className={styles.userIcon} 
            onClick={rightMenuToggle}
          />
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
          {connectedUsers.map((onlineUser)=><OnlineUser onlineUser={onlineUser.userId} />)}
          {/* <OnlineUser />
          <OnlineUser />
          <OnlineUser />
          <OnlineUser /> */}
        </div>
        <div
          className={
            leftMenuOpen ? styles.leftMenuCloseArrow : styles.leftMenuOpenArrow
          }
          onClick={leftMenuToggle}
        >
          <FontAwesomeIcon icon={leftMenuOpen ? faChevronLeft : faChevronRight} />
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
              <FontAwesomeIcon icon={faTh} className={styles.item} />
              <p>Feed</p>
            </div>
          </Link>
          <Link href="/notifications">
            <div className={isActive('/notifications') ? `${styles.profileNotifications} ${styles.selectedOption}` : styles.profileNotifications}>
              <FontAwesomeIcon icon={faBell} className={styles.item} />
              <p>Notifications</p>
            </div>
          </Link>
          <Link href="/messages">
            <div className={isActive('/messages') ? `${styles.profileMessages} ${styles.selectedOption}` : styles.profileMessages}>
              <FontAwesomeIcon icon={faComment} className={styles.item} />
              <p>Messages</p>
            </div>
          </Link>
          <Link href={`/${username}`}>
            <div className={(router.query.username === username) ? `${styles.profileUser} ${styles.selectedOption}` : styles.profileUser}>
              <FontAwesomeIcon icon={faUser} className={styles.item} />
              <p>Profile</p>
            </div>
          </Link>
          <Link href={`/settings`}>
            <div className={isActive('/settings') ? `${styles.profileSettings} ${styles.selectedOption}` : styles.profileSettings}>
              <FontAwesomeIcon icon={faCog} className={styles.item} />
              <p>Settings</p>
            </div>
          </Link>
        </div>

        <div className={styles.userLogout} onClick={()=>logoutUser(email)}>
          <FontAwesomeIcon icon={faSignOutAlt} className={styles.item} />
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
          <FontAwesomeIcon icon={rightMenuOpen ? faChevronRight : faChevronLeft} />
        </div>
      </div>
    </>
  );
}
