import { getFirebaseValue } from '@utils/firebase';

export function getCoverId(venueId, transactionId) {
  return getFirebaseValue(
    `venues/${venueId}/transactions^cover/${transactionId}`
  );
}

export function getAdmissionId(venueId, transactionId) {
  return getFirebaseValue(
    `venues/${venueId}/transactions^admissions/${transactionId}`
  );
}

export function getTicketSaleId(venueId, transactionId) {
  return getFirebaseValue(
    `venues/${venueId}/transactions^ticket_sales/${transactionId}`
  );
}
