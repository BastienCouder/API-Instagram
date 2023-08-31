import axios from "axios";
import { apiUrl } from "../../Utils/Utils";

export const GET_USER = "GET_USER";
export const UPLOAD_PICTURE = "UPLOAD_PICTURE";
export const UPDATE_USER_PICTURE = "UPDATE_USER_PICTURE";
export const UPDATE_BIO = "UPDATE_BIO";
export const UPDATE_PSEUDO = "UPDATE_PSEUDO";
export const FOLLOW_USER = "FOLLOW_USER";
export const UNFOLLOW_USER = "UNFOLLOW_USER";
export const DELETE_USER = "DELETE_USER";

export const GET_USER_ERRORS = "GET_USER_ERRORS";
export const GET_UPLOAD_ERRORS = "GET_ULPOAD_ERRORS";

export const getUser = (uid) => {
  return (dispatch) => {
    return axios
      .get(`${apiUrl}user/${uid}`)
      .then((res) => {
        dispatch({ type: GET_USER, payload: res.data });
      })
      .catch((error) => console.log(error));
  };
};

export const uploadPicture = (data, id) => {
  return (dispatch) => {
    axios
      .post(`${apiUrl}user/profil`, data)
      .then((res) => {
        if (res.data.error) {
          dispatch({ type: GET_UPLOAD_ERRORS, payload: res.data.error });
        } else {
          dispatch({ type: GET_UPLOAD_ERRORS, payload: "" });
          dispatch({ type: UPLOAD_PICTURE, payload: res.data.picture });
        }
      })
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors de la mise à jour de l'image de profil :",
          error
        );
      });
    axios.get(`${apiUrl}user/${id}`);
  };
};

export const updateBio = (userId, bio) => {
  return (dispatch) => {
    return axios
      .put(`${apiUrl}user/${userId}`, { bio })
      .then((res) => {
        dispatch({ type: UPDATE_BIO, payload: res.data.bio });
      })
      .catch((error) => console.log(error));
  };
};

export const updatePseudo = (userId, pseudo) => {
  return (dispatch) => {
    return axios
      .put(`${apiUrl}user/${userId}`, { pseudo })
      .then((res) => {
        if (res.data.error) {
          dispatch({ type: GET_USER_ERRORS, payload: res.data.error });
        } else {
          dispatch({ type: GET_USER_ERRORS, payload: "" });
          dispatch({ type: UPDATE_PSEUDO, payload: res.data.pseudo });
        }
      })
      .catch((error) => console.log(error));
  };
};

export const followUser = (followerId, idToFollow) => {
  return (dispatch) => {
    return axios
      .patch(`${apiUrl}user/follow/${followerId}`, {
        idToFollow,
      })
      .then(() => {
        dispatch({ type: FOLLOW_USER, payload: { idToFollow } });
      })
      .catch((error) => console.log(error));
  };
};

export const UnFollowUser = (followerId, idToUnFollow) => {
  return (dispatch) => {
    return axios
      .patch(`${apiUrl}user/unfollow/${followerId}`, {
        idToUnFollow,
      })
      .then(() => {
        dispatch({ type: UNFOLLOW_USER, payload: { idToUnFollow } });
      })
      .catch((error) => console.log(error));
  };
};

export const deleteUser = (userId) => {
  return (dispatch) => {
    return axios
      .delete(`${apiUrl}user/${userId}`)
      .then(() => {
        dispatch({ type: DELETE_USER, payload: { userId } });
      })
      .catch((error) => console.log(error));
  };
};
