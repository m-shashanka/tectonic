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
import LikesList from "../LikesList/LikesList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart, faComments as farComments } from "@fortawesome/free-regular-svg-icons";
import styles from "./cardPost.module.css";

export default function CardPost({ post, user, setPosts, setShowToastr, socket }) {

  const [showModal, setShowModal] = useState(false);
  const [displayLikes, setDisplayLikes] = useState(false);

  const [likes, setLikes] = useState(post.likes);

  const isLiked = likes.length > 0 && likes.filter(like => like.user === user._id).length > 0;

  const [comments, setComments] = useState(post.comments);

  const showAllLikes = () =>{
    setDisplayLikes(true);
    setShowModal(true);
  }

  const showAllComments = ()=>{
    setDisplayLikes(false);
    setShowModal(true);
  }

  const addPropsToModal = () => ({post,user,setLikes,likes,isLiked,comments,setComments,
      closeModal:() => setShowModal(false),
      openLikes : displayLikes});

  return (
    <>
    <Card className={styles.postCard}>
        <div className={styles.postHeader}>
          <div className={styles.postInfo}>
            <Link href={`/${post.user.username}`}>
              <div className={styles.userPic}>
                <img
                  src={post.user.profilePicUrl}
                  alt="User Profile Pic"
                />
              </div>
            </Link>
            <div className={styles.userInfo}>
              <Link href={`/${post.user.username}`}>
                <h3>{post.user.username}</h3>
              </Link>
              <span>{calculateTime(post.createdAt)}</span>
              {post.location && <span>{`, ${post.location}`}</span>}
            </div>
          </div>
          {(user.role === "root" || post.user._id === user._id) &&
            <DeletePost id={post._id} setPosts={setPosts} setShowToastr={setShowToastr} />}
        </div>

        <div className={styles.postContent}>
          <p>{post.text}</p>
          {post.picUrl && <img
            onClick={showAllComments}
            src={post.picUrl}
            alt="Post Image"
          />}
        </div>

        <div className={styles.postStats}>
          <div className={styles.likes}>
            <FontAwesomeIcon
                icon={isLiked ? faHeart : farHeart} 
                className={styles.item} 
                onClick={()=>{
                    if(socket.current && !isLiked)
                      socket.current.emit("likePost", {postId: post._id,userId: user._id});
                    likePost(post._id,user._id,setLikes,!isLiked);
                  }
                }
              />
            {likes.length > 0 &&
              <LikesList likes={likes} showAllLikes={showAllLikes} postId={post._id} />}
          </div>
          <FontAwesomeIcon 
              icon={farComments} 
              className={styles.comments}
              onClick={showAllComments}
            />
        </div>

        <div className={styles.postComments}>
            {comments.length > 0 &&
              comments.map(
                (comment, i) =>
                  i < 2 && (
                    <Comment
                      key={comment._id}
                      comment={comment}
                      postId={post._id}
                      user={user}
                      setComments={setComments}
                    />
                  )
              )}

            {comments.length > 2 && 
              (<Button className={styles.viewMore} onClick={showAllComments}>View More</Button>)}

          <CommentInputField user={user} postId={post._id} setComments={setComments} socket={socket} />
        </div>
    </Card>
    {showModal && (
        <Modal closeModal={() => setShowModal(false)}>
          {post.picUrl ?
            <ImageModal {...addPropsToModal()}/> : <NoImageModal {...addPropsToModal()}/>
          }
        </Modal>
      )}
    </>
  );
}