import { getFirebaseValue } from '@utils/firebase';

export function getUser(userId) {
  return getFirebaseValue(`users/${userId}`);
}
