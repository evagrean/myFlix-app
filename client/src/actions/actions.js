// The "action" is a JS Object that describes a change that we want to make. 
// Requirements: Object needs to have a type property, value should be a string

export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER_PROFILE = 'SET_USER_PROFILE';

export function setMovies(value) {
  return { type: SET_MOVIES, value };
}

export function setFilter(value) {
  return { type: SET_FILTER, value };
}

export function setUserProfile(value) {
  return { type: SET_USER_PROFILE, value }
}

