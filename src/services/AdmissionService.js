import { getFirebaseValue } from '@utils/firebase';

export function getAdmission(venueId, admissionId) {
  return getFirebaseValue(`venues/${venueId}/admissions/${admissionId}`);
}
