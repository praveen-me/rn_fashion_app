import store from './store';
import {fetchMeRequested} from '../redux/actions/user.actions';

async function bootStrapApp() {
  store.dispatch(fetchMeRequested());
}

export default bootStrapApp;
