import axios from "axios";
import { apiUrl } from "../../Utils/Utils";

export const GET_POSTS = "GET_POSTS";
export const CREATE_POST = "CREATE_POST";
export const LIKE_POST = "LIKE_POST";
export const UNLIKE_POST = "UNLIKE_POST";
export const DELETE_POST = "DELETE_POST";
export const DELETE_COMMENT = "DELETE_COMMENT";

// comments
export const ADD_COMMENT = "ADD_COMMENT";
export const LIKE_COMMENT = "LIKE_COMMENT";
export const UNLIKE_COMMENT = "UNLIKE_COMMENT";

//Reply
export const ADD_REPLY = "ADD_COMMENT";
export const DELETE_REPLY = "DELETE_REPLY";

export const GET_POST_ERRORS = "GET_POST_ERRORS";

export const getPosts = () => {
  return (dispatch) => {
    return axios
      .get(`${apiUrl}/post`)
      .then((res) => {
        dispatch({ type: GET_POSTS, payload: res.data });
      })
      .catch((error) => console.log(error));
  };
};

export const createPost = (data) => {
  return (dispatch) => {
    return axios.post(`${apiUrl}/post`, data).then((res) => {
      if (res.data.error) {
        dispatch({ type: GET_POST_ERRORS, payload: res.data.error });
      } else {
        dispatch({ type: GET_POST_ERRORS, payload: "" });
      }
    });
  };
};

export const likePost = (postId, userId) => {
  return (dispatch) => {
    return axios
      .patch(`${apiUrl}/post/like-post/${postId}`, {
        userId,
      })
      .then(() => {
        dispatch({ type: LIKE_POST, payload: { postId, userId } });
      })
      .catch((error) => console.log(error));
  };
};

export const unlikePost = (postId, userId) => {
  return (dispatch) => {
    return axios
      .patch(`${apiUrl}/post/dislike-post/${postId}`, {
        userId,
      })
      .then(() => {
        dispatch({ type: UNLIKE_POST, payload: { postId, userId } });
      })
      .catch((error) => console.log(error));
  };
};

export const deletePost = (postId) => {
  return (dispatch) => {
    return axios
      .delete(`${apiUrl}/post/${postId}`)
      .then(() => {
        dispatch({ type: DELETE_POST, payload: { postId } });
      })
      .catch((error) => console.log(error));
  };
};

export const addComment = (postId, commenterId, text, commenterPseudo) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${apiUrl}/post/comment-post/${postId}`,
      data: { commenterId, text, commenterPseudo },
    })
      .then(() => {
        dispatch({ type: ADD_COMMENT, payload: { postId } });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteComment = (postId, commentId) => {
  return (dispatch) => {
    return axios({
      method: "patch",
      url: `${apiUrl}/post/delete-comment-post/${postId}`,
      data: { commentId },
    })
      .then(() => {
        dispatch({ type: DELETE_COMMENT, payload: { postId, commentId } });
      })
      .catch((err) => console.log(err));
  };
};

// export const likeComment = (commentId, userId) => {
//   return (dispatch) => {
//     return axios
//       .patch(`${apiUrl}/post/like-comment/${commentId}`, {
//         userId,
//       })
//       .then((res) => {
//         dispatch({ type: LIKE_COMMENT, payload: { commentId, userId } });
//       })
//       .catch((error) => console.log(error));
//   };
// };

// export const unlikeComment = (commentId, userId) => {
//   return (dispatch) => {
//     return axios
//       .patch(
//         `${apiUrl}/post/dislike-comment/${commentId}`,
//         {
//           userId,
//         }
//       )
//       .then((res) => {
//         dispatch({ type: UNLIKE_COMMENT, payload: { commentId, userId } });
//       })
//       .catch((error) => console.log(error));
//   };
// };

// actions/post.actions.js

export const addReply = (commentId, replierId, text, replierPseudo) => {
  return (dispatch) => {
    return axios
      .patch(`${apiUrl}/post/${commentId}/reply`, {
        replierId,
        text,
        replierPseudo,
      })
      .then(() => {
        const replyData = {
          commentId,
          replierId,
          text,
          replierPseudo,
        };
        dispatch({ type: ADD_REPLY, payload: replyData });
      })
      .catch((err) => console.log(err));
  };
};

export const deleteReply = (commentId, replierId) => {
  return (dispatch) => {
    return axios
      .patch(`${apiUrl}/post/${commentId}/reply-delete`, {
        replierId,
      })
      .then(() => {
        dispatch({ type: DELETE_REPLY, payload: { commentId, replierId } });
      })
      .catch((err) => console.log(err));
  };
};
