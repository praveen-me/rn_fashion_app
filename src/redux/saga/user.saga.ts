import {all, call, put, takeLatest} from 'redux-saga/effects';
import {
  ISignupRequested,
  loginCompleted,
  LOGIN_REQUESTED,
  SIGNUP_REQUESTED,
} from '../actions/user.actions';

import {
  loginUserRequested,
  signUpUserRequested,
} from '../../graphql/user/user.mutation';
import {Response} from '../../@types';
import {AuthRoutes, navigationRef} from '../../lib/navigation/rootNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
      yield setGraphqlHeaders();

      const userData: Response<IFetchMeUser, 'me'> = yield call(fetchUser);

      if (!userData.data.me.status.error) {
        const user = userData.data.me.result;

        console.log(user);
        yield put(loginCompleted(user));
      }
    }
  } catch (e) {
    console.log(e);
  }
}

function* saveToken(token: string) {
  yield AsyncStorage.setItem(AUTH_TOKEN, token);
}

export default function* rootUserSaga() {
  yield all([
    takeLatest(SIGNUP_REQUESTED, signupRequestedSaga),
    takeLatest(LOGIN_REQUESTED, loginRquestedSaga),
  ]);
}
