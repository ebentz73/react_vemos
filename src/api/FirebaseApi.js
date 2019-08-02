import { select, call, put } from 'redux-saga/effects';
import { getFirestore } from '@utils/firebase';
import { AuthSelectors } from '@redux/AuthRedux';
import AppActions from '@redux/AppRedux';
import { getStore } from '@redux/store';
import logger from '@utils/logger';

export function _apiv2Request(
  action,
  data,
  extraRequest = {},
  { user, currentVenue }
) {
  const db = getFirestore();
  const doc = db.collection('queueRequests').doc();
  const responseDoc = db.collection('queueResponses').doc();

  const identity =
    user && currentVenue
      ? {
          user: user.uid,
          venue: currentVenue.id
        }
      : {};

  const requestData = {
    _state: 'api-v2',
    request: {
      action,
      ...identity,
      ...extraRequest
    },
    data: data || null,
    response: responseDoc.id
  };

  logger.debug('API v2 Request: ', requestData);

  return new Promise((resolve, reject) => {
    doc
      .set(requestData)
      .then(() => {
        const unsubscribe = db
          .collection('queueResponses')
          .doc(responseDoc.id)
          .onSnapshot(d => {
            if (d.data()) {
              logger.debug('API v2 Response: ', d.data());
              unsubscribe();
              const value = d.data();

              if (value.status === 'success') {
                resolve(value.data);
              } else {
                reject(value);
              }
            }
          });
      })
      .catch(reject);
  });
}

// firebase API request util with promise
export async function requestAsync(action, data, extraRequest) {
  const store = getStore();
  const state = store.getState();

  store.dispatch(AppActions.setLoading(true));

  const currentVenue = AuthSelectors.selectCurrentVenue(state);
  const user = AuthSelectors.selectUser(state);

  let response;
  try {
    response = await _apiv2Request(action, data, extraRequest, {
      user,
      currentVenue
    });
    store.dispatch(AppActions.setLoading(false));
  } catch (e) {
    store.dispatch(AppActions.setLoading(false));
    logger.error(e);
    throw e;
  }

  return response;
}

// firebase API request util with function generator
export function* request(action, data, extraRequest) {
  yield put(AppActions.setLoading(true));

  const currentVenue = yield select(AuthSelectors.selectCurrentVenue);
  const user = yield select(AuthSelectors.selectUser);

  let response;
  try {
    response = yield call(_apiv2Request, action, data, extraRequest, {
      user,
      currentVenue
    });
    yield put(AppActions.setLoading(false));
  } catch (e) {
    yield put(AppActions.setLoading(false));
    logger.error(e);
    throw e;
  }

  return response;
}
