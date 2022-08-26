import React from "react";
import { connect } from "react-redux";

import { addToFavourites, removeFromFavourites } from "../actions";

class MovieCard extends React.Component {
  handleFavourite = () => {
    const { movie, dispatch } = this.props;
    dispatch(addToFavourites(movie));
  };

  handleUnfavourite = () => {
    const { movie, dispatch } = this.props;
    dispatch(removeFromFavourites(movie));
  };

  render() {
    const { movie, isFavourite } = this.props;

    return (
      <div className="movie-card">
        <div className="left">
          <img src={movie.Poster} alt="movie-poster" />
        </div>
        <div className="right">
          <div className="title">{movie.Title}</div>
          <div className="plot">{movie.Plot}</div>
          <div className="footer">
            <div className="rating">{movie.imdbRating}</div>
            {isFavourite ? (
              <button
                className="unfavourite-btn"
                onClick={this.handleUnfavourite}
              >
                Unfavourite
              </button>
            ) : (
              <button className="favourite-btn" onClick={this.handleFavourite}>
                Favourite
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const ConnectedMovieCardComponent=connect()(MovieCard);

export default ConnectedMovieCardComponent;
