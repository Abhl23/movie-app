import React from "react";
import ReactDOM from "react-dom/client";
import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";

import "./index.css";
import App from "./components/App";
import rootReducer from "./reducers";

// logger(obj, next, action)
// redux will call the middleware internally as logger(obj)(next)
const logger =
  ({ dispatch, getState }) =>
  (next) =>
  (action) => {
    // logger code
    if (typeof action !== "function") {
      console.log("ACTION_TYPE :", action.type);
    }

    next(action);
  };

// const logger = function ({ dispatch, getState }) {
//   return function(next){
//     return function(action){
//       // middleware code
//       console.log('ACTION_TYPE :', action.type);

//       next(action);
//     }
//   }
// };

// thunk Middleware
// const thunk =
//   ({ dispatch, getState }) =>
//   (next) =>
//   (action) => {
//     if (typeof action === "function") {
//       action(dispatch);
//       return;
//     }

//     return next(action);
//   };

const store = createStore(rootReducer, applyMiddleware(logger, thunk));
console.log("store", store);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <App store={store} />
  // </React.StrictMode>
);
