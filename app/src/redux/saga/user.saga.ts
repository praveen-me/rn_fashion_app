import {all, put, take, takeLatest} from 'redux-saga/effects';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import firebaseAuth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

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
  fetchMeRequested,
  UPDATE_USER_REQUESTED,
  type IUpdateUserRequested,
  UPLOAD_USER_AVATAR_REQUESTED,
  type IUploadUserAvatarRequested,
  type IFetchMeRequested,
  LOGIN_COMPLETED,
  UPDATE_USER_NOTIFICATION_REQUESTED,
  IUserNotificationsUpdateRequested,
  updateUserRequested,
  updateUserNotificationsCompleted,
} from '../actions/user.actions';

import {navigationRef} from '../../lib/navigation/rootNavigation';
import {AUTH_CURRENT_USER, AUTH_TOKEN} from '../../contants/keys';

import EncryptedStorage from 'react-native-encrypted-storage';

import type {ISession} from '../@types';
import FirebaseHelpers, {type StorageItemsResult} from '../../lib/firebase';

import type {
  IUserData,
  IUserNotifications,
  ProgressCallbackPayload,
} from '../../@types';
import {getConstantsRequested, toggleAppLoader} from '../actions/misc.actions';

import store from '../../lib/store';
import {toast} from '../../components/Toast';

function* signupRequestedSaga(action: ISignupRequested) {
  const {payload} = action;

  const {email, password} = payload;

  try {
    yield put(
      toggleAppLoader({state: true, message: '🔒 Creating your account... 📱'}),
    );
    const createdUser: FirebaseAuthTypes.UserCredential =
      yield FirebaseHelpers.createUser(email, password);

    const {user} = createdUser;

    if (user.uid && user.email) {
      yield put(fetchMeRequested());
      yield take(LOGIN_COMPLETED);
      yield EncryptedStorage.setItem(AUTH_CURRENT_USER, JSON.stringify(user));
    }
  } catch (e) {
    if (e.message.includes('email-already-in-use')) {
      toast.display('❌ User already exists.', 'top', 'danger');
    }
  } finally {
    yield put(toggleAppLoader({state: false, message: ''}));
  }
}

function* loginRequestedSaga(action: ISignupRequested) {
  const {payload} = action;

  try {
    yield put(
      toggleAppLoader({state: true, message: '🔒 Logging you in... 📱'}),
    );
    const signInUser: FirebaseAuthTypes.UserCredential =
      yield firebaseAuth().signInWithEmailAndPassword(
        payload.email,
        payload.password,
      );

    const {user} = signInUser;

    if (user.uid && user.email) {
      yield put(fetchMeRequested());
      yield take(LOGIN_COMPLETED);
      yield EncryptedStorage.setItem(AUTH_CURRENT_USER, JSON.stringify(user));
    }
  } catch (e: {message: string}) {
    if (e.message.includes('user-not-found')) {
      toast.display('❌ User not found.', 'top', 'danger');
    } else if (e.message.includes('wrong-password')) {
      toast.display('❌ Wrong password.', 'top', 'danger');
    }
  } finally {
    yield put(toggleAppLoader({state: false, message: ''}));
  }
}

function* fetchMeRequestedSaga(action: IFetchMeRequested) {
  try {
    const sessionUser = firebaseAuth().currentUser;

    if (sessionUser) {
      if (action.payload.onlySession) {
        const photoURL = sessionUser?.photoURL;

        if (photoURL) {
          yield put(loginCompleted({photoURL}));
        }
      } else {
        const currentUser: IUserData = yield FirebaseHelpers.getCurrentUser();

        const {uid, email} = sessionUser;

        if (uid && email) {
          yield put(fetchOutfitsRequested());

          yield put(
            loginCompleted({
              ...currentUser,
              photoURL: sessionUser.photoURL as string,
            }),
          );

          // setTimeout(() => {
          //   if (!currentUser.name) {
          //     navigationRef.current?.navigate('EditProfile', {
          //       showSaveBtn: true,
          //     });
          //   }
          // }, 0);
        }
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
    const hasUser = FirebaseHelpers.getCurrentAuthUser();

    if (hasUser) {
      yield FirebaseHelpers.signOut();

      yield EncryptedStorage.removeItem(AUTH_CURRENT_USER);
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
    }
  } catch (e) {}
}

function* fetchOutfitsRequestedSaga() {
  try {
    const items: StorageItemsResult = yield FirebaseHelpers.getAllItems(
      'outfits',
    );

    if (items.success) {
      yield put(getConstantsRequested());
      yield put(fetchOutfitsCompleted(items.urls));
    }
  } catch (e) {
    console.log(e, 'Error');
  }
}

function* updateUserRequestedSaga(action: IUpdateUserRequested) {
  const {payload} = action;

  try {
    const currentUser = FirebaseHelpers.getCurrentAuthUser();

    if (currentUser) {
      yield FirebaseHelpers.updateCurrentUser(payload);

      const updatedUser: IUserData = yield FirebaseHelpers.getCurrentUser();

      if (updatedUser) {
        yield put(loginCompleted(updatedUser));
      }
    }
  } catch (e) {
    console.log(e, 'Error');
  }
}

async function handleAvatarProgress(result: ProgressCallbackPayload) {
  if (result.progress < 100) {
  }

  if (result.downloadUrl) {
    await FirebaseHelpers.updateProfile({
      photoURL: result.downloadUrl,
    });

    store.dispatch(fetchMeRequested({onlySession: true}));
  }
}

function* uploadUserAvatarRequestedSaga(action: IUploadUserAvatarRequested) {
  const {payload} = action;

  try {
    yield put(
      toggleAppLoader({
        state: true,
        message: '🚀 Hang on! Uploading your pic! 📸',
      }),
    );

    const currentUser = FirebaseHelpers.getCurrentAuthUser();

    if (currentUser) {
      const extension = payload.avatar.slice(-4);

      yield FirebaseHelpers.uploadUserAvatar(
        currentUser.uid,
        payload.avatar,
        extension,
        handleAvatarProgress,
      );

      yield take(LOGIN_COMPLETED);

      yield put(
        toggleAppLoader({
          state: false,
          message: '',
        }),
      );
    }
  } catch (e) {
    console.log(e, 'Error');
  }
}

function* updateUserNotificationsRequestedSaga(
  action: IUserNotificationsUpdateRequested,
) {
  const {key, value} = action.payload;

  try {
    const currentUser = FirebaseHelpers.getCurrentAuthUser();

    if (currentUser) {
      yield put(updateUserNotificationsCompleted({[key]: value}));

      const result: {success: boolean; error: null | string} =
        yield FirebaseHelpers.updateUserNotification(key, value);

      if (result.success) {
        const updatedNotifications: IUserNotifications =
          yield FirebaseHelpers.getUserNotifications();

        yield put(updateUserNotificationsCompleted({...updatedNotifications}));
      }
    }
  } catch (e) {}
}

export default function* rootUserSaga() {
  yield all([
    takeLatest(SIGNUP_REQUESTED, signupRequestedSaga),
    takeLatest(LOGIN_REQUESTED, loginRequestedSaga),
    takeLatest(FETCH_ME_REQUESTED, fetchMeRequestedSaga),
    takeLatest(LOGOUT_USER_REQUESTED, logoutUserRequestedSaga),
    takeLatest(OAUTH_REQUESTED, OAuthRequestedSaga),
    takeLatest(FETCH_OUTFITS_REQUESTED, fetchOutfitsRequestedSaga),
    takeLatest(UPDATE_USER_REQUESTED, updateUserRequestedSaga),
    takeLatest(UPLOAD_USER_AVATAR_REQUESTED, uploadUserAvatarRequestedSaga),
    takeLatest(
      UPDATE_USER_NOTIFICATION_REQUESTED,
      updateUserNotificationsRequestedSaga,
    ),
  ]);
}
