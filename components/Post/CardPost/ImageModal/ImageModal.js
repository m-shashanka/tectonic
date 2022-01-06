import { useState, useEffect } from "react";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTimes } from "@fortawesome/free-solid-svg-icons";
import {faHeart as farHeart,faComments as farComments} from "@fortawesome/free-regular-svg-icons";
import styles from "./imageModal.module.css";
import { Media, MediaContextProvider } from "../../../../Responsive/Media";

export default function ImageModal({post,user,setLikes,likes,isLiked,comments,setComments,closeModal,openLikes}) {

  return (
    <MediaContextProvider>
      <Media greaterThanOrEqual="mobile">
        <div className={styles.postModal}>
          <Card className={styles.postCard}>
            <div className={styles.image}>
              <img src={post.picUrl} alt="Post Image" />
            </div>
            <div className={styles.post}>
              <Common 
                post={post} user={user} setLikes={setLikes} likes={likes} isLiked={isLiked}
                comments={comments} setComments={setComments} openLikes={openLikes}
              />
            </div>
          </Card>
          <FontAwesomeIcon icon={faTimes} className={styles.closeButton} onClick={() => closeModal()}/>
        </div>
      </Media>
      <Media lessThan="mobile">
        <div className={styles.postModal}>
          <Card className={styles.postCardMobile}>
            <div className={styles.postMobile}>
              <Common 
                post={post} user={user} setLikes={setLikes} likes={likes} isLiked={isLiked}
                comments={comments} setComments={setComments} openLikes={openLikes}
              />
            </div>
          </Card>
          <FontAwesomeIcon icon={faTimes} className={styles.closeButton} onClick={() => closeModal()}/>
        </div>
      </Media>
    </MediaContextProvider>
  );
}

const Common = ({post,user,setLikes,likes,isLiked,comments,setComments,openLikes}) => {

  const [showLikes, setShowLikes] = useState(openLikes);
  const [likesList, setLikesList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getLikesList = async () => {
      setLoading(true);
      try {
        const res = await Axios.get(`/like/${post._id}`);
        setLikesList(res.data);
      } catch (error) {
        alert(catchErrors(error));
      }
      setLoading(false);
    };

    getLikesList();
  }, [likes]);

  return (
    <>
      <div className={styles.postHeader}>
        <div className={styles.postInfo}>
          <div className={styles.userPic}>
            <img src={post.user.profilePicUrl} alt="User Profile Pic" />
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
          <FontAwesomeIcon
            icon={isLiked ? faHeart : farHeart}
            className={styles.item}
            onClick={() => likePost(post._id, user._id, setLikes, !isLiked)}
          />
          {likes.length > 0 && <span className={styles.likesCount} onClick={() => setShowLikes(true)}>
            {`${likes.length} ${likes.length === 1 ? " like" : " likes"}`}</span>}
        </div>
        <FontAwesomeIcon
          icon={farComments}
          className={styles.comments}
          onClick={() => setShowLikes(false)}
        />
      </div>
      {!showLikes && (
        <div className={styles.postComments}>
          <div className={styles.allComments}>
            {comments.length > 0 &&
              comments.map((comment) => (
                <Comment
                  key={comment._id}
                  comment={comment}
                  postId={post._id}
                  user={user}
                  setComments={setComments}
                />
              ))}
          </div>
          <CommentInputField
            user={user}
            postId={post._id}
            setComments={setComments}
          />
        </div>
      )}
      {showLikes && (
        <div className={styles.postLikes}>
          {!loading && likesList.length > 0 && (
            <div className={styles.allLikes}>
              {likesList.map((like) => (
                <LikesListUser key={like._id} user={like.user} expand />
              ))}
            </div>
          )}
          {loading && <Spinner className={styles.likesLoader} />}
        </div>
      )}
    </>
  );
};
