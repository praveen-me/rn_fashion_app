import {all, takeLatest} from 'redux-saga/effects';
import {ISignupRequested, userActionTypes} from '../actions/user.actions';
import {signUpUserRequested} from 'src/graphql/user/user.mutation';

function* signupRequestedSaga(action: ISignupRequested) {
  signUpUserRequested;
}

export default function* rootUserSaga() {
  yield all([
    takeLatest(userActionTypes.SIGNUP_REQUESTED, signupRequestedSaga),
  ]);
}
