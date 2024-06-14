import {all, call, put, takeLatest} from 'redux-saga/effects';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebaseAuth, {
  type FirebaseAuthTypes,
} from '@react-native-firebase/auth';

import {
  FETCH_ME_REQUESTED,
  ISignupRequested,
  loginCompleted,
  LOGIN_REQUESTED,
  logoutUserCompleted,
  LOGOUT_USER_REQUESTED,
  OAUTH_REQUESTED,
  SIGNUP_REQUESTED,
  FETCH_OUTFITS_REQUESTED,
  fetchOutfitsCompleted,
  fetchOutfitsRequested,
} from '../actions/user.actions';

import {navigationRef} from '../../lib/navigation/rootNavigation';
import {AUTH_CURRENT_USER, AUTH_TOKEN} from '../../contants/keys';

import EncryptedStorage from 'react-native-encrypted-storage';

import type {ISession} from '../@types';
import FirebaseHelpers, {type StorageItemsResult} from '../../lib/firebase';

function* signupRequestedSaga(action: ISignupRequested) {
  const {payload} = action;

  const {email, password} = payload;

  try {
    const createdUser: FirebaseAuthTypes.UserCredential =
      yield firebaseAuth().createUserWithEmailAndPassword(email, password);

    const {user} = createdUser;

    if (user.email && user.uid) {
      yield put(loginCompleted({uid: user.uid, email: user.email}));
    }
  } catch (e) {
    console.log(e);
  }
}

function* loginRequestedSaga(action: ISignupRequested) {
  const {payload} = action;

  try {
    const signInUser: FirebaseAuthTypes.UserCredential =
      yield firebaseAuth().signInWithEmailAndPassword(
        payload.email,
        payload.password,
      );

    const {user} = signInUser;

    if (user.uid && user.email) {
      yield put(loginCompleted({uid: user.uid, email: user.email}));
      yield EncryptedStorage.setItem(AUTH_CURRENT_USER, JSON.stringify(user));
    }
  } catch (e) {
    console.log(e);
  }
}

function* fetchMeRequestedSaga() {
  try {
    const sessionUser = firebaseAuth().currentUser;

    if (sessionUser) {
      const {uid, email} = sessionUser;

      if (uid && email) {
        yield put(loginCompleted({uid, email}));
        yield put(fetchOutfitsRequested());
      }
    }
  } catch (e) {
    console.log(e, 'Error from login');
  }
}

function* saveToken(session: ISession) {
  yield EncryptedStorage.setItem(AUTH_TOKEN, JSON.stringify(session));
}

function* logoutUserRequestedSaga() {
  try {
    const hasToken: null | string = yield AsyncStorage.getItem(
      AUTH_TOKEN,
    ) as Promise<null | string>;

    if (!!hasToken) {
      yield AsyncStorage.removeItem(AUTH_TOKEN);
    }

    yield put(logoutUserCompleted());
  } catch (e) {}
}

function* OAuthRequestedSaga() {
  try {
    const isInAppBrowserAvailable: boolean = yield InAppBrowser.isAvailable();

    if (isInAppBrowserAvailable) {
      const result: string = yield InAppBrowser.openAuth(
        'http://localhost:3000/oauth',
        'rnFashion://',
        {
          dismissButtonStyle: 'cancel',
          preferredBarTintColor: '#453AA4',
          preferredControlTintColor: 'white',
          readerMode: false,
          animated: true,
          modalPresentationStyle: 'fullScreen',
          modalTransitionStyle: 'coverVertical',
          modalEnabled: true,
          enableBarCollapsing: false,
          animations: {
            startEnter: 'slide_in_right',
            startExit: 'slide_out_left',
            endEnter: 'slide_in_left',
            endExit: 'slide_out_right',
          },
        },
      );

      console.log({result});
    }
  } catch (e) {}
}

function* fetchOutfitsRequestedSaga() {
  try {
    console.log(FirebaseHelpers.getAllItems, 'get all items');
    const items: StorageItemsResult = yield FirebaseHelpers.getAllItems(
      'outfits',
    );

    if (items.success) {
      yield put(fetchOutfitsCompleted(items.urls));
    }
  } catch (e) {
    console.log(e, 'Error');
  }
}

export default function* rootUserSaga() {
  yield all([
    takeLatest(SIGNUP_REQUESTED, signupRequestedSaga),
    takeLatest(LOGIN_REQUESTED, loginRequestedSaga),
    takeLatest(FETCH_ME_REQUESTED, fetchMeRequestedSaga),
    takeLatest(LOGOUT_USER_REQUESTED, logoutUserRequestedSaga),
    takeLatest(OAUTH_REQUESTED, OAuthRequestedSaga),
    takeLatest(FETCH_OUTFITS_REQUESTED, fetchOutfitsRequestedSaga),
  ]);
}
