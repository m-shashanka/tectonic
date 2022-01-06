import { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
import baseUrl from "../utils/baseUrl";
import cookie from "js-cookie";
import CreatePost from "../components/Post/CreatePost/CreatePost";
import CardPost from "../components/Post/CardPost/CardPost";
import { PostDeleteToastr } from "../components/Layout/Toastr";
import { parseCookies } from "nookies";
import { NoPosts } from "../components/Layout/NoData/NoData";
import InfiniteScroll from "react-infinite-scroll-component";

function Index({ user, postsData, errorLoading }) {
  const [posts, setPosts] = useState(postsData || []);
  const [showToastr, setShowToastr] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [pageNumber, setPageNumber] = useState(2);

  const socket = useRef();

  useEffect(() => {
    if (!socket.current) {
      const token = cookie.get("token");
      socket.current = io(baseUrl, { auth: { token } });
    }

    return () => {
      socket.current && socket.current.disconnect();
    };
  }, []);

  useEffect(() => {
    showToastr && setTimeout(() => setShowToastr(false), 3000);
  }, [showToastr]);

  const fetchDataOnScroll = async () => {
    try {
      const res = await axios.get(`${baseUrl}/api/posts`, {
        headers: { Authorization: cookie.get("token") },
        params: { pageNumber },
      });

      if (res.data.length === 0) setHasMore(false);

      setPosts((prev) => [...prev, ...res.data]);
      setPageNumber((prev) => prev + 1);
    } catch (error) {
      alert("Error fetching Posts");
    }
  };

  return (
    <>
      {showToastr && <PostDeleteToastr />}

      <CreatePost user={user} setPosts={setPosts} />
      {errorLoading || posts.length === 0 ? <NoPosts /> : (
        <InfiniteScroll
          hasMore={hasMore}
          next={fetchDataOnScroll}
          loader={<h4 style={{ textAlign: "center", marginBottom: "10px" }}>Loading...</h4>}
          endMessage={<p style={{ textAlign: "center", marginBottom: "10px" }}><b>Yay! You have seen it all.</b></p>}
          dataLength={posts.length}
          style={{ overflow: "visible" }}
        >
          {posts.map((post) => (
            <CardPost
              socket={socket}
              key={post._id}
              post={post}
              user={user}
              setPosts={setPosts}
              setShowToastr={setShowToastr}
            />
          ))}
        </InfiniteScroll>
      )}
    </>
  );
}

Index.getInitialProps = async (ctx) => {
  try {
    const { token } = parseCookies(ctx);

    const res = await axios.get(`${baseUrl}/api/posts`, {
      headers: { Authorization: token },
      params: { pageNumber: 1 }, //will be available on backend in request.query
    });

    return { postsData: res.data };
  } catch (error) {
    return { errorLoading: true };
  }
};

export default Index;