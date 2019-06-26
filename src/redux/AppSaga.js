import { call, put } from 'redux-saga/effects';
import Cookies from 'js-cookie';
import history from '@utils/history';
import { refreshToken } from './AuthSaga';
import AppActions from './AppRedux';
import logger from '@utils/logger';

export function* startup() {
  yield put(AppActions.setLoading(true));

  // loading auth data from cookie
  const selectedVenue = Cookies.getJSON(process.env.WEB_APP_URL + '_selected');
  const allVenues = Cookies.getJSON(process.env.WEB_APP_URL + '_venues');

  logger.debug('Selected Venue', selectedVenue);
  logger.debug('All Venues', selectedVenue);

  if (selectedVenue && allVenues) {
    const { token, id } = selectedVenue;

    yield call(refreshToken, token, id);
  } else {
    history.push('/auth/login');
  }

  yield put(AppActions.setLoading(false));
  yield put(AppActions.setLoaded(true));
}
