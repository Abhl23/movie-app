import React from "react";
import ReactDOM from "react-dom/client";
import { applyMiddleware, createStore } from "redux";

import "./index.css";
import App from "./components/App";
import rootReducer from "./reducers";

// logger(obj, next, action)
// redux will call the middleware internally as logger(obj)(next)
const logger = function ({ dispatch, getState }) {
  return function(next){
    return function(action){
      // middleware code
      console.log('ACTION_TYPE :', action.type);

      next(action);
    }
  }
};

const store = createStore(rootReducer, applyMiddleware(logger));
console.log("store", store);


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <App store={store} />
  // </React.StrictMode>
);
