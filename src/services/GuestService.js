import { getFirebaseValue } from '@utils/firebase';

export function getGuest(venueId, guestId) {
  return getFirebaseValue(`venues/${venueId}/guests/${guestId}`, 'fs');
}

export function getName(guest) {
  if (!guest) {
    return '';
  }

  return `${guest.firstName} ${guest.lastName}`;
}
