import React, { useState, useEffect } from "react";
import Spinner from "../Layout/Spinner/Spinner";
import Friend from "./Friends/Friend";
import { NoFollowData } from "../Layout/NoData/NoData";
import axios from "axios";
import baseUrl from "../../utils/baseUrl";
import cookie from "js-cookie";

const Followers = ({
  user,
  loggedUserFollowStats,
  setUserFollowStats,
  profileUserId
}) => {
  const [followers, setFollowers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getFollowers = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${baseUrl}/api/profile/followers/${profileUserId}`, {
          headers: { Authorization: cookie.get("token") }
        });

        setFollowers(res.data);
      } catch (error) {
        alert("Error Loading Followers");
      }
      setLoading(false);
    };

    getFollowers();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : followers.length > 0 ? (
        followers.map(profileFollower => {
          /*  */

          const isFollowing =
            loggedUserFollowStats.following.length > 0 &&
            loggedUserFollowStats.following.filter(
              following => following.user === profileFollower.user._id
            ).length > 0;

          return (
              <Friend 
                key={profileFollower.user._id}
                showButton={profileFollower.user._id !== user._id}
                isFollowing={isFollowing}
                friend={profileFollower.user}
                updateStats={setUserFollowStats}
              />
          );
        })
      ) : (
        <NoFollowData followersComponent={true} />
      )}
    </>
  );
};

export default Followers;
