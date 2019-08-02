import apisauce from 'apisauce';
import qs from 'qs';
import { getStore } from '@redux/store';
import { AuthSelectors } from '@redux/AuthRedux';

const create = () => {
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

  const listTransactions = params => api.get('transactions', params);

  return {
    listTransactions
  };
};

export default create;
