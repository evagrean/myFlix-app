import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';
import './movies-list.scss';

const mapStateToProps = state => {
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MoviesList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!movies) return <div className="main-view" />;

  return <div className="movies-list">
    <Row>
      <VisibilityFilterInput visibilityFilter={visibilityFilter} />
    </Row>

    <Row>
      {filteredMovies.map(m =>
        <Row>
          <Col key={m._id} xs={12} sm={6} md={4} lg={3} className="card-margin">
            <MovieCard key={m._id} movie={m} />
          </Col>
        </Row>)}
    </Row>
  </div>;

}

export default connect(mapStateToProps)(MoviesList);

MoviesList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      Title: PropTypes.string,
      ReleaseYear: PropTypes.string,
      ImagePath: PropTypes.string,
      Description: PropTypes.string,
      Genre: PropTypes.shape({
        Name: PropTypes.string,
        Description: PropTypes.string
      }),
      Director: PropTypes.shape({
        Name: PropTypes.string,
        Bio: PropTypes.string,
        Birth: PropTypes.string,
        Death: PropTypes.string
      }),
      Featured: PropTypes.boolean,
      Actors: PropTypes.array
    })
  ).isRequired
};


