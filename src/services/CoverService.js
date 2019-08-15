import { getFirebaseValue } from '@utils/firebase';

export function getCover(venueId, coverId) {
  return getFirebaseValue(`venues/${venueId}/cover/${coverId}`);
}

export function getPartyId(venueId, coverId) {
  return getFirebaseValue(`venues/${venueId}/cover^parties/${coverId}`);
}
