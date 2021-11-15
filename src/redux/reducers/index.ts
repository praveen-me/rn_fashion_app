import {combineReducers} from 'redux';
import userReducer, {IUserState} from './user.reducer';

export interface IAppState {
  user: IUserState;
}

const rootReducer = combineReducers<IAppState>({
  user: userReducer,
});

export default rootReducer;
