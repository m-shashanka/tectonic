import { useEffect, useRef, useState } from "react";
import { deletePost } from "../../../../utils/postActions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import styles from "./deletePost.module.css";

export default function DeletePost({
  id,
  setPosts,
  setShowToastr
}) {
  const ref = useRef();
  const [deletePostConfirmation, setDeletePostConfirmation] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setDeletePostConfirmation(false);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const delPost = async () => {
    await deletePost(id, setPosts, setShowToastr);
  };

  return (
    <div ref={ref} className={styles.deletePost} >
      <FontAwesomeIcon 
        icon={faTrash} 
        onClick={() => setDeletePostConfirmation(true)}
      />
      {deletePostConfirmation && (
        <div className={styles.showTop}>
          <p>Are you sure?</p>
          <p className={styles.finalDelete} onClick={delPost}>
            <FontAwesomeIcon icon={faTrash} className={styles.item} />
            &nbsp;Delete
          </p>
        </div>
      )}
    </div>
  );
}
