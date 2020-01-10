import { combineReducers } from 'redux';

import { SET_MOVIES, SET_FILTER, SET_USER_PROFILE } from '../actions/actions';

function visibilityFilter(state = '', action) {
  switch (action.type) {
    case SET_FILTER:
      return action.value;
    default:
      return state;
  }
}

function movies(state = [], action) {
  switch (action.type) {
    case SET_MOVIES:
      return action.value;
    default:
      return state;
  }
}

function userProfile(state = {}, action) {
  switch (action.type) {
    case SET_USER_PROFILE:
      return action.value;
    default:
      return state;
  }
}

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  userProfile
});

export default moviesApp;