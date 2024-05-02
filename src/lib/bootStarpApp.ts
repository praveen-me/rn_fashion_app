import store from './store';
import {fetchMeRequested} from '../redux/actions/user.actions';
import supabase, {SbClient} from './supabase';

async function bootStrapApp() {
  supabase.init();
  store.dispatch(fetchMeRequested());
}

export default bootStrapApp;
