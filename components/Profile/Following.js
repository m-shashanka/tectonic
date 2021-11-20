import React, { useState, useEffect } from "react";
import { Button, Image, List } from "semantic-ui-react";
import Spinner from "../Layout/Spinner/Spinner";
import Friend from "./Friends/Friend";
import { NoFollowData } from "../Layout/NoData";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import cookie from "js-cookie";

const Following = ({
  user,
  loggedUserFollowStats,
  setUserFollowStats,
  profileUserId
}) => {
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getFollowing = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${baseUrl}/api/profile/following/${profileUserId}`, {
          headers: { Authorization: cookie.get("token") }
        });

        setFollowing(res.data);
      } catch (error) {
        alert("Error Loading Followers");
      }
      setLoading(false);
    };

    getFollowing();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : following.length > 0 ? (
        following.map(profileFollowing => {
          /*  */

          const isFollowing =
            loggedUserFollowStats.following.length > 0 &&
            loggedUserFollowStats.following.filter(
              following => following.user === profileFollowing.user._id
            ).length > 0;

          return (
            <Friend 
                key={profileFollowing.user._id}
                showButton={profileFollowing.user._id !== user._id}
                isFollowing={isFollowing}
                friend={profileFollowing.user}
                updateStats={setUserFollowStats}
            />
          );
        })
      ) : (
        <NoFollowData followingComponent={true} />
      )}
    </>
  );
};

export default Following;
