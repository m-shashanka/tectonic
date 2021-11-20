import { useState,useEffect } from "react";
import { PostDeleteToastr } from "../../components/Layout/Toastr";
import Card from "../../components/Layout/Card/Card";
import DeletePost from "../../components/Post/CardPost/DeletePost/DeletePost";
import LikesListUser from "../../components/Post/LikesList/LikesListUser/LikesListUser";
import Comment from "../../components/Post/Comment/Comment";
import CommentInputField from "../../components/Post/CommentInputField/CommentInputField";
import { NoPostFound } from "../../components/Layout/NoData/NoData";
import styles from "./post.module.css";

export default function PostPage(){
  const [showLikes, setShowLikes] = useState(false);

  const [showToastr, setShowToastr] = useState(false);

  useEffect(() => {
    showToastr && setTimeout(() => setShowToastr(false), 3000);
  }, [showToastr]);

  return (
    <>
  {showToastr && <PostDeleteToastr />}
  <div className="layContent">
    {/* <NoPostFound /> */}
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
            src="https://res.cloudinary.com/drnc3bkx7/image/upload/v1636035901/user_f2qa5w.png"
            alt=""
          />
        </div>

        <div className={styles.postStats}>
          <div className={styles.likes}>
          <i className="fas fa-heart" />
              <span
                className={styles.likesCount}
                onClick={() => setShowLikes(true)}
              >5 likes</span>
          </div>
          <i className={`${styles.comments} far fa-comments`} onClick={() => setShowLikes(false)}/>
        </div>

        {!showLikes && <div className={styles.postComments}>
              <Comment />
              <Comment />
              <Comment />
              <Comment />
              <Comment />
            <CommentInputField />
          </div>}

          {showLikes && 
            <div className={styles.postLikes}>
                <LikesListUser expand={true}/>
                <LikesListUser expand={true}/>
                <LikesListUser expand={true}/>
                <LikesListUser expand={true}/>
                <LikesListUser expand={true}/>
                <LikesListUser expand={true}/>
            </div>
          }
    </Card>
  </div>
    </>
  );
}

// import React, { useState } from "react";
// import axios from "axios";
// import { parseCookies } from "nookies";
// import { Card, Icon, Image, Divider, Segment, Container } from "semantic-ui-react";
// import PostComments from "../../components/Post/PostComments";
// import CommentInputField from "../../components/Post/CommentInputField";
// import LikesList from "../../components/Post/LikesList";
// import Link from "next/link";
// import { likePost } from "../../utils/postActions";
// import calculateTime from "../../utils/calculateTime";
// import baseUrl from "../../utils/baseUrl";
// import { NoPostFound } from "../../components/Layout/NoData";

// function PostPage({ post, errorLoading, user }) {
//   if (errorLoading) {
//     return <NoPostFound />;
//   }

//   const [likes, setLikes] = useState(post.likes);

//   const isLiked =
//     likes.length > 0 && likes.filter(like => like.user === user._id).length > 0;

//   const [comments, setComments] = useState(post.comments);

//   return (
//     <Container text>
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
//               onClick={() =>
//                 likePost(post._id, user._id, setLikes, isLiked ? false : true)
//               }
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
//               comments.map(comment => (
//                 <PostComments
//                   key={comment._id}
//                   comment={comment}
//                   postId={post._id}
//                   user={user}
//                   setComments={setComments}
//                 />
//               ))}

//             <Divider hidden />

//             <CommentInputField user={user} postId={post._id} setComments={setComments} />
//           </Card.Content>
//         </Card>
//       </Segment>
//       <Divider hidden />
//     </Container>
//   );
// }

// PostPage.getInitialProps = async ctx => {
//   try {
//     const { postId } = ctx.query;
//     const { token } = parseCookies(ctx);

//     const res = await axios.get(`${baseUrl}/api/posts/${postId}`, {
//       headers: { Authorization: token }
//     });

//     return { post: res.data };
//   } catch (error) {
//     return { errorLoading: true };
//   }
// };

// export default PostPage;
