import React, { useState } from "react";
import Card from "../../Layout/Card/Card";
import Modal from "../../Layout/Modal/Modal";
import CreatePostModal from "./CreatePostModal/CreatePostModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faImage, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import styles from "./createPost.module.css";

function CreatePost({ user, setPosts }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Card
        className={styles.createPostCard}
        onClick={() => setShowModal(true)}
      >
        <div className={styles.createPost}>
          <div className={styles.userPic}>
            <img
              src={user.profilePicUrl}
              alt="Profile Pic"
            />
          </div>
          <p>What's on your mind, {user.username}?</p>
        </div>
        <div className={styles.options}>
          <p>
            <FontAwesomeIcon icon={faEdit} className={styles.item} />
            &ensp;Create Post
          </p>
          <p>
            <FontAwesomeIcon icon={faImage} className={styles.item} />
            &ensp;Photo
          </p>
          <p>
            <FontAwesomeIcon icon={faMapMarkerAlt} className={styles.item} />
            &ensp;Check in
          </p>
        </div>
      </Card>
      {showModal && (
        <Modal closeModal={() => setShowModal(false)}>
          <CreatePostModal
            user={user}
            setPosts={setPosts}
            closeModal={() => setShowModal(false)}
          />
        </Modal>
      )}
    </>
  );
}

export default CreatePost;