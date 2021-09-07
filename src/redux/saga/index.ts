import {all} from 'redux-saga/effects';
import rootUserSaga from './user.saga';

export default function* rootSaga() {
  yield all([rootUserSaga()]);
}
