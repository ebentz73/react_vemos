import { call, put } from 'redux-saga/effects';
import jwtDecode from 'jwt-decode';
import { getAuth } from '@utils/firebase';
import logger from '@utils/logger';
import { request } from '@api/FirebaseApi';
import AuthActions from './AuthRedux';

function signInCustomToken(token) {
  const auth = getAuth();

  return auth
    .signInWithCustomToken(token)
    .then(resp => resp)
    .catch(e => {
      throw new Error(e);
    });
}

export function* refreshToken(token, venueId) {
  const decoded = jwtDecode(token);
  const result = yield call(
    request,
    'user/refresh-token',
    {
      token
    },
    {
      user: decoded.uid,
      venue: venueId
    }
  );
  const currentVenue = result[venueId];

  try {
    yield call(signInCustomToken, currentVenue.token);

    yield put(AuthActions.setToken(currentVenue.token));
    yield put(
      AuthActions.setCurrentVenue({
        ...currentVenue,
        id: venueId
      })
    );
    yield put(AuthActions.setUser(decoded));
  } catch (e) {
    logger.error(e);
    throw e;
  }
}
