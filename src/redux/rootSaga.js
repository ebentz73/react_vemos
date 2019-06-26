import { all, takeLatest } from 'redux-saga/effects';
import { AppTypes } from './AppRedux';
import { startup } from './AppSaga';

export default function* root() {
  yield all([takeLatest(AppTypes.STARTUP, startup)]);
}
