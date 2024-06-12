import {initializeApp} from 'firebase/app';
import {browserLocalPersistence, getAuth, initializeAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBy4WIE9wtl-V4LHv0pUzNIN4n9XGw4eRY',
  authDomain: 'rn-fashion-app.firebaseapp.com',
  databaseURL: 'https://rn-fashion-app.firebaseio.com',
  projectId: 'rn-fashion-app',
  storageBucket: 'rn-fashion-app.appspot.com',
  messagingSenderId: '383620677539',
  appId: '1:383620677539:web:679c30a6c6d23adbfba416',
  measurementId: 'G-V22L49DBH4',
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export let FIREBASE_AUTH = initializeAuth(FIREBASE_APP, {
  persistence: browserLocalPersistence,
});

FIREBASE_AUTH = getAuth(FIREBASE_APP);

export const FIREBASE_DB = getFirestore(FIREBASE_APP);
