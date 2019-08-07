import { combineReducers } from 'redux';
import { reducer as app } from './AppRedux';
import { reducer as auth } from './AuthRedux';
import { reducer as transaction } from './TransactionRedux';

const reducers = combineReducers({
  app,
  auth,
  transaction
});

export default reducers;
