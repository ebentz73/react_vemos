import { getFirebaseValue } from '@utils/firebase';

export function getTicket(ticketID, date, venueID) {
  return getFirebaseValue(`venues/${venueID}/pos_ticket/${date}/${ticketID}`);
}

export function getMenuItemsForTicket(ticketID, date, venueID) {
  return getFirebaseValue(
    `venues/${venueID}/pos_ticket^items/${date}/${ticketID}`,
    'rtdb',
    true
  );
}

export function getPayments(ticketID, date, venueID) {
  return getFirebaseValue(
    `venues/${venueID}/pos_ticket^payments/${date}/${ticketID}`,
    'rtdb',
    true
  );
}
