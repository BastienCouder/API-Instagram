import { GET_POST_ERRORS } from "../actions/post.actions";
import { GET_UPLOAD_ERRORS, GET_USER_ERRORS } from "../actions/user.actions";

const initialState = { userError: [], postError: [], uploadError: [] };

export default function errorReducer(state = initialState, action) {
  switch (action.type) {
    case GET_POST_ERRORS:
      return {
        postError: action.payload,
        uploadError: [],
        userError: [],
      };
    case GET_UPLOAD_ERRORS:
      return {
        postError: [],
        uploadError: action.payload,
        userError: [],
      };
    case GET_USER_ERRORS:
      return {
        postError: [],
        uploadError: [],
        userError: action.payload,
      };
    default:
      return state;
  }
}
