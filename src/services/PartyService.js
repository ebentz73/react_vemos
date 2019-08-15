import { getFirebaseValue } from '@utils/firebase';

export function getParty(venueId, partyId) {
  return getFirebaseValue(`venues/${venueId}/parties/${partyId}`);
}
