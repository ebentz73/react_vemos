import { getFirebaseValue } from '@utils/firebase';

export function getTicketSale(venueId, saleId) {
  return getFirebaseValue(`venues/${venueId}/ticket_sales/${saleId}`);
}

export function getParty(venueId, saleId) {
  return getFirebaseValue(
    `venues/${venueId}/ticket_sales^parties/${saleId}`
  ).then(partyId => {
    if (!partyId) {
      throw new Error('Party not found');
    }

    return getFirebaseValue(`venues/${venueId}/parties/${partyId}`);
  });
}

export function getGuest(venueId, saleId) {
  return getFirebaseValue(
    `venues/${venueId}/ticket_sales^guests/${saleId}`
  ).then(guestId => {
    if (!guestId) {
      throw new Error('Guest not found');
    }

    return getFirebaseValue(`venues/${venueId}/guests/${guestId}`, 'fs');
  });
}

export function getTicket(venueId, saleId) {
  return getFirebaseValue(
    `venues/${venueId}/ticket_sales^tickets/${saleId}`
  ).then(ticketId => {
    if (!ticketId) {
      throw new Error('Ticket not found');
    }

    return getFirebaseValue(`venues/${venueId}/tickets/${ticketId}`);
  });
}
