import { useState, useEffect } from "react";
import Card from "../../components/Layout/Card/Card";
import LikesListUser from "../../components/Post/LikesList/LikesListUser/LikesListUser";
import Comment from "../../components/Post/Comment/Comment";
import CommentInputField from "../../components/Post/CommentInputField/CommentInputField";
import calculateTime from "../../utils/calculateTime";
import { likePost } from "../../utils/postActions";
import { Axios } from "../../utils/postActions";
import catchErrors from "../../utils/catchErrors";
import Link from "next/link";
import { parseCookies } from "nookies";
import { NoPostFound } from "../../components/Layout/NoData/NoData";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import Spinner from "../../components/Layout/Spinner/Spinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart, faComments as farComments } from "@fortawesome/free-regular-svg-icons";
import styles from "./post.module.css";

export default function PostPage({ post, errorLoading, user }){

  const [showLikes, setShowLikes] = useState(false);
  const [likes, setLikes] = useState(post.likes);
  const [likesList,setLikesList] = useState([]);

  const [loading,setLoading] = useState(false);

  const isLiked = likes.length > 0 && likes.filter(like => like.user === user._id).length > 0;

  const [comments, setComments] = useState(post.comments);

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
    {!errorLoading ? <Card className={styles.postCard}>
        <div className={styles.postHeader}>
          <div className={styles.postInfo}>
            <Link href={`/${post.user.username}`}>
                <div className={styles.userPic}>
                  <img src={post.user.profilePicUrl} alt="User Profile Pic"/>
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
        </div>

        <div className={styles.postContent}>
          <p>{post.text}</p>
          {post.picUrl && <img src={post.picUrl} alt="Post Image"/>}
        </div>

        <div className={styles.postStats}>
          <div className={styles.likes}>
            <FontAwesomeIcon 
              icon={isLiked ? faHeart : farHeart} 
              className={styles.item}
              onClick={()=>likePost(post._id,user._id,setLikes,!isLiked)}
            />
            {likes.length > 0 && 
              <span className={styles.likesCount} onClick={() => setShowLikes(true)}>
                {` ${likes.length} ${likes.length === 1 ? " like" : " likes"}`}</span>}
          </div>
          <FontAwesomeIcon 
            icon={farComments} 
            className={styles.comments}
            onClick={() => setShowLikes(false)}
          />
        </div>

        {!showLikes && <div className={styles.postComments}>
            {comments.length > 0 &&
              comments.map(
                comment =>
                    <Comment
                      key={comment._id}
                      comment={comment}
                      postId={post._id}
                      user={user}
                      setComments={setComments}
                    />
            )}
            <CommentInputField user={user} postId={post._id} setComments={setComments} />
          </div>}

          {showLikes && 
            <div className={styles.postLikes}>
              {!loading && likesList.length > 0 && <div>
                {likesList.map(like=> <LikesListUser key={like._id} user={like.user} expand />)}
              </div>}
              {loading && <Spinner className={styles.likesLoader} />}
            </div>
          }
    </Card> : <NoPostFound />}
    </>
  );
}

PostPage.getInitialProps = async ctx => {
  try {
    const { postId } = ctx.query;
    const { token } = parseCookies(ctx);

    const res = await axios.get(`${baseUrl}/api/posts/${postId}`, {
      headers: { Authorization: token }
    });

    return { post: res.data };
  } catch (error) {
    return { errorLoading: true };
  }
};