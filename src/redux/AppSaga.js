import { call, put, select } from 'redux-saga/effects';
import Cookies from 'js-cookie';
import moment from 'moment-timezone';
import history, { getDomain } from '@utils/history';
import logger from '@utils/logger';
import notifier from '@utils/notifier';
import { getFirebaseValue } from '@utils/firebase';
import { refreshToken } from './AuthSaga';
import AppActions from './AppRedux';
import { AuthSelectors } from './AuthRedux';

export function* loadTimezone() {
  try {
    const venue = yield select(AuthSelectors.selectVenueId);
    if (!venue) {
      throw new Error('Venue is not set!');
    }

    const timezone = yield call(
      getFirebaseValue,
      `venues/${venue}/settings/general/timezone`
    );
    logger.debug('Venue timezone:', timezone);

    if (!timezone) {
      throw new Error('Timezone is not set!');
    }
    yield put(AppActions.setTimezone(timezone));

    const endOfNight = yield call(
      getFirebaseValue,
      `venues/${venue}/settings/hours/endOfNight`
    );
    logger.debug('Venue End of Night:', endOfNight);
    if (!endOfNight) {
      throw new Error('End of Night is not set!');
    }
    yield put(AppActions.setEndOfNight(endOfNight));

    moment.tz.setDefault(timezone);
  } catch (e) {
    notifier.error(e.message || 'There was problem setting timezone');
  }
}

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
      const { token } = selectedVenue;

      yield call(refreshToken, token, selectedVenue);
      yield call(loadTimezone);
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
