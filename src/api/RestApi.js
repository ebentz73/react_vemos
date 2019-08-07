import apisauce from 'apisauce';
import qs from 'qs';
import { getStore } from '@redux/store';
import { AuthSelectors } from '@redux/AuthRedux';
import AppActions from '@redux/AppRedux';
import logger from '@utils/logger';

export const create = () => {
  const store = getStore();
  const state = store.getState();
  const token = AuthSelectors.selectToken(state);
  const api = apisauce.create({
    baseURL: process.env.BACKEND_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: token
    },
    responseType: 'json',
    paramsSerializer: params =>
      qs.stringify(params, { arrayFormat: 'brackets' })
  });

  const listTransactions = params => api.post('transactions', params);

  return {
    listTransactions
  };
};

export default async function request(func, ...params) {
  const store = getStore();
  const api = create();

  store.dispatch(AppActions.setLoading(true));

  let response;
  try {
    logger.debug('REST API request: ', func, params);
    response = await api[func].call(null, ...params);
    logger.debug('REST API OK: ', response.ok);
    logger.debug('REST API Response: ', response.data);
    store.dispatch(AppActions.setLoading(false));
  } catch (e) {
    store.dispatch(AppActions.setLoading(false));
    logger.error(e);
    throw e;
  }

  return response;
}
