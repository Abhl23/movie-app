import { combineReducers } from "redux";

import {
  ADD_MOVIES,
  ADD_TO_FAVOURITES,
  REMOVE_FROM_FAVOURITES,
  SET_SHOW_FAVOURITES,
} from "../actions";

const initialMoviesState = {
  list: [],
  favourites: [],
  showFavourites: false,
};

export function movies(state = initialMoviesState, action) {
  console.log("MOVIES REDUCER");

  switch (action.type) {
    case ADD_MOVIES:
      return {
        ...state,
        list: action.movies,
      };
    case ADD_TO_FAVOURITES:
      return {
        ...state,
        favourites: [action.movie, ...state.favourites],
      };
    case REMOVE_FROM_FAVOURITES:
      const newFavourites = state.favourites.filter(
        (movie) => movie !== action.movie
      );

      return {
        ...state,
        favourites: newFavourites,
      };
    case SET_SHOW_FAVOURITES:
      return {
        ...state,
        showFavourites: action.value,
      };
    default:
      return state;
  }
}

const initialSearchState = {
  result: {},
};

export function search(state = initialSearchState, action) {
  console.log("SEARCH REDUCER");

  return state;
}


export default combineReducers({
  movies,
  search
});

// combining reducers manually
// const initialRootState = {
//   movies: initialMoviesState,
//   search: initialSearchState,
// };

// export default function rootReducer(state = initialRootState, action) {
//   return {
//     movies: movies(state.movies, action),
//     search: search(state.search, action),
//   };
// }
