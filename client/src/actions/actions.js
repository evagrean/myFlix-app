export const SET_MOVIES = 'SET_MOVIES';
export const SET_FILTER = 'SET_FILTER';
export const SET_USER_PROFILE = 'SET_LOGGEDIN_USER';

export function setMovies(value) {
  return { type: SET_MOVIES, value };
}

export function setFilter(value) {
  return { type: SET_FILTER, value };
}

export function setUserProfile(value) {
  return { type: SET_USER_PROFILE, value }
}

