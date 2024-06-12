import {all, call, put, takeLatest} from 'redux-saga/effects';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getAuth,
  createUserWithEmailAndPassword,
  type UserCredential,
  signInWithEmailAndPassword,
} from 'firebase/auth';

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

import supabase from '../../lib/supabase';
import type {
  AuthResponse,
  AuthTokenResponsePassword,
  UserResponse,
} from '@supabase/supabase-js';
import EncryptedStorage from 'react-native-encrypted-storage';
import {FIREBASE_AUTH} from '../../lib/firebase';
import type {ISession} from '../@types';

// const user = {
//   user: {
//     uid: 'D4qrc9owoQXE8JA1SJKkx8Bo1Xj2',
//     email: 'test@gmail.com',
//     emailVerified: false,
//     isAnonymous: false,
//     providerData: [
//       {
//         providerId: 'password',
//         uid: 'test@gmail.com',
//         displayName: null,
//         email: 'test@gmail.com',
//         phoneNumber: null,
//         photoURL: null,
//       },
//     ],
//     stsTokenManager: {
//       refreshToken:
//         'AMf-vByjdqOGsBDKXILed3TFlNKkadl-5QVJ1APpLkvB1NmO6zmkBLtJW6dWP7mH0xEYcYDy2ZHtPqP6Id64gc37-DVC6qJo3IaoeluaD2-k4nkqM4BBFGNoNPjNsbZMdxBB7emKQJuoi284nrDEvD3a5hHcZO4T8ZYUw0sG3ZlVEjyMmk_vMkhPsHEdGSs-PKvkvOMvS_hybJ1QG8Z6Aji_zdo4e_hePA',
//       accessToken:
//         'eyJhbGciOiJSUzI1NiIsImtpZCI6IjMzMDUxMThiZTBmNTZkYzA4NGE0NmExN2RiNzU1NjVkNzY4YmE2ZmUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcm4tZmFzaGlvbi1hcHAiLCJhdWQiOiJybi1mYXNoaW9uLWFwcCIsImF1dGhfdGltZSI6MTcxODE5MjY4OCwidXNlcl9pZCI6IkQ0cXJjOW93b1FYRThKQTFTSktreDhCbzFYajIiLCJzdWIiOiJENHFyYzlvd29RWEU4SkExU0pLa3g4Qm8xWGoyIiwiaWF0IjoxNzE4MTkyNjg4LCJleHAiOjE3MTgxOTYyODgsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidGVzdEBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.Rh9Tm0dD7O6OnpBzTZx2RjIt7cBzld5VJo2KeH-yJy4nOGcfzljaT9hYLPmplCD2CYrSsawwxqx7PYv-k7oZsCB3QMwEJZkIFySb5376UpgkuAUk7yTX3-urkHpSUHI98XgCkWdoaQENHHyAjpw5vqN7RebSrBn0RzVh4dTBwbxLv7mdPQe9kiAt6st0o_wRV9vZmZxHVNpwPguC26BpxP8oA1Q75gSqqb2NDU_2bkGJ9nUVACRuE1gjxBAYrMC8z0NcxXtbbixClygMdupd1NO71X9QcpYwg5YJARwQGj5Cn300CpqwkZSlYZjJL76aZoXpnIxbFcJUHOiF3mlwMw',
//       expirationTime: 1718196287741,
//     },
//     createdAt: '1718192688154',
//     lastLoginAt: '1718192688154',
//     apiKey: 'AIzaSyBy4WIE9wtl-V4LHv0pUzNIN4n9XGw4eRY',
//     appName: '[DEFAULT]',
//   },
//   providerId: null,
//   _tokenResponse: {
//     kind: 'identitytoolkit#SignupNewUserResponse',
//     idToken:
//       'eyJhbGciOiJSUzI1NiIsImtpZCI6IjMzMDUxMThiZTBmNTZkYzA4NGE0NmExN2RiNzU1NjVkNzY4YmE2ZmUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcm4tZmFzaGlvbi1hcHAiLCJhdWQiOiJybi1mYXNoaW9uLWFwcCIsImF1dGhfdGltZSI6MTcxODE5MjY4OCwidXNlcl9pZCI6IkQ0cXJjOW93b1FYRThKQTFTSktreDhCbzFYajIiLCJzdWIiOiJENHFyYzlvd29RWEU4SkExU0pLa3g4Qm8xWGoyIiwiaWF0IjoxNzE4MTkyNjg4LCJleHAiOjE3MTgxOTYyODgsImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidGVzdEBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.Rh9Tm0dD7O6OnpBzTZx2RjIt7cBzld5VJo2KeH-yJy4nOGcfzljaT9hYLPmplCD2CYrSsawwxqx7PYv-k7oZsCB3QMwEJZkIFySb5376UpgkuAUk7yTX3-urkHpSUHI98XgCkWdoaQENHHyAjpw5vqN7RebSrBn0RzVh4dTBwbxLv7mdPQe9kiAt6st0o_wRV9vZmZxHVNpwPguC26BpxP8oA1Q75gSqqb2NDU_2bkGJ9nUVACRuE1gjxBAYrMC8z0NcxXtbbixClygMdupd1NO71X9QcpYwg5YJARwQGj5Cn300CpqwkZSlYZjJL76aZoXpnIxbFcJUHOiF3mlwMw',
//     email: 'test@gmail.com',
//     refreshToken:
//       'AMf-vByjdqOGsBDKXILed3TFlNKkadl-5QVJ1APpLkvB1NmO6zmkBLtJW6dWP7mH0xEYcYDy2ZHtPqP6Id64gc37-DVC6qJo3IaoeluaD2-k4nkqM4BBFGNoNPjNsbZMdxBB7emKQJuoi284nrDEvD3a5hHcZO4T8ZYUw0sG3ZlVEjyMmk_vMkhPsHEdGSs-PKvkvOMvS_hybJ1QG8Z6Aji_zdo4e_hePA',
//     expiresIn: '3600',
//     localId: 'D4qrc9owoQXE8JA1SJKkx8Bo1Xj2',
//   },
//   operationType: 'signIn',
// };

// const signInUser = {
//   user: {
//     uid: 'D4qrc9owoQXE8JA1SJKkx8Bo1Xj2',
//     email: 'test@gmail.com',
//     emailVerified: false,
//     isAnonymous: false,
//     providerData: [
//       {
//         providerId: 'password',
//         uid: 'test@gmail.com',
//         displayName: null,
//         email: 'test@gmail.com',
//         phoneNumber: null,
//         photoURL: null,
//       },
//     ],
//     stsTokenManager: {
//       refreshToken:
//         'AMf-vBytRYOeh0OqKoWOWkdyfsLCJRCLQof_vH0-8C7Xc0ToJbOW2PiR7t1LEeuXU1r1x5_PZpLEU3nzScJwjFtNnZ_wnWhz71iTK0wgXRU9AcXeK9Xyw4g8HRE4urHGWxUSDUQUFTNx37ZZmGQk6K9iszos6Vnjmr-ZUMm9wqi7BCEKtkEQcgNJ88px7X2oa0bFP2f8LsTj-uBrEwiCpwggyCnmiVN5Gg',
//       accessToken:
//         'eyJhbGciOiJSUzI1NiIsImtpZCI6IjMzMDUxMThiZTBmNTZkYzA4NGE0NmExN2RiNzU1NjVkNzY4YmE2ZmUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcm4tZmFzaGlvbi1hcHAiLCJhdWQiOiJybi1mYXNoaW9uLWFwcCIsImF1dGhfdGltZSI6MTcxODE5MzM3OSwidXNlcl9pZCI6IkQ0cXJjOW93b1FYRThKQTFTSktreDhCbzFYajIiLCJzdWIiOiJENHFyYzlvd29RWEU4SkExU0pLa3g4Qm8xWGoyIiwiaWF0IjoxNzE4MTkzMzc5LCJleHAiOjE3MTgxOTY5NzksImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidGVzdEBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.OrW-NFjyjrooBPMdhTHR4hw-ccB2c0X0EhsgTAgpluZLTozB-AGLfB4TKnYoM6zcNtiGJ10ORcKeoaM7dhxC-FsBJEj32Tz8MnBlUXX0Atw2ZoAitKPYYiALTOJ7QoqOFdlf1vaFEnBfT9vGs24hTk1wzoVZ6b0F49mv_zXPBqSXt1aPZlmysoEClrHJPNigwyIx-WtthG11dAThPQgZfuPfjvso3dlvrv4Hn2aCbqZkkuGTSYPcyVxbv35Sg4nrjMPBBhVe9D-jR8vl-vSDQHgV4KQObXsRZNQSuOtay9rjOegI7fWlxoqk8tlL8Ni_Yr_0ebS0o1EnnDeYj3elpQ',
//       expirationTime: 1718196978689,
//     },
//     createdAt: '1718192688154',
//     lastLoginAt: '1718193379103',
//     apiKey: 'AIzaSyBy4WIE9wtl-V4LHv0pUzNIN4n9XGw4eRY',
//     appName: '[DEFAULT]',
//   },
//   providerId: null,
//   _tokenResponse: {
//     kind: 'identitytoolkit#VerifyPasswordResponse',
//     localId: 'D4qrc9owoQXE8JA1SJKkx8Bo1Xj2',
//     email: 'test@gmail.com',
//     displayName: '',
//     idToken:
//       'eyJhbGciOiJSUzI1NiIsImtpZCI6IjMzMDUxMThiZTBmNTZkYzA4NGE0NmExN2RiNzU1NjVkNzY4YmE2ZmUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcm4tZmFzaGlvbi1hcHAiLCJhdWQiOiJybi1mYXNoaW9uLWFwcCIsImF1dGhfdGltZSI6MTcxODE5MzM3OSwidXNlcl9pZCI6IkQ0cXJjOW93b1FYRThKQTFTSktreDhCbzFYajIiLCJzdWIiOiJENHFyYzlvd29RWEU4SkExU0pLa3g4Qm8xWGoyIiwiaWF0IjoxNzE4MTkzMzc5LCJleHAiOjE3MTgxOTY5NzksImVtYWlsIjoidGVzdEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsidGVzdEBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.OrW-NFjyjrooBPMdhTHR4hw-ccB2c0X0EhsgTAgpluZLTozB-AGLfB4TKnYoM6zcNtiGJ10ORcKeoaM7dhxC-FsBJEj32Tz8MnBlUXX0Atw2ZoAitKPYYiALTOJ7QoqOFdlf1vaFEnBfT9vGs24hTk1wzoVZ6b0F49mv_zXPBqSXt1aPZlmysoEClrHJPNigwyIx-WtthG11dAThPQgZfuPfjvso3dlvrv4Hn2aCbqZkkuGTSYPcyVxbv35Sg4nrjMPBBhVe9D-jR8vl-vSDQHgV4KQObXsRZNQSuOtay9rjOegI7fWlxoqk8tlL8Ni_Yr_0ebS0o1EnnDeYj3elpQ',
//     registered: true,
//     refreshToken:
//       'AMf-vBytRYOeh0OqKoWOWkdyfsLCJRCLQof_vH0-8C7Xc0ToJbOW2PiR7t1LEeuXU1r1x5_PZpLEU3nzScJwjFtNnZ_wnWhz71iTK0wgXRU9AcXeK9Xyw4g8HRE4urHGWxUSDUQUFTNx37ZZmGQk6K9iszos6Vnjmr-ZUMm9wqi7BCEKtkEQcgNJ88px7X2oa0bFP2f8LsTj-uBrEwiCpwggyCnmiVN5Gg',
//     expiresIn: '3600',
//   },
//   operationType: 'signIn',
// };

function* signupRequestedSaga(action: ISignupRequested) {
  const {payload} = action;

  const {email, password} = payload;

  try {
    const createdUser: UserCredential = yield call(
      createUserWithEmailAndPassword,
      FIREBASE_AUTH,
      email,
      password,
    );

    if (createdUser.user.stsTokenManager) {
      yield saveToken({
        expires_at: createdUser.user.stsTokenManager.expirationTime,
        refreshToken: createdUser.user.stsTokenManager.refreshToken,
        accessToken: createdUser.user.stsTokenManager.accessToken,
      });

      const {user} = createdUser;

      if (user.email && user.uid) {
        yield put(loginCompleted({uid: user.uid, email: user.email}));
        yield EncryptedStorage.setItem(AUTH_CURRENT_USER, JSON.stringify(user));
      }
    }
  } catch (e) {
    console.log(e);
  }
}

function* loginRequestedSaga(action: ISignupRequested) {
  const {payload} = action;

  try {
    const signInUser: UserCredential = yield call(
      signInWithEmailAndPassword,
      FIREBASE_AUTH,
      payload.email,
      payload.password,
    );

    if (signInUser?.user?.stsTokenManager) {
      yield saveToken({
        expires_at: signInUser.user.stsTokenManager.expirationTime,
        refreshToken: signInUser.user.stsTokenManager.refreshToken,
        accessToken: signInUser.user.stsTokenManager.accessToken,
      });

      const {user} = signInUser;

      if (user.uid && user.email) {
        yield put(loginCompleted({uid: user.uid, email: user.email}));
        yield EncryptedStorage.setItem(AUTH_CURRENT_USER, JSON.stringify(user));
      }
    }
  } catch (e) {
    console.log(e);
  }
}

function* fetchMeRequestedSaga() {
  try {
    const session: ISession = JSON.parse(
      yield EncryptedStorage.getItem(AUTH_TOKEN),
    );
    const sessionUser: UserCredential['user'] = JSON.parse(
      yield EncryptedStorage.getItem(AUTH_CURRENT_USER) || '',
    );

    if (!session && !sessionUser) {
      return;
    }

    if (sessionUser) {
      FIREBASE_AUTH.updateCurrentUser(sessionUser);

      const {uid, email} = sessionUser;

      if (uid && email) {
        yield put(loginCompleted({uid, email}));
      }
      // yield put(fetchOutfitsRequested());
    }
  } catch (e) {
    console.log(e);
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
    const {data, error} = yield call(supabase.getOutfits);

    if (data) {
      yield put(fetchOutfitsCompleted(data.reverse()));
    }
  } catch (e) {
    console.log(e);
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
