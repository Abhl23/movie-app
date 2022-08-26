import React, { createContext } from "react";
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

export const StoreContext = createContext();
console.log("StoreContext", StoreContext);

class Provider extends React.Component {
  render() {
    return (
      <StoreContext.Provider value={store}>
        {this.props.children}
      </StoreContext.Provider>
    );
  }
}

// connect function => connect(callback)(Component)
export function connect(callback) {
  return function (Component) {
    class ConnectedComponent extends React.Component {
      constructor(props) {
        super(props);
        this.unsubscribe = this.props.store.subscribe(() => this.forceUpdate());
      }

      componentWillUnmount() {
        this.unsubscribe();
      }

      render() {
        const { store } = this.props;
        const state = store.getState();
        const dataToBePassedAsProps = callback(state);

        return (
          <Component {...dataToBePassedAsProps} dispatch={store.dispatch} />
        );
      }
    }

    class ConnectedComponentWrapper extends React.Component {
      render(){
        return (
          <StoreContext.Consumer>
            {(store) => <ConnectedComponent store={store} />}
          </StoreContext.Consumer>
        );
      }
    }

    return ConnectedComponentWrapper;
  };
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);
