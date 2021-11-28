import {IFetchMeUser} from '../@types';
import {
  LOGIN_COMPLETED,
  ILoginCompleted,
  LOGOUT_USER_COMPLETED,
  ILogoutUserCompleted,
} from '../actions/user.actions';

export interface IUserState {
  isAuthenticated: boolean;
  currentUser: IFetchMeUser | null;
}

const initState: IUserState = {
  isAuthenticated: false,
  currentUser: null,
};

type RootAction = ILoginCompleted | ILogoutUserCompleted;

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

    case LOGOUT_USER_COMPLETED: {
      return {
        ...state,
        currentUser: initState.currentUser,
        isAuthenticated: initState.isAuthenticated,
      };
    }

    default:
      return state;
  }
}
