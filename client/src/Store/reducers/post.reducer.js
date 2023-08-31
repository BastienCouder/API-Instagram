import {
  DELETE_COMMENT,
  DELETE_POST,
  DELETE_REPLY,
  GET_POSTS,
  // LIKE_COMMENT,
  LIKE_POST,
  // UNLIKE_COMMENT,
  UNLIKE_POST,
} from "../actions/post.actions";

const initialState = null;

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
      return action.payload;
    case LIKE_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            likers: [action.payload.userId, ...post.likers],
          };
        }
        return post;
      });
    case UNLIKE_POST:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            likers: post.likers.filter((id) => id !== action.payload.userId),
          };
        }
        return post;
      });
    case DELETE_POST:
      return state.filter((post) => post._id !== action.payload.postId);

    case DELETE_COMMENT:
      return state.map((post) => {
        if (post._id === action.payload.postId) {
          return {
            ...post,
            comments: post.comments.filter(
              (comment) => comment._id !== action.payload.commentId
            ),
          };
        } else return post;
      });
    // case LIKE_COMMENT:
    //   return state.map((post) => {
    //     if (post._id === action.payload.postId) {
    //       const updatedComments = post.comments.map((comment) => {
    //         if (comment._id === action.payload.commentId) {
    //           return {
    //             ...comment,
    //             likers: [action.payload.userId, ...comment.likers],
    //           };
    //         }
    //         return comment;
    //       });

    //       return {
    //         ...post,
    //         comments: updatedComments,
    //       };
    //     }
    //     return post;
    //   });

    // case UNLIKE_COMMENT:
    //   return state.map((post) => {
    //     if (post._id === action.payload.postId) {
    //       const updatedComments = post.comments.map((comment) => {
    //         if (comment._id === action.payload.commentId) {
    //           return {
    //             ...comment,
    //             likers: comment.likers.filter(
    //               (id) => id !== action.payload.userId
    //             ),
    //           };
    //         }
    //         return comment;
    //       });

    //       return {
    //         ...post,
    //         comments: updatedComments,
    //       };
    //     }
    //     return post;
    //   });
    case DELETE_REPLY:
      return state.map((comment) => {
        if (comment._id === action.payload.commentId) {
          return {
            ...comment,
            repliers: comment.repliers.filter(
              (replier) => replier._id !== action.payload.replierId
            ),
          };
        } else return comment;
      });

    default:
      return state;
  }
}
