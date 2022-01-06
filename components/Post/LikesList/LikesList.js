import { useEffect, useRef, useState } from "react";
import catchErrors from "../../../utils/catchErrors";
import { Axios } from "../../../utils/postActions";
import LikesListUser from "./LikesListUser/LikesListUser";
import styles from "./likesList.module.css";

export default function LikesList({likes, showAllLikes, postId}) {
  const ref = useRef();

  const [showLikesList, setShowLikesList] = useState(false);

  const [likesList, setLikesList] = useState([]);
  const [loading, setLoading] = useState(false);

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
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setShowLikesList(false);
        setLikesList([]);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <span
      ref={ref}
      className={styles.likes}
      onClick={() => {
          setShowLikesList(true);
          getLikesList();
        }
      }
    >
      {`${likes.length} ${likes.length === 1 ? " like" : " likes"}`}
      {showLikesList && (
        <div className={styles.container}>
          <div className={styles.likesContainer}>
            {loading && <PlaceHolder />}
            {!loading && likesList.length && 
              likesList.map((like,i) =>(
                (i < 3) && <LikesListUser key={like._id} user={like.user} />
              ))
            }
            {!loading && likesList.length > 3 && <span onClick={showAllLikes}>Show All</span>}
          </div>
        </div>
      )}
    </span>
  );
}

export const PlaceHolder = () => {
  var list = [];

  for (var i = 0; i < 4; i++)
    list.push(
      <div key={i} className={styles.item}>
        <div className={styles.circle}></div>
        <div className={styles.line}></div>
      </div>
    );

  return <div className={styles.loadingContainer}>{list}</div>;
};