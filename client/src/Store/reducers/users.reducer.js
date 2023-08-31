import { GET_ALLUSERS } from "../actions/users.actions";

const initialState = null;

export default function usersReducer(state = initialState, action) {
  switch (action.type) {
    case GET_ALLUSERS:
      return action.payload;

    default:
      return state;
  }
}
