import {all, call, takeLatest} from 'redux-saga/effects';
import {ISignupRequested, SIGNUP_REQUESTED} from '../actions/user.actions';

import {signUpUserRequested} from '../../graphql/user/user.mutation';

interface Response<Data extends Object> {
  status: {
    error: boolean;
    msg: string;
  };
  result: Data;
}

function* signupRequestedSaga(action: ISignupRequested) {
  const {payload} = action;
  try {
    const data: Response<{}> = yield call(signUpUserRequested, payload);

    console.log(data);
  } catch (e) {
    console.log(e);
  }
}

export default function* rootUserSaga() {
  yield all([takeLatest(SIGNUP_REQUESTED, signupRequestedSaga)]);
}
