import {takeLatest, all, put} from 'redux-saga/effects';
import {
  GET_CONSTANTS_COMPLETED,
  GET_CONSTANTS_REQUESTED,
  getConstantsCompleted,
} from '../actions/misc.actions';
import FirebaseHelpers from '../../lib/firebase';
import type {ProfileConstants} from '../@types';

function* getConstantsRequestedSaga() {
  try {
    const constants: ProfileConstants =
      yield FirebaseHelpers.getConstantsFromFirestore();

    yield put(getConstantsCompleted(constants));
  } catch (e) {
    console.log(e, 'Error from get constants');
  }
}

export default function* rootMiscSaga() {
  yield all([takeLatest(GET_CONSTANTS_REQUESTED, getConstantsRequestedSaga)]);
}
