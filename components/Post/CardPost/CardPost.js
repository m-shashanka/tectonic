import { useState } from "react";
import Card from "../../Layout/Card/Card";
import Comment from "../Comment/Comment";
import Button from "../../Layout/Button/Button";
import DeletePost from "./DeletePost/DeletePost";
import Modal from '../../Layout/Modal/Modal';
import ImageModal from "./ImageModal/ImageModal";
import NoImageModal from "./NoImageModal/NoImageModal";
import calculateTime from "../../../utils/calculateTime";
import {likePost} from "../../../utils/postActions";
import Link from "next/link";
import CommentInputField from "../CommentInputField/CommentInputField";
import styles from "./cardPost.module.css";
import LikesList from "../LikesList/LikesList";

export default function CardPost({ post, user, setPosts, setShowToastr, socket }) {

  const [showModal, setShowModal] = useState(false);
  const [displayLikes, setDisplayLikes] = useState(false);

  const showAllLikes = () =>{
    setDisplayLikes(true);
    setShowModal(true);
  }

  const showAllComments = ()=>{
    setDisplayLikes(false);
    setShowModal(true);
  }

  return (
    <>
    <Card className={styles.postCard}>
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
          <DeletePost setShowToastr={setShowToastr}/>
          {/* <DeletePost id={post._id} setPosts={setPosts} setShowToastr={setShowToastr} /> */}
        </div>

        <div className={styles.postContent}>
          <p>Today was a good day!</p>
          <img
            onClick={showAllComments}
            src="https://res.cloudinary.com/drnc3bkx7/image/upload/v1636035901/user_f2qa5w.png"
            alt=""
          />
        </div>

        <div className={styles.postStats}>
          <div className={styles.likes}>
            <i className="fas fa-heart" />
            <LikesList showAllLikes={showAllLikes}/>
          </div>
          <i className={`${styles.comments} far fa-comments`} onClick={() => setShowModal(true)}/>
        </div>

        <div className={styles.postComments}>
          <Comment />
          <Comment />
          <Button className={styles.viewMore} onClick={showAllComments}>View More</Button>
          <CommentInputField />
        </div>
    </Card>
    {showModal && (
        <Modal closeModal={() => setShowModal(false)}>
          <NoImageModal
            closeModal={() => setShowModal(false)}
            setShowToastr={setShowToastr}
            likes = {displayLikes}
          />
        </Modal>
      )}
    </>
  );
}

// import React, { useState } from "react";
// import {
//   Card,
//   Icon,
//   Image,
//   Divider,
//   Segment,
//   Button,
//   Popup,
//   Header,
//   Modal
// } from "semantic-ui-react";
// import PostComments from "./PostComments";
// import CommentInputField from "./CommentInputField";
// import calculateTime from "../../utils/calculateTime";
// import Link from "next/link";
// import { deletePost, likePost } from "../../utils/postActions";
// import LikesList from "./LikesList";
// import ImageModal from "./ImageModal";
// import NoImageModal from "./NoImageModal";

// function CardPost({ post, user, setPosts, setShowToastr, socket }) {
//   const [likes, setLikes] = useState(post.likes);

//   const isLiked =
//     likes.length > 0 && likes.filter(like => like.user === user._id).length > 0;

//   const [comments, setComments] = useState(post.comments);

//   const [error, setError] = useState(null);

//   const [showModal, setShowModal] = useState(false);

//   const addPropsToModal = () => ({
//     post,
//     user,
//     setLikes,
//     likes,
//     isLiked,
//     comments,
//     setComments
//   });

//   return (
//     <>
//       {showModal && (
//         <Modal
//           open={showModal}
//           closeIcon
//           closeOnDimmerClick
//           onClose={() => setShowModal(false)}
//         >
//           <Modal.Content>
//             {post.picUrl ? (
//               <ImageModal {...addPropsToModal()} />
//             ) : (
//               <NoImageModal {...addPropsToModal()} />
//             )}
//           </Modal.Content>
//         </Modal>
//       )}

//       <Segment basic>
//         <Card color="teal" fluid>
//           {post.picUrl && (
//             <Image
//               src={post.picUrl}
//               style={{ cursor: "pointer" }}
//               floated="left"
//               wrapped
//               ui={false}
//               alt="PostImage"
//               onClick={() => setShowModal(true)}
//             />
//           )}

//           <Card.Content>
//             <Image floated="left" src={post.user.profilePicUrl} avatar circular />

//             {(user.role === "root" || post.user._id === user._id) && (
//               <>
//                 <Popup
//                   on="click"
//                   position="top right"
//                   trigger={
//                     <Image
//                       src="/deleteIcon.svg"
//                       style={{ cursor: "pointer" }}
//                       size="mini"
//                       floated="right"
//                     />
//                   }
//                 >
//                   <Header as="h4" content="Are you sure?" />
//                   <p>This action is irreversible!</p>

//                   <Button
//                     color="red"
//                     icon="trash"
//                     content="Delete"
//                     onClick={() => deletePost(post._id, setPosts, setShowToastr)}
//                   />
//                 </Popup>
//               </>
//             )}

//             <Card.Header>
//               <Link href={`/${post.user.username}`}>
//                 <a>{post.user.name}</a>
//               </Link>
//             </Card.Header>

//             <Card.Meta>{calculateTime(post.createdAt)}</Card.Meta>

//             {post.location && <Card.Meta content={post.location} />}

//             <Card.Description
//               style={{
//                 fontSize: "17px",
//                 letterSpacing: "0.1px",
//                 wordSpacing: "0.35px"
//               }}
//             >
//               {post.text}
//             </Card.Description>
//           </Card.Content>

//           <Card.Content extra>
//             <Icon
//               name={isLiked ? "heart" : "heart outline"}
//               color="red"
//               style={{ cursor: "pointer" }}
//               onClick={() => {
//                 if (socket.current) {
//                   socket.current.emit("likePost", {
//                     postId: post._id,
//                     userId: user._id,
//                     like: isLiked ? false : true
//                   });

//                   socket.current.on("postLiked", () => {
//                     if (isLiked) {
//                       setLikes(prev => prev.filter(like => like.user !== user._id));
//                     }
//                     //
//                     else {
//                       setLikes(prev => [...prev, { user: user._id }]);
//                     }
//                   });
//                 } else {
//                   likePost(post._id, user._id, setLikes, isLiked ? false : true);
//                 }
//               }}
//             />

//             <LikesList
//               postId={post._id}
//               trigger={
//                 likes.length > 0 && (
//                   <span className="spanLikesList">
//                     {`${likes.length} ${likes.length === 1 ? "like" : "likes"}`}
//                   </span>
//                 )
//               }
//             />

//             <Icon name="comment outline" style={{ marginLeft: "7px" }} color="blue" />

//             {comments.length > 0 &&
//               comments.map(
//                 (comment, i) =>
//                   i < 3 && (
//                     <PostComments
//                       key={comment._id}
//                       comment={comment}
//                       postId={post._id}
//                       user={user}
//                       setComments={setComments}
//                     />
//                   )
//               )}

//             {comments.length > 3 && (
//               <Button
//                 content="View More"
//                 color="teal"
//                 basic
//                 circular
//                 onClick={() => setShowModal(true)}
//               />
//             )}

//             <Divider hidden />

//             <CommentInputField user={user} postId={post._id} setComments={setComments} />
//           </Card.Content>
//         </Card>
//       </Segment>
//       <Divider hidden />
//     </>
//   );
// }

// export default CardPost;
