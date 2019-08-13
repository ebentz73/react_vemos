import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';

const config = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID
};

firebase.initializeApp(config);

export function getAuth() {
  return firebase.auth();
}

export function getFirestore() {
  return firebase.firestore();
}

export function getFirebaseRef() {
  return firebase.database().ref();
}

export function getFirebaseValue(path, type = 'rtdb') {
  if (type === 'fs') {
    return getFirestore()
      .doc(path)
      .get()
      .then(doc => {
        const data = doc.data();
        return data;
      });
  } else {
    return getFirebaseRef()
      .child(path)
      .once('value')
      .then(snap => {
        const data = snap.val();
        return data;
      });
  }
}

export function getSuggestions(
  path,
  { query, orderBy, orderByKey = [], limit }
) {
  return getFirebaseRef()
    .child(path)
    [orderBy](...orderByKey)
    .startAt(query)
    .endAt(`${query}\uf8ff`)
    .limitToFirst(limit)
    .once('value')
    .then(snap => snap.val());
}
