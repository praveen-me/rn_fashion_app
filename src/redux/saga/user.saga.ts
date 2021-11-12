import {all, call, takeLatest} from 'redux-saga/effects';
import {ISignupRequested, SIGNUP_REQUESTED} from '../actions/user.actions';

import {signUpUserRequested} from '../../graphql/user/user.mutation';
import {Response} from '../../@types';
import {AuthRoutes, navigationRef} from '../../lib/navigation/rootNavigation';

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

export default function* rootUserSaga() {
  yield all([takeLatest(SIGNUP_REQUESTED, signupRequestedSaga)]);
}
