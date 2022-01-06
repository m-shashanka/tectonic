import axios from "axios";
import baseUrl from "./baseUrl";
import catchErrors from "./catchErrors";
import cookie from "js-cookie";
import Router from "next/router";

const Axios = axios.create({
  baseURL: `${baseUrl}/api/profile`,
  headers: { Authorization: cookie.get("token") }
});

export const followUser = async (userToFollowId, setUserFollowStats) => {
  try {
    await Axios.post(`/follow/${userToFollowId}`);

    setUserFollowStats(prev => ({
      ...prev,
      following: [...prev.following, { user: userToFollowId }]
    }));
  } catch (error) {
    alert(catchErrors(error));
  }
};

export const unfollowUser = async (userToUnfollowId, setUserFollowStats) => {
  try {
    await Axios.put(`/unfollow/${userToUnfollowId}`);

    setUserFollowStats(prev => ({
      ...prev,
      following: prev.following.filter(following => following.user !== userToUnfollowId)
    }));
  } catch (error) {
    alert(catchErrors(error));
  }
};

export const profileUpdate = async (profile, setLoading, setError, profilePicUrl,username) => {
  try {
    const {name,bio} = profile;

    if(!name || name.length < 1){
      setError('Name cannot be empty');
      return;
    }

    await Axios.post(`/update`, {name,bio,profilePicUrl});

    setLoading(false);
    Router.replace(`/${username}`);
  } catch (error) {
    setError(catchErrors(error));
    setLoading(false);
  }
};

export const passwordUpdate = async (setSuccess, userPasswords, setError) => {
  const { currentPassword, newPassword } = userPasswords;
  try {
    await Axios.post(`/settings/password`, { currentPassword, newPassword });
    setSuccess(true);
  } catch (error) {
    setError(catchErrors(error));
  }
};

export const toggleMessagePopup = async (popupSetting, setPopupSetting) => {
  try {
    await Axios.post(`/settings/messagePopup`);
    setPopupSetting(!popupSetting);
  } catch (error) {
    alert(catchErrors(error));
  }
};
