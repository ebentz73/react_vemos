import { createReducer, createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  startup: null,
  setLoading: ['loading'],
  setLoaded: ['loaded'],
  loadTimezone: null,
  setTimezone: ['timezone'],
  setEndOfNight: ['endOfNight']
});

export const AppTypes = Types;
export default Creators;

/* ------- Initial State --------- */
export const INITIAL_STATE = {
  loading: false,
  loaded: false,
  timezone: null,
  endOfNight: null
};

/* ------- Selectors --------- */
export const AppSelectors = {
  selectLoading: state => state.app.loading,
  selectLoaded: state => state.app.loaded,
  selectTimezone: state => state.app.timezone,
  selectEndOfNight: state => state.app.endOfNight
};

/* -------- Reducers ---------- */
export const setLoading = (state, { loading }) => ({
  ...state,
  loading
});

export const setLoaded = (state, { loaded }) => ({
  ...state,
  loaded
});

export const setEndOfNight = (state, { endOfNight }) => ({
  ...state,
  endOfNight
});

export const setTimezone = (state, { timezone }) => ({
  ...state,
  timezone
});

/* -------- Hookup Reducers to Types -------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_LOADING]: setLoading,
  [Types.SET_LOADED]: setLoaded,
  [Types.SET_TIMEZONE]: setTimezone,
  [Types.SET_END_OF_NIGHT]: setEndOfNight
});
