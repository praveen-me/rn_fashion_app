import type { User } from '@supabase/supabase-js';
import {
  LOGIN_COMPLETED,
  ILoginCompleted,
  LOGOUT_USER_COMPLETED,
  ILogoutUserCompleted,
  FETCH_OUTFITS_COMPLETED,
  type IFetchOutfitsCompleted,
} from '../actions/user.actions';

export interface IUserState {
  isAuthenticated: boolean;
  currentUser: User | null;
  outfits: {id: number, url: string}[]
}

const initState: IUserState = {
  isAuthenticated: false,
  currentUser: null,
  outfits: []
};

type RootAction = ILoginCompleted | ILogoutUserCompleted| IFetchOutfitsCompleted;

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

    case FETCH_OUTFITS_COMPLETED: { 
      return {
        ...state,
        outfits: action.payload
      }
    }

    default:
      return state;
  }
}
