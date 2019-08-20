import moment from 'moment';
import { createReducer, createActions } from 'reduxsauce';

const { Types, Creators } = createActions({
  loadTransactions: null,
  setTransactions: ['transactions', 'count', 'stats'],
  setTransactionFilter: ['filters'],
  setTransactionSorts: ['sorts'],
  setTransactionDisplay: ['display'],
  setTransactionPagination: ['page', 'rowsPerPage']
});

export const TransactionTypes = Types;
export default Creators;

/* ------- Initial State --------- */
export const INITIAL_STATE = {
  transactions: [],
  loading: false,
  count: 0,
  stats: {
    total: 0,
    cashTotal: 0,
    creditTotal: 0,
    compedTotal: 0,
    compedCount: 0
  },
  options: {
    filters: {
      timestamp: [
        moment()
          .subtract(30, 'day')
          .format(),
        moment().format()
      ]
    },
    sorts: {
      timestamp: 'desc'
    },
    display: {
      timestamp: true,
      transaction_type: true,
      guest_id: true,
      payment_method: true,
      amount: true,
      amount_refunded: true
    },
    page: 0,
    rowsPerPage: 10
  }
};

/* ------- Selectors --------- */
export const TransactionSelectors = {
  selectTransactions: state => state.transaction.transactions,
  selectCount: state => state.transaction.count,
  selectStats: state => state.transaction.stats,
  selectTransactionOptions: state => state.transaction.options
};

/* -------- Reducers ---------- */
export const setTransactionFilter = (state, { filters }) => ({
  ...state,
  options: {
    ...state.options,
    page: 0,
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

export const setTransactionDisplay = (state, { display }) => ({
  ...state,
  options: {
    ...state.options,
    display
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

export const setTransactions = (state, { transactions, count, stats }) => ({
  ...state,
  transactions,
  count,
  stats: {
    ...state.stats,
    ...stats
  }
});

/* -------- Hookup Reducers to Types -------- */
export const reducer = createReducer(INITIAL_STATE, {
  [Types.SET_TRANSACTION_FILTER]: setTransactionFilter,
  [Types.SET_TRANSACTION_SORTS]: setTransactionSorts,
  [Types.SET_TRANSACTION_DISPLAY]: setTransactionDisplay,
  [Types.SET_TRANSACTION_PAGINATION]: setTransactionPagination,
  [Types.SET_TRANSACTIONS]: setTransactions
});
