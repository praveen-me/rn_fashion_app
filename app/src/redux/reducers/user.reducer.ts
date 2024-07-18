import {
  LOGIN_COMPLETED,
  ILoginCompleted,
  LOGOUT_USER_COMPLETED,
  ILogoutUserCompleted,
  FETCH_OUTFITS_COMPLETED,
  type IFetchOutfitsCompleted,
  IUserNotificationsUpdateCompleted,
  UPDATE_USER_NOTIFICATION_COMPLETED,
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
  | IFetchOutfitsCompleted
  | IUserNotificationsUpdateCompleted;

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

    case UPDATE_USER_NOTIFICATION_COMPLETED: {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          ...action.payload,
        } as IUserState['currentUser'],
      };
    }

    default:
      return state;
  }
}
