import {initialAppSetup} from '../redux/actions/misc.actions';
import store from './store';

function setup(unSubscribeCB?: () => void) {
  store.dispatch(initialAppSetup());

  return () => {
    unSubscribeCB?.();
  };
}

export default setup;
