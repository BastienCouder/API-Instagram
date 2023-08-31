import { combineReducers } from "redux";
import userReducer from "./user.reducer";
import usersReducer from "./users.reducer";
import postReducer from "./post.reducer";
import messageReducer from "./message.reducer";
import errorsReducer from "./errors.reducer";

const rootReducer = combineReducers({
  user: userReducer,
  Allusers: usersReducer,
  posts: postReducer,
  messages: messageReducer,
  error: errorsReducer,
});

export default rootReducer;
