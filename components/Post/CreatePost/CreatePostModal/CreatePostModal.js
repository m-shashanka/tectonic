import { useState, useRef} from "react";
import Button from "../../../Layout/Button/Button";
import uploadPic from "../../../../utils/uploadPicToCloudinary";
import { submitNewPost } from "../../../../utils/postActions";
import Spinner from "../../../Layout/Spinner/Spinner";
import styles from './createPostModal.module.css';

export default function CreatePostModal({closeModal}){

    const [newPost,setNewPost] = useState({text:"",location:""});
    const [loading,setLoading] = useState(false);
    const [serverError,setServerError] = useState(null);

    const [text,setText] = useState("");
    const [location,setLocation] = useState("");

    const [addLocation,setAddLocation] = useState(false);

    const [mediaPreview, setMediaPreview] = useState(null);
    const [media, setMedia] = useState(null);
    const inputRef = useRef();

    const handleChange = e => {
      const {files} = e.target;
      if(!files || files.length < 1)
          return;
      setMedia(files[0]);
      setMediaPreview(URL.createObjectURL(files[0]));
    };
    
    const isValid = txt => (txt && txt.trim().length > 0);

    const submitPost = () =>{
      if(!isValid(text))
        return;
    }

    return (
      <>
        <div className={styles.title}>
          <h3>New Post</h3>
          <i className="fas fa-times" onClick={closeModal}/>
        </div>
        <div className={styles.content}>
          <textarea placeholder="Write something..." rows="3" value={text} onChange={(e)=>setText(e.target.value)}/>
          <input
            style={{ display: "none" }}
            type="file"
            accept="image/"
            onChange={handleChange}
            name="media"
            ref={inputRef}
          />
          {mediaPreview && <img src={mediaPreview} onClick={()=>inputRef.current.click()}/>}
          {addLocation && <input placeholder="Location" value={location} onChange={(e)=>setLocation(e.target.value)} />}
        </div>
        <div className={styles.footer}>
          <div className={styles.photoLocation}>
            <p onClick={()=>inputRef.current.click()}><i className="fas fa-image" />&ensp;Add Photo</p>
            <p onClick={()=>setAddLocation(true)}><i className="fas fa-map-marker-alt" />&ensp;Add Location</p>
          </div>
          {loading && <Spinner className={styles.loading}/>}
          {!loading && <Button onClick={submitPost} className={isValid(text) ? styles.publishPost : styles.disableSubmit}>Publish</Button>}
        </div>
        {serverError && <p style={{color:"red",background:"white",padding:"10px"}}>{serverError}</p>}
      </>
    );
  }