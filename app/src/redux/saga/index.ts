import {all} from 'redux-saga/effects';
import rootUserSaga from './user.saga';
import rootMiscSaga from './misc.saga';

export default function* rootSaga() {
  yield all([rootUserSaga(), rootMiscSaga()]);
}
