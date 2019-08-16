import { call, put, select } from 'redux-saga/effects';
import request from '@api/RestApi';
import TransactionActions, {
  TransactionSelectors
} from '@redux/TransactionRedux';
import transformFilters from '@containers/transactions/TransactionTable/transformFilters';

export function* loadTransactions() {
  const options = yield select(TransactionSelectors.selectTransactionOptions);

  const resp = yield call(request, 'listTransactions', {
    where: transformFilters(options.filters),
    order: Object.keys(options.sorts).map(key => [key, options.sorts[key]]),
    offset: options.page * options.rowsPerPage,
    limit: options.rowsPerPage
  });

  if (resp.ok) {
    const { rows, count, ...stats } = resp.data;
    const transactions = rows.map(r => ({
      ...r,
      areas: r.tables
    }));
    yield put(TransactionActions.setTransactions(transactions, count, stats));
  }
}
