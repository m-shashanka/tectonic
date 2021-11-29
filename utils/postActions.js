import axios from "axios";
import baseUrl from "./baseUrl";
import catchErrors from "./catchErrors";
import cookie from "js-cookie";

export const Axios = axios.create({
  baseURL: `${baseUrl}/api/posts`,
  headers: { Authorization: cookie.get("token") }
});

export const submitNewPost = async (
  text,
  location,
  picUrl,
  setPosts,
  setError
) => {
  try {
    const res = await Axios.post("/", { text, location, picUrl });

    setPosts(prev => [res.data, ...prev]);
  } catch (error) {
    const errorMsg = catchErrors(error);
    setError(errorMsg);
  }
};

export const deletePost = async (postId, setPosts, setShowToastr) => {
  try {
    await Axios.delete(`/${postId}`);
    setPosts(prev => prev.filter(post => post._id !== postId));
    setShowToastr(true);
  } catch (error) {
    alert(catchErrors(error));
  }
};

export const likePost = async (postId, userId, setLikes, like = true) => {
  if (like) {
    try{
      setLikes(prev => [...prev, { user: userId }]);
      await Axios.post(`/like/${postId}`);
    } catch(error){
      alert(catchErrors(error));
      setLikes(prev => prev.filter(like => like.user !== userId));
    }
  }
  else if (!like) {
    try{
      setLikes(prev => prev.filter(like => like.user !== userId));
      await Axios.put(`/unlike/${postId}`);
    } catch(error){
      alert(catchErrors(error));
      setLikes(prev => [...prev, { user: userId }]);
    }
  }
};

export const postComment = async (postId, user, text, setComments, setText) => {
  if(!text || text.trim().length === 0)
    return;
  try {
    const res = await Axios.post(`/comment/${postId}`, { text });

    const newComment = {
      _id: res.data,
      user,
      text,
      date: Date.now()
    };

    setComments(prev => [newComment, ...prev]);
    setText("");
  } catch (error) {
    alert(catchErrors(error));
  }
};

export const deleteComment = async (postId, commentId, setComments) => {
  try {
    await Axios.delete(`/${postId}/${commentId}`);
    setComments(prev => prev.filter(comment => comment._id !== commentId));
  } catch (error) {
    alert(catchErrors(error));
  }
};
