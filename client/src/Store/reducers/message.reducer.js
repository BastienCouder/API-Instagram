import {
  DELETE_MESSAGE,
  EDIT_MESSAGE,
  GET_MESSAGES,
} from "../actions/message.actions";

const initialState = null;

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_MESSAGES:
      return action.payload;
    case EDIT_MESSAGE:
      return state.map((message) =>
        message._id === action.payload._id
          ? { ...message, ...action.payload }
          : message
      );
    case DELETE_MESSAGE:
      return state.filter(
        (message) => message._id !== action.payload.messageId
      );
    default:
      return state;
  }
}
