import {takeLatest, all, put, take} from 'redux-saga/effects';
import SplashScreen from 'react-native-splash-screen';
import {
  GET_CONSTANTS_COMPLETED,
  GET_CONSTANTS_REQUESTED,
  getConstantsCompleted,
  INITIAL_APP_SETUP,
} from '../actions/misc.actions';
import FirebaseHelpers from '../../lib/firebase';
import type {ProfileConstants} from '../@types';
import {
  FETCH_OUTFITS_COMPLETED,
  fetchMeRequested,
} from '../actions/user.actions';

function* getConstantsRequestedSaga() {
  try {
    const constants: ProfileConstants =
      yield FirebaseHelpers.getConstantsFromFirestore();

    yield put(getConstantsCompleted(constants));
  } catch (e) {
    console.log(e, 'Error from get constants');
  }
}

function* initialAppSetupSaga() {
  yield put(fetchMeRequested());

  yield take(FETCH_OUTFITS_COMPLETED);
  yield take(GET_CONSTANTS_COMPLETED);
  SplashScreen.hide();
}

export default function* rootMiscSaga() {
  yield all([
    takeLatest(GET_CONSTANTS_REQUESTED, getConstantsRequestedSaga),
    takeLatest(INITIAL_APP_SETUP, initialAppSetupSaga),
  ]);
}
