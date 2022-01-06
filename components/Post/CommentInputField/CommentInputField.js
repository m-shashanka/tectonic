import { useState } from "react";
import { postComment } from "../../../utils/postActions";
import styles from "./commentInputField.module.css";

function CommentInputField({ postId, user, setComments, socket }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () =>{
    if(loading || !text || text.trim().length === 0)
      return;

    setLoading(true);

    await postComment(postId, user, text, setComments, setText);

    if(socket.current)
      socket.current.emit("commentOnPost",{ postId, userId: user._id});
    
    setLoading(false);
  }

  return (
    <div className={styles.yourComment}>
      <input
        type="text"
        placeholder="Add comment"
        name="comment"
        value={text}
        onChange={e=>setText(e.target.value)}
      />
      <img src="/send.png" alt="send" onClick={handleSubmit}/>
    </div>
  );
}

export default CommentInputField;