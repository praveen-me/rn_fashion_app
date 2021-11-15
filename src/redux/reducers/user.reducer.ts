import {IFetchMeUser} from '../@types';
import {LOGIN_COMPLETED, ILoginCompleted} from '../actions/user.actions';

export interface IUserState {
  isAuthenticated: boolean;
  currentUser: IFetchMeUser | null;
}

const initState: IUserState = {
  isAuthenticated: false,
  currentUser: null,
};

type RootAction = ILoginCompleted;

export default function userReducer(state = initState, action: RootAction) {
  switch (action.type) {
    case LOGIN_COMPLETED: {
      const user = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        currentUser: user,
      };
    }

    default:
      return state;
  }
}
