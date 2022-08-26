import React from "react";

import { data } from "../data";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";
import { addMovies, setShowFavourites } from "../actions";
import { connect } from "../";

class App extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;

    //make an api call

    //dispatch an action
    dispatch(addMovies(data));
  }

  isMovieFavourite = (movie) => {
    const { movies } = this.props;

    const index = movies.favourites.indexOf(movie);

    if (index !== -1) {
      // found the movie
      return true;
    }

    return false;
  };

  handleChangeTab = (value) => {
    this.props.dispatch(setShowFavourites(value));
  };

  render() {
    const { movies } = this.props; // state = {movies: {}, search: {}}

    const { list, favourites, showFavourites } = movies;

    const displayMovies = showFavourites ? favourites : list;

    console.log("RENDER", this.props);

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
                dispatch={this.props.dispatch}
                isFavourite={this.isMovieFavourite(movie)}
              />
            ))}
          </div>
          {displayMovies.length === 0 ? (
            <div className="no-movies">No movies added yet!</div>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  }
}

// class AppWrapper extends React.Component{
//   render(){
//     return (
//       <StoreContext.Consumer>
//         {(store) => <App store={store} />}
//       </StoreContext.Consumer>
//     );
//   }
// }

function mapStateToProps(state) {
  return {
    movies: state.movies,
    search: state.search,
  };
}

const ConnectedAppComponent = connect(mapStateToProps)(App);

export default ConnectedAppComponent;
