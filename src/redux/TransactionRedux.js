import { createReducer, createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  loadTransactions: null,
  setTransactions: ['transactions', 'count'],
  setTransactionFilter: ['filters'],
  setTransactionSorts: ['sorts'],
  setTransactionPagination: ['page', 'rowsPerPage']
});

export const TransactionTypes = Types;
export default Creators;

/* ------- Initial State --------- */
export const INITIAL_STATE = {
  transactions: [],
  loading: false,
  count: 0,
  options: {
    filters: {},
    sorts: {},
    page: 0,
    rowsPerPage: 10
  }
};

/* ------- Selectors --------- */
export const TransactionSelectors = {
  selectTransactions: state => state.transaction.transactions,
  selectCount: state => state.transaction.count,
  selectTransactionOptions: state => state.transaction.options
};

/* -------- Reducers ---------- */
export const setTransactionFilter = (state, { filters }) => ({
  ...state,
  options: {
    ...state.options,
    filters
  }
});

export const setTransactionSorts = (state, { sorts }) => ({
  ...state,
  options: {
    ...state.options,
    sorts
  }
});

export const setTransactionPagination = (state, { page, rowsPerPage }) => ({
  ...state,
  options: {
    ...state.options,
    page,
    rowsPerPage
  }
});

export const setTransactions = (state, { transactions, count }) => ({
  ...state,
  transactions,
  count
});

/* -------- Hookup Reducers to Types -------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_TRANSACTION_FILTER]: setTransactionFilter,
  [Types.SET_TRANSACTION_SORTS]: setTransactionSorts,
  [Types.SET_TRANSACTION_PAGINATION]: setTransactionPagination,
  [Types.SET_TRANSACTIONS]: setTransactions
});
