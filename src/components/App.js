import React from "react";

import { data } from "../data";
import Navbar from "./Navbar";
import MovieCard from "./MovieCard";

class App extends React.Component {
  componentDidMount() {
    const { store } = this.props;

    //subscribe to the store
    store.subscribe(() => {
      console.log('UPDATED');

      this.forceUpdate();
    });

    //make an api call

    //dispatch an action
    store.dispatch({
      type: 'ADD_MOVIES',
      movies: data
    });

    console.log('STATE', store.getState());
  }

  render() {
    const movies = this.props.store.getState();
    console.log("RENDER");

    return (
      <div className="App">
        <Navbar />
        <div className="main">
          <div className="tabs">
            <div className="tab">Movies</div>
            <div className="tab">Favourites</div>
          </div>

          <div className="list">
            {movies.map((movie, index) => (
              <MovieCard movie={movie} key={`movie-${index}`} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
