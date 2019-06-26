import { createReducer, createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  startup: null,
  setLoading: ['loading'],
  setLoaded: ['loaded']
});

export const AppTypes = Types;
export default Creators;

/* ------- Initial State --------- */
export const INITIAL_STATE = {
  loading: false,
  loaded: false
};

/* ------- Selectors --------- */
export const AppSelectors = {
  selectLoading: state => state.app.loading,
  selectLoaded: state => state.app.loaded
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

/* -------- Hookup Reducers to Types -------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_LOADING]: setLoading,
  [Types.SET_LOADED]: setLoaded
});
