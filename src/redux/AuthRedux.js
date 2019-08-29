import { createReducer, createActions } from 'reduxsauce';
import get from 'lodash/get';

const { Types, Creators } = createActions({
  setToken: ['token'],
  setCurrentVenue: ['venue'],
  setAllVenues: ['allVenues'],
  setUser: ['user'],
  logout: []
});

export const AuthTypes = Types;
export default Creators;

/* ------- Initial State ---------- */
export const INITIAL_STATE = {
  token: null,
  venue: null,
  user: null,
  allVenues: []
};

/* ------- Selectors ---------- */
export const AuthSelectors = {
  selectUser: state => state.auth.user,
  selectUsername: state => {
    const user = state.auth.user;

    if (!user) {
      return 'Guest';
    }

    return `${user.firstName} ${user.lastName}`;
  },
  selectToken: state => state.auth.token,
  selectCurrentVenue: state => state.auth.venue,
  selectVenueId: state => get(state, 'auth.venue.id'),
  selectAllVenues: state => state.auth.allVenues,
  selectLoggedIn: state => !!state.auth.token
};

/* -------- Reducers --------- */
export const setToken = (state, { token }) => ({
  ...state,
  token
});

export const setCurrentVenue = (state, { venue }) => ({
  ...state,
  venue
});

export const setAllVenues = (state, { allVenues }) => ({
  ...state,
  allVenues
});

export const setUser = (state, { user }) => ({ ...state, user });

export const logout = () => ({ ...INITIAL_STATE });

/* -------- Hookup Reducers to Types -------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_TOKEN]: setToken,
  [Types.SET_CURRENT_VENUE]: setCurrentVenue,
  [Types.SET_ALL_VENUES]: setAllVenues,
  [Types.SET_USER]: setUser,
  [Types.LOGOUT]: logout
});
