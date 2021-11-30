import {all, call, put, takeLatest} from 'redux-saga/effects';
import {InAppBrowser} from 'react-native-inappbrowser-reborn';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  FETCH_ME_REQUESTED,
  ISignupRequested,
  loginCompleted,
  LOGIN_REQUESTED,
  logoutUserCompleted,
  LOGOUT_USER_REQUESTED,
  OAUTH_REQUESTED,
  SIGNUP_REQUESTED,
} from '../actions/user.actions';

import {
  loginUserRequested,
  signUpUserRequested,
} from '../../graphql/user/user.mutation';
import {Response} from '../../@types';
import {AuthRoutes, navigationRef} from '../../lib/navigation/rootNavigation';
import {AUTH_TOKEN} from '../../contants/keys';
import {setGraphqlHeaders} from '../../lib/apolloConfig';
import {fetchUser} from '../../graphql/user/user.query';
import {IFetchMeUser} from '../@types';

function* signupRequestedSaga(action: ISignupRequested) {
  const {payload} = action;
  try {
    const {
      data,
    }: Response<
      {
        user_id: string;
        email: string;
      },
      'signup'
    > = yield call(signUpUserRequested, payload);

    if (!data.signup.status.error) {
      navigationRef.current?.navigate<keyof AuthRoutes>('Login');
    }
  } catch (e) {
    console.log(e);
  }
}

function* loginRquestedSaga(action: ISignupRequested) {
  const {payload} = action;

  try {
    const {
      data,
    }: Response<
      {
        token: string;
      },
      'login'
    > = yield call(loginUserRequested, payload);

    if (!data.login.status.error) {
      const {token} = data.login.result;

      yield saveToken(token);
      yield fetchMeRequestedSaga();
    }
  } catch (e) {
    console.log(e);
  }
}

function* fetchMeRequestedSaga() {
  try {
    yield setGraphqlHeaders();

    const userData: Response<IFetchMeUser, 'me'> = yield call(fetchUser);

    if (!userData.data.me.status.error) {
      const user = userData.data.me.result;

      yield put(loginCompleted(user));
    }
  } catch (e) {
    console.log(e);
  }
}

function* saveToken(token: string) {
  yield AsyncStorage.setItem(AUTH_TOKEN, token);
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

export default function* rootUserSaga() {
  yield all([
    takeLatest(SIGNUP_REQUESTED, signupRequestedSaga),
    takeLatest(LOGIN_REQUESTED, loginRquestedSaga),
    takeLatest(FETCH_ME_REQUESTED, fetchMeRequestedSaga),
    takeLatest(LOGOUT_USER_REQUESTED, logoutUserRequestedSaga),
    takeLatest(OAUTH_REQUESTED, OAuthRequestedSaga),
  ]);
}
