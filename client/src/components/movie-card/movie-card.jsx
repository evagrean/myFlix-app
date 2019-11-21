import React from 'react';

export class MovieCard extends React.Component {
  render() {
    // This is given to the <MovieCard/> component by the outer world (in this case: `MainView, as this is what's connected to database via movies endpoint of API)
    const { movie, onClick } = this.props;

    return (
      <div onClick={() => onClick(movie)} className="movie-card">
        {movie.Title}
      </div>
    );
  }
}