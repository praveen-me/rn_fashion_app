import {combineReducers} from 'redux';
import userReducer from './user.reducer';
import miscReducer from './misc.reducer';
import type {IMiscState, IUserState} from '../@types';

export interface IAppState {
  user: IUserState;
  misc: IMiscState;
}

const rootReducer = combineReducers<IAppState>({
  user: userReducer,
  misc: miscReducer,
});

export default rootReducer;
