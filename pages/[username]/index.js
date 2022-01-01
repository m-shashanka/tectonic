import React, { useEffect, useState, useRef } from "react";
import Card from "../../components/Layout/Card/Card";
import Button from "../../components/Layout/Button/Button";
import Friend from "../../components/Profile/Friends/Friend";
import io from "socket.io-client";
import { useRouter } from "next/router";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import { parseCookies } from "nookies";
import { Grid } from "semantic-ui-react";
import { NoProfilePosts, NoProfile } from "../../components/Layout/NoData/NoData";
import CardPost from "../../components/Post/CardPost/CardPost";
import CreatePost from "../../components/Post/CreatePost/CreatePost";
import cookie from "js-cookie";
import { PlaceHolderPosts } from "../../components/Layout/PlaceHolderGroup";
import ProfileMenuTabs from "../../components/Profile/ProfileMenuTabs";
import ProfileHeader from "../../components/Profile/ProfileHeader";
import Followers from "../../components/Profile/Followers";
import Following from "../../components/Profile/Following";
import UpdateProfile from "../../components/Profile/UpdateProfile";
import Settings from "../../components/Profile/Settings";
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
    return (<NoProfile />);

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

    const isFollowing =
      loggedUserFollowStats.following.length > 0 &&
      loggedUserFollowStats.following.filter(following => following.user === profile._id).length > 0;

  return <>
  {showToastr && <PostDeleteToastr />}

      <Card className={styles.profileCard}>
        <img 
          className={styles.profilePic}
          src={profile.profilePicUrl}
          alt="Profile Pic"
        />
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

      {ownAccount ? 
      <Card className={styles.menuCard}>
        <span style={slider}></span>
        <div onClick={()=>{setSelectedIndex(1)}}>
          <p>{loggedUserFollowStats.followers.length}</p>
          <span>
            Followers
          </span>
        </div>

        <div className={styles.posts} onClick={()=>{setSelectedIndex(2)}}>
          <p>{loggedUserFollowStats.postsCount}</p>
          <span>
            Posts
          </span>
        </div>

        <div onClick={()=>{setSelectedIndex(3)}}>
          <p>{loggedUserFollowStats.following.length}</p>
          <span>
            Following
          </span>
        </div>
        
      </Card> :
      <Card className={styles.menuCard}>
        <span style={slider}></span>
        <div onClick={()=>{setSelectedIndex(1)}}>
          <p>{followersLength}</p>
          <span>
            Followers
          </span>
        </div>

        <div className={styles.posts} onClick={()=>{setSelectedIndex(2)}}>
          <p>{postsLength}</p>
          <span>
            Posts
          </span>
        </div>

        <div onClick={()=>{setSelectedIndex(3)}}>
          <p>{followingLength}</p>
          <span>
            Following
          </span>
        </div>
        
      </Card>}

      {selectedIndex == 2 && 
      <div className={styles.fadeIn}>
        {ownAccount && <CreatePost user={user} setPosts={setPosts}/>}
        {loading && <h4 style={{textAlign:"center"}}>Loading...</h4>}
        {!loading && posts.length === 0 && <NoProfilePosts />}
        {!loading && posts.length > 0 && posts.map(post=>(
          <CardPost key={post._id} post={post} user={user} setPosts={setPosts} setShowToastr={setShowToastr}/>
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

// function ProfilePage({
//   errorLoading,
//   profile,
//   followersLength,
//   followingLength,
//   user,
//   userFollowStats
// }) {
//   const router = useRouter();

//   const [posts, setPosts] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [showToastr, setShowToastr] = useState(false);

//   const [activeItem, setActiveItem] = useState("profile");
//   const handleItemClick = clickedTab => setActiveItem(clickedTab);

//   const [loggedUserFollowStats, setUserFollowStats] = useState(userFollowStats);

//   const ownAccount = profile.user._id === user._id;

//   if (errorLoading) return <NoProfile />;

//   useEffect(() => {
//     const getPosts = async () => {
//       setLoading(true);

//       try {
//         const { username } = router.query;
//         const res = await axios.get(`${baseUrl}/api/profile/posts/${username}`, {
//           headers: { Authorization: cookie.get("token") }
//         });

//         setPosts(res.data);
//       } catch (error) {
//         alert("Error Loading Posts");
//       }

//       setLoading(false);
//     };
//     getPosts();
//   }, [router.query.username]);

//   useEffect(() => {
//     showToastr && setTimeout(() => setShowToastr(false), 4000);
//   }, [showToastr]);

//   const socket = useRef();

//   useEffect(() => {
//     if (!socket.current) {
//       socket.current = io(baseUrl);
//     }

//     if (socket.current) {
//       socket.current.emit("join", { userId: user._id });
//     }
//   }, []);

//   return (
//     <>
//       {showToastr && <PostDeleteToastr />}

//       <Grid stackable>
//         <Grid.Row>
//           <Grid.Column>
//             <ProfileMenuTabs
//               activeItem={activeItem}
//               handleItemClick={handleItemClick}
//               followersLength={followersLength}
//               followingLength={followingLength}
//               ownAccount={ownAccount}
//               loggedUserFollowStats={loggedUserFollowStats}
//             />
//           </Grid.Column>
//         </Grid.Row>

//         <Grid.Row>
//           <Grid.Column>
//             {activeItem === "profile" && (
//               <>
//                 <ProfileHeader
//                   profile={profile}
//                   ownAccount={ownAccount}
//                   loggedUserFollowStats={loggedUserFollowStats}
//                   setUserFollowStats={setUserFollowStats}
//                 />

//                 {loading ? (
//                   <PlaceHolderPosts />
//                 ) : posts.length > 0 ? (
//                   posts.map(post => (
//                     <CardPost
//                       socket={socket}
//                       key={post._id}
//                       post={post}
//                       user={user}
//                       setPosts={setPosts}
//                       setShowToastr={setShowToastr}
//                     />
//                   ))
//                 ) : (
//                   <NoProfilePosts />
//                 )}
//               </>
//             )}

//             {activeItem === "followers" && (
//               <Followers
//                 user={user}
//                 loggedUserFollowStats={loggedUserFollowStats}
//                 setUserFollowStats={setUserFollowStats}
//                 profileUserId={profile.user._id}
//               />
//             )}

//             {activeItem === "following" && (
//               <Following
//                 user={user}
//                 loggedUserFollowStats={loggedUserFollowStats}
//                 setUserFollowStats={setUserFollowStats}
//                 profileUserId={profile.user._id}
//               />
//             )}

//             {activeItem === "updateProfile" && <UpdateProfile Profile={profile} />}

//             {activeItem === "settings" && (
//               <Settings newMessagePopup={user.newMessagePopup} />
//             )}
//           </Grid.Column>
//         </Grid.Row>
//       </Grid>
//     </>
//   );
// }

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
