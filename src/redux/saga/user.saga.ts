import {all, takeLatest} from 'redux-saga/effects';
import {ISignupRequested, userActionTypes} from '../actions/user.actions';

function* signupRequestedSaga(action: ISignupRequested) {
  console.log(action.payload);
}

export default function* rootUserSaga() {
  yield all([
    takeLatest(userActionTypes.SIGNUP_REQUESTED, signupRequestedSaga),
  ]);
}
