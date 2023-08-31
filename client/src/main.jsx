import "./Styles/index.css";
import ReactDOM from "react-dom/client";
import "./Styles/tailwind.css";
import App from "./App";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./Store/reducers";
import { getUsers } from "./Store/actions/users.actions";

// DevTools
import { composeWithDevTools } from "redux-devtools-extension";
import { getPosts } from "./Store/actions/post.actions";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

store.dispatch(getUsers());
store.dispatch(getPosts());

const root = document.getElementById("root");
const rootComponent = (
  <Provider store={store}>
    <App />
  </Provider>
);

// Utilisez createRoot au lieu de ReactDOM.render
const rootElement = ReactDOM.createRoot(root);
rootElement.render(rootComponent);

