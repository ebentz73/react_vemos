import { getTime } from '@utils/datetime';
import { getStore } from '@redux/store';
import { AppSelectors } from '@redux/AppRedux';
import { AuthSelectors } from '@redux/AuthRedux';

export function getVenueDate(datetime) {
  const store = getStore();
  const state = store.getState();
  const endOfNight = AppSelectors.selectEndOfNight(state);

  return getTime(datetime, endOfNight);
}

export function getVenueId() {
  const store = getStore();
  const state = store.getState();
  return AuthSelectors.selectVenueId(state);
}
