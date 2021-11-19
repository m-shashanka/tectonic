import { useState, useEffect} from "react";
import Card from "../../../Layout/Card/Card";
import LikesListUser from "../../LikesList/LikesListUser/LikesListUser";
import Comment from "../../Comment/Comment";
import Link from "next/link";
import calculateTime from "../../../../utils/calculateTime";
import { likePost } from "../../../../utils/postActions";
import { Axios } from "../../../../utils/postActions";
import catchErrors from "../../../../utils/catchErrors";
import CommentInputField from "../../CommentInputField/CommentInputField";
import Spinner from "../../../Layout/Spinner/Spinner";
import styles from "./imageModal.module.css";

export default function ImageModal({post,user,setLikes,likes,isLiked,comments,setComments,closeModal,openLikes}) {

  const [showLikes,setShowLikes] = useState(openLikes);
  const [likesList,setLikesList] = useState([]);
  const [loading,setLoading] = useState(false);

  const getLikesList = async () => {
    setLoading(true);
    try {
      const res = await Axios.get(`/like/${postId}`);
      setLikesList(res.data);
    } catch (error) {
      alert(catchErrors(error));
    }
    setLoading(false);
  };

  useEffect(() => {
    getLikesList();
  }, [likes]);

  return (
    <div className={styles.postModal}>
      <Card className={styles.postCard}>
        <div className={styles.image}>
          <img
            src={post.picUrl}
            alt="Post Image"
          />
        </div>

        <div className={styles.post}>
          <div className={styles.postHeader}>
            <div className={styles.postInfo}>
              <div className={styles.userPic}>
                <img
                  src={post.user.profilePicUrl}
                  alt="User Profile Pic"
                />
              </div>
              <div className={styles.userInfo}>
                <Link href={`/${post.user.username}`}>
                  <h3>{post.user.username}</h3>
                </Link>
                <span>{calculateTime(post.createdAt)}</span>
                {post.location && <span>{`, ${post.location}`}</span>}
              </div>
            </div>
          </div>

          <div className={styles.postContent}>
            <p>{post.text}</p>
          </div>

          <div className={styles.postStats}>
            <div className={styles.likes}>
              <i 
                className={isLiked ? "fas fa-heart" : "far fa-heart"} 
                onClick={()=>likePost(post._id,user._id,setLikes,!isLiked)}
              />
              {likes.length > 0 && <span
                className={styles.likesCount}
                onClick={() => setShowLikes(true)}
              >{`${likes.length} ${likes.length === 1 ? "like" : "likes"}`}</span>}
            </div>
            <i className={`${styles.comments} far fa-comments`} onClick={()=>setShowLikes(false)} />
          </div>

          {!showLikes && <div className={styles.postComments}>
            <div className={styles.allComments}>
            {comments.length > 0 &&
              comments.map(
                comment => <Comment
                  key={comment._id}
                  comment={comment}
                  postId={post._id}
                  user={user}
                  setComments={setComments}
                />
            )}
            </div>
            <CommentInputField user={user} postId={post._id} setComments={setComments} />
          </div>}

          {showLikes && 
            <div className={styles.postLikes}>
              {!loading && <div className={styles.allLikes}>
                {likesList.map(like=> <LikesListUser key={like._id} user={like.user} expand />)}
              </div>}
              {loading && <Spinner className={styles.likesLoader} />}
            </div>
          }

        </div>
      </Card>
      <i className={`${styles.closeButton} fas fa-times`} onClick={() => closeModal()} />
    </div>
  );
}

// import React from "react";
// import { Modal, Grid, Image, Card, Icon, Divider } from "semantic-ui-react";
// import PostComments from "../../PostComments";
// import CommentInputField from "./CommentInputField";
// import calculateTime from "../../../../utils/calculateTime";
// import Link from "next/link";
// import { likePost } from "../../../../utils/postActions";
// import LikesList from "./LikesList";

// function ImageModal({
//   post,
//   user,
//   setLikes,
//   likes,
//   isLiked,
//   comments,
//   setComments
// }) {
//   return (
//     <>
//       <Grid columns={2} stackable relaxed>
//         <Grid.Column>
//           <Modal.Content image>
//             <Image wrapped size="large" src={post.picUrl} />
//           </Modal.Content>
//         </Grid.Column>

//         <Grid.Column>
//           <Card fluid>
//             <Card.Content>
//               <Image floated="left" avatar src={post.user.profilePicUrl} />

//               <Card.Header>
//                 <Link href={`/${post.user.username}`}>
//                   <a>{post.user.name}</a>
//                 </Link>
//               </Card.Header>

//               <Card.Meta>{calculateTime(post.createdAt)}</Card.Meta>

//               {post.location && <Card.Meta content={post.location} />}

//               <Card.Description
//                 style={{
//                   fontSize: "17px",
//                   letterSpacing: "0.1px",
//                   wordSpacing: "0.35px"
//                 }}>
//                 {post.text}
//               </Card.Description>
//             </Card.Content>

//             <Card.Content extra>
//               <Icon
//                 name={isLiked ? "heart" : "heart outline"}
//                 color="red"
//                 style={{ cursor: "pointer" }}
//                 onClick={() =>
//                   likePost(post._id, user._id, setLikes, isLiked ? false : true)
//                 }
//               />

//               <LikesList
//                 postId={post._id}
//                 trigger={
//                   likes.length > 0 && (
//                     <span className="spanLikesList">
//                       {`${likes.length} ${likes.length === 1 ? "like" : "likes"}`}
//                     </span>
//                   )
//                 }
//               />

//               <Divider hidden />

//               <div
//                 style={{
//                   overflow: "auto",
//                   height: comments.length > 2 ? "200px" : "60px",
//                   marginBottom: "8px"
//                 }}>
//                 {comments.length > 0 &&
//                   comments.map(comment => (
//                     <PostComments
//                       key={comment._id}
//                       comment={comment}
//                       postId={post._id}
//                       user={user}
//                       setComments={setComments}
//                     />
//                   ))}
//               </div>

//               <CommentInputField
//                 postId={post._id}
//                 user={user}
//                 setComments={setComments}
//               />
//             </Card.Content>
//           </Card>
//         </Grid.Column>
//       </Grid>
//     </>
//   );
// }

// export default ImageModal;
