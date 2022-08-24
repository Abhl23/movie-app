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
  }

  isMovieFavourite = (movie) => {
    const { movies } = this.props.store.getState();

    const index = movies.favourites.indexOf(movie);

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
    const {movies}=this.props.store.getState(); // state = {movies: {}, search: {}}

    const { list, favourites, showFavourites } = movies; 

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
