import { useState } from "react";
import Card from "../../../Layout/Card/Card";
import DeletePost from "../DeletePost/DeletePost";
import LikesList from "../../LikesList/LikesList";
import LikesListUser from "../../LikesList/LikesListUser/LikesListUser";
import Comment from "../../Comment/Comment";
import CommentInputField from "../../CommentInputField/CommentInputField";
import styles from "./imageModal.module.css";

export default function ImageModal({ closeModal, setShowToastr, likes }) {

  const [showLikes,setShowLikes] = useState(likes);

  return (
    <div className={styles.postModal}>
      <Card className={styles.postCard}>
        <div className={styles.image}>
          <img
            src="https://res.cloudinary.com/drnc3bkx7/image/upload/v1636035901/user_f2qa5w.png"
            alt=""
          />
        </div>

        <div className={styles.post}>
          <div className={styles.postHeader}>
            <div className={styles.postInfo}>
              <div className={styles.userPic}>
                <img
                  src="https://res.cloudinary.com/drnc3bkx7/image/upload/v1636035901/user_f2qa5w.png"
                  alt=""
                />
              </div>
              <div className={styles.userInfo}>
                <h3>Shashank</h3>
                <span>Date and Time</span>
                <span>, Location</span>
              </div>
            </div>
            <DeletePost setShowToastr={setShowToastr} showLeft={true} closeModal={closeModal}/>
            {/* <DeletePost id={post._id} setPosts={setPosts} setShowToastr={setShowToastr} /> */}
          </div>

          <div className={styles.postContent}>
            <p>Today was a good day!</p>
          </div>

          <div className={styles.postStats}>
            <div className={styles.likes}>
              <i className="fas fa-heart" />
              <span
                className={styles.likesCount}
                onClick={() => setShowLikes(true)}
              >5 likes</span>
            </div>
            <i className={`${styles.comments} far fa-comments`} onClick={()=>setShowLikes(false)} />
          </div>

          {!showLikes && <div className={styles.postComments}>
            <div className={styles.allComments}>
              <Comment />
              <Comment />
              <Comment />
              <Comment />
              <Comment />
            </div>
            <CommentInputField />
          </div>}

          {showLikes && 
            <div className={styles.postLikes}>
              <div className={styles.allLikes}>
                <LikesListUser expand={true}/>
                <LikesListUser expand={true}/>
                <LikesListUser expand={true}/>
                <LikesListUser expand={true}/>
                <LikesListUser expand={true}/>
                <LikesListUser expand={true}/>
              </div>
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
