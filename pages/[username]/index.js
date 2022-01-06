import { useEffect, useState, useRef } from "react";
import Card from "../../components/Layout/Card/Card";
import Button from "../../components/Layout/Button/Button";
import io from "socket.io-client";
import { useRouter } from "next/router";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import { parseCookies } from "nookies";
import { NoProfilePosts, NoProfile } from "../../components/Layout/NoData/NoData";
import CardPost from "../../components/Post/CardPost/CardPost";
import CreatePost from "../../components/Post/CreatePost/CreatePost";
import cookie from "js-cookie";
import Followers from "../../components/Profile/Followers";
import Following from "../../components/Profile/Following";
import { PostDeleteToastr } from "../../components/Layout/Toastr";
import { followUser, unfollowUser } from "../../utils/profileActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit } from "@fortawesome/free-solid-svg-icons";
import styles from './profile.module.css';

function ProfilePage({profile, postsLength, followersLength, followingLength, errorLoading, user, userFollowStats}){

  const router = useRouter();
  
  const [showToastr, setShowToastr] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);

  const socket = useRef();

  useEffect(() => {
    if (!socket.current) {
      const token = cookie.get("token");
      socket.current = io(baseUrl, { auth: { token } });
    }

    return () => {
      socket.current && socket.current.disconnect();
    };
  }, []);

  useEffect(() => {
    showToastr && setTimeout(() => setShowToastr(false), 3000);
  }, [showToastr]);  

  const [selectedIndex,setSelectedIndex] = useState(2);

  const [loggedUserFollowStats, setUserFollowStats] = useState(userFollowStats);

  const ownAccount = profile._id === user._id;

  var sliderPos;

  if(selectedIndex == 1)
    sliderPos = "8%";
  else if(selectedIndex == 2)
    sliderPos = "43%";
  else
    sliderPos = "75%";

  var slider = {
    backgroundColor:"rgb(70, 64, 64)",
    width:"16%",
    height:"5%",
    position:"absolute",
    bottom:"-5px",
    left: sliderPos,
    transition: "all 0.6s ease-in",
  }

  if(errorLoading)
    return <NoProfile />;

  useEffect(() => {
      const getPosts = async () => {
        setLoading(true);

        try {
          const { username } = router.query;
          const res = await axios.get(`${baseUrl}/api/profile/posts/${username}`, {
            headers: { Authorization: cookie.get("token") }
          });

          setPosts(res.data);
        } catch (error) {
          alert("Error Loading Posts");
        }

        setLoading(false);
      };
      getPosts();
      setSelectedIndex(2);
  }, [router.query.username]);

  const isFollowing = loggedUserFollowStats.following.length > 0 &&
      loggedUserFollowStats.following.filter(following => following.user === profile._id).length > 0;

  return <>
  {showToastr && <PostDeleteToastr />}

      <Card className={styles.profileCard}>
        <img className={styles.profilePic} src={profile.profilePicUrl} alt="Profile Pic"/>
        <div className={styles.profileInfo}>
          <h2>{profile.name}</h2>
          <p>{profile.bio}</p>
        </div>
        {ownAccount ? 
          <Button className={styles.updateProfile} onClick={()=>{router.push('/update-profile')}}>
            <FontAwesomeIcon icon={faUserEdit} className={styles.item} />
            Update Profile
          </Button> :
          <Button 
            className={isFollowing ? `${styles.followButton} ${styles.followingButton}` : styles.followButton}
            disabled={followLoading}
            onClick={async()=>{
              setFollowLoading(true);

              isFollowing
                ? await unfollowUser(profile._id, setUserFollowStats)
                : await followUser(profile._id, setUserFollowStats);

              setFollowLoading(false);
            }}
            >{isFollowing ? `Following` : `Follow`}</Button>
        }
      </Card>
 
      <Card className={styles.menuCard}>
        <span style={slider}></span>
        <div onClick={()=>{setSelectedIndex(1)}}>
          {ownAccount ? <p>{loggedUserFollowStats.followers.length}</p> : <p>{followersLength}</p>}
          <span>Followers</span>
        </div>
        <div className={styles.posts} onClick={()=>{setSelectedIndex(2)}}>
          {ownAccount ? <p>{loggedUserFollowStats.postsCount}</p> : <p>{postsLength}</p>}
          <span>Posts</span>
        </div>
        <div onClick={()=>{setSelectedIndex(3)}}>
          {ownAccount ? <p>{loggedUserFollowStats.following.length}</p> : <p>{followingLength}</p>}
          <span>Following</span>
        </div>
      </Card>

      {selectedIndex == 2 && 
      <div className={styles.fadeIn}>
        {ownAccount && <CreatePost user={user} setPosts={setPosts}/>}
        {loading && <h4 style={{textAlign:"center"}}>Loading...</h4>}
        {!loading && posts.length === 0 && <NoProfilePosts />}
        {!loading && posts.length > 0 && posts.map(post=>(
          <CardPost socket={socket} key={post._id} post={post} user={user} setPosts={setPosts} setShowToastr={setShowToastr}/>
        ))}
      </div>}

      {selectedIndex == 1 && <div className={styles.fadeIn}>
          <Followers
            user={user}
            loggedUserFollowStats={loggedUserFollowStats}
            setUserFollowStats={setUserFollowStats}
            profileUserId={profile._id}
          />
        </div>
      }

      {selectedIndex == 3 && <div className={styles.fadeIn}>
          <Following
            user={user}
            loggedUserFollowStats={loggedUserFollowStats}
            setUserFollowStats={setUserFollowStats}
            profileUserId={profile._id}
          />
        </div>
      }

  </>
}

ProfilePage.getInitialProps = async ctx => {
  try {
    const { username } = ctx.query;
    const { token } = parseCookies(ctx);

    const res = await axios.get(`${baseUrl}/api/profile/${username}`, {
      headers: { Authorization: token }
    });

    const { profile, postsLength, followersLength, followingLength } = res.data;

    return { profile, postsLength, followersLength, followingLength };
  } catch (error) {
    return { errorLoading: true };
  }
};

export default ProfilePage;