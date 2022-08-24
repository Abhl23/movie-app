import React from "react";

import { data } from "../data";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import { addMovies, setShowFavourites } from "../actions";

class App extends React.Component {
  componentDidMount() {
    const { store } = this.props;

    //subscribe to the store
    store.subscribe(() => {
      console.log("UPDATED");

      this.forceUpdate();
    });

    //make an api call

    //dispatch an action
    store.dispatch(addMovies(data));

    // console.log("STATE", store.getState());
  }

  isMovieFavourite = (movie) => {
    const { favourites } = this.props.store.getState();

    const index = favourites.indexOf(movie);

    if (index !== -1) {
      // found the movie
      return true;
    }

    return false;
  };

  handleChangeTab = (value) => {
    this.props.store.dispatch(setShowFavourites(value));
  };

  render() {
    const { list, favourites, showFavourites } = this.props.store.getState(); // state = {list: [], favourites: [], showFavourites: boolean}

    const displayMovies = showFavourites ? favourites : list;

    console.log("RENDER", this.props.store.getState());

    return (
      <div className="App">
        <Navbar />
        <div className="main">
          <div className="tabs">
            <div
              className={`tab ${showFavourites ? "" : "active-tabs"}`}
              onClick={() => this.handleChangeTab(false)}
            >
              Movies
            </div>
            <div
              className={`tab ${showFavourites ? "active-tabs" : ""}`}
              onClick={() => this.handleChangeTab(true)}
            >
              Favourites
            </div>
          </div>

          <div className="list">
            {displayMovies.map((movie, index) => (
              <MovieCard
                movie={movie}
                key={`movie-${index}`}
                dispatch={this.props.store.dispatch}
                isFavourite={this.isMovieFavourite(movie)}
              />
            ))}
          </div>
          {displayMovies.length === 0 ? <div className="no-movies">No movies added yet!</div> : ''}
        </div>
      </div>
    );
  }
}

export default App;
