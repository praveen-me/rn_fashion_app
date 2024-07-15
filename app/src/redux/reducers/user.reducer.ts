import {
  LOGIN_COMPLETED,
  ILoginCompleted,
  LOGOUT_USER_COMPLETED,
  ILogoutUserCompleted,
  FETCH_OUTFITS_COMPLETED,
  type IFetchOutfitsCompleted,
} from '../actions/user.actions';
import type {IUserState} from '../@types';

const initState: IUserState = {
  isAuthenticated: false,
  currentUser: null,
  outfits: [],
};

type RootAction =
  | ILoginCompleted
  | ILogoutUserCompleted
  | IFetchOutfitsCompleted;

export default function userReducer(
  state = initState,
  action: RootAction,
): IUserState {
  switch (action.type) {
    case LOGIN_COMPLETED: {
      const user = action.payload;

      return {
        ...state,
        isAuthenticated: true,
        currentUser: {
          ...state.currentUser,
          ...user,
        } as IUserState['currentUser'],
      };
    }

    case LOGOUT_USER_COMPLETED: {
      return {
        ...state,
        currentUser: initState.currentUser,
        isAuthenticated: initState.isAuthenticated,
      };
    }

    case FETCH_OUTFITS_COMPLETED: {
      return {
        ...state,
        outfits: action.payload,
      };
    }

    default:
      return state;
  }
}
