import { select, call, put } from 'redux-saga/effects';
import { getFirestore } from '@utils/firebase';
import { AuthSelectors } from '@redux/AuthRedux';
import AppActions from '@redux/AppRedux';
import logger from '@utils/logger';

export function _apiv2Request(requestData, responseId) {
  const db = getFirestore();
  const doc = db.collection('queueRequests').doc();

  logger.debug('API v2 Request: ', requestData);

  return new Promise((resolve, reject) => {
    doc
      .set(requestData)
      .then(() => {
        const unsubscribe = db
          .collection('queueResponses')
          .doc(responseId)
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

export function* request(action, data, extraRequest = {}) {
  yield put(AppActions.setLoading(true));

  const currentVenue = yield select(AuthSelectors.selectCurrentVenue);
  const user = yield select(AuthSelectors.selectUser);
  const db = getFirestore();
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

  let response;
  try {
    response = yield call(_apiv2Request, requestData, responseDoc.id);
    yield put(AppActions.setLoading(false));
  } catch (e) {
    yield put(AppActions.setLoading(false));
    logger.error(e);
    throw e;
  }

  return response;
}
