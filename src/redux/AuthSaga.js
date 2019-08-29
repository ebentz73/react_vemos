import { call, put } from 'redux-saga/effects';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import { getDomain } from '@utils/history';
import { getAuth } from '@utils/firebase';
import logger from '@utils/logger';
import { request } from '@api/FirebaseApi';
import * as UsersService from '@services/UsersService';
import AuthActions from './AuthRedux';

export function signInCustomToken(token) {
  const auth = getAuth();

  return auth
    .signInWithCustomToken(token)
    .then(resp => resp)
    .catch(e => {
      throw new Error(e);
    });
}

export function* refreshToken(token, venue) {
  try {
    const decoded = jwtDecode(token);
    let result;
    let currentVenue = venue;

    // make request only if token is expired
    if (Date.now() > decoded.exp * 1000) {
      result = yield call(
        request,
        'user/refresh-token',
        {
          token
        },
        {
          user: decoded.uid,
          venue: venue.id
        }
      );
      currentVenue = result[venue.id];
    }

    yield call(signInCustomToken, currentVenue.token);
    yield put(AuthActions.setToken(currentVenue.token));
    yield put(
      AuthActions.setCurrentVenue({
        ...currentVenue,
        id: venue.id
      })
    );

    const profile = yield call(UsersService.getUser, decoded.uid);

    yield put(
      AuthActions.setUser({
        ...decoded,
        ...profile
      })
    );

    if (currentVenue) {
      // setting cookie
      const domain = getDomain();
      Cookies.set(
        process.env.WEB_APP_URL + '_selected',
        {
          ...currentVenue,
          id: venue.id
        },
        {
          domain
        }
      );
    }
  } catch (e) {
    logger.error(e);
    throw e;
  }
}
