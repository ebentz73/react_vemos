import { call, put } from 'redux-saga/effects';
import Cookies from 'js-cookie';
import history from '@utils/history';
import { refreshToken } from './AuthSaga';
import AppActions from './AppRedux';
import logger from '@utils/logger';
import notifier from '@utils/notifier';
import { getDomain } from '@utils/history';

export function* startup() {
  yield put(AppActions.setLoading(true));

  const domain = getDomain();
  logger.debug('Current domain', domain);

  // loading auth data from cookie
  try {
    const selectedVenue = JSON.parse(
      Cookies.get(process.env.WEB_APP_URL + '_selected', {
        domain
      })
    );
    const allVenues = JSON.parse(
      Cookies.get(process.env.WEB_APP_URL + '_venues', {
        domain
      })
    );

    logger.debug('Selected Venue', selectedVenue);
    logger.debug('All Venues', allVenues);

    if (selectedVenue && allVenues) {
      const { token, id } = selectedVenue;

      yield call(refreshToken, token, id);
    } else {
      history.push('/auth/login');
    }
  } catch (e) {
    logger.error(e);
    notifier.error('There was problem logging in');
    history.push('/auth/login');
  }

  yield put(AppActions.setLoading(false));
  yield put(AppActions.setLoaded(true));
}
