import { all, takeLatest } from 'redux-saga/effects';
import { AppTypes } from './AppRedux';
import { TransactionTypes } from './TransactionRedux';
import { startup } from './AppSaga';
import { loadTransactions } from './TransactionSaga';

export default function* root() {
  yield all([
    takeLatest(AppTypes.STARTUP, startup),
    takeLatest(TransactionTypes.LOAD_TRANSACTIONS, loadTransactions)
  ]);
}
