import { getFirebaseValue } from '@utils/firebase';

export function getEvent(venueId, eventId) {
  return getFirebaseValue(`venues/${venueId}/events/${eventId}`);
}
