import { getFirebaseValue } from '@utils/firebase';

export function getReferrer(venueId, referrerId) {
  return getFirebaseValue(`venues/${venueId}/referrers/${referrerId}`);
}
