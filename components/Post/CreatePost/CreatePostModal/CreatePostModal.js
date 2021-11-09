import { add } from "lodash";
import { useState } from "react";
import Button from "../../../Layout/Button/Button";
import styles from './createPostModal.module.css';

export default function CreatePostModal(){

    const [addLocation,setAddLocation] = useState(false);

    return (
      <>
        <div className={styles.title}>
          <h3>New Post</h3>
          <i className="fas fa-times" />
        </div>
        <div className={styles.content}>
          <textarea placeholder="Write something..." rows="3"/>
          {addLocation && <input placeholder="Location"/>}
        </div>
        <div className={styles.footer}>
          <div className={styles.photoLocation}>
            <p><i className="fas fa-image" />&ensp;Add Photo</p>
            <p onClick={()=>setAddLocation(true)}><i className="fas fa-map-marker-alt" />&ensp;Add Location</p>
          </div>
          <Button className={styles.publishPost}>Publish</Button>
        </div>
      </>
    );
  }