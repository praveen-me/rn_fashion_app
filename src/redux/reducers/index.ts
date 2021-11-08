import {combineReducers} from 'redux';
import userReducer, {IUserState} from './user';

interface IState {
  user: IUserState;
}

const rootReducer = combineReducers<IState>({
  user: userReducer,
});

export default rootReducer;
