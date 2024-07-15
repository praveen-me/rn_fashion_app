import type {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import type {IUserData} from '../../@types';
import {ISignupState} from '../../containers/Authentication/SignUp';
import type {URLItem} from '../../lib/firebase';
import type {FirebaseAuthTypes} from '@react-native-firebase/auth';

export type SignupPayload = Omit<ISignupState, 'passwordConfirmation'>;

export const SIGNUP_REQUESTED = 'SIGNUP_REQUESTED';
export const LOGIN_REQUESTED = 'LOGIN_REQUESTED';
export const LOGIN_COMPLETED = 'LOGIN_COMPLETED';
export const FETCH_ME_REQUESTED = 'FETCH_ME_REQUESTED';
export const LOGOUT_USER_REQUESTED = 'LOGOUT_USER_REQUESTED';
export const LOGOUT_USER_COMPLETED = 'LOGOUT_USER_COMPLETED';
export const OAUTH_REQUESTED = 'OAUTH_REQUESTED';
export const FETCH_OUTFITS_REQUESTED = 'FETCH_OUTFITS_REQUESTED';
export const FETCH_OUTFITS_COMPLETED = 'FETCH_OUTFITS_COMPLETED';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const UPDATE_USER_REQUESTED = 'UPDATE_USER_REQUESTED';

export const UPLOAD_USER_AVATAR_REQUESTED = 'UPLOAD_USER_AVATAR_REQUESTED';

export interface ISignupRequested {
  type: typeof SIGNUP_REQUESTED;
  payload: SignupPayload;
}

export interface ILoginRequested {
  type: typeof LOGIN_REQUESTED;
  payload: SignupPayload;
}

export interface ILoginCompleted {
  type: typeof LOGIN_COMPLETED;
  payload: Partial<IUserData>;
}

export interface IFetchMeRequested {
  type: typeof FETCH_ME_REQUESTED;
  payload: {
    onlySession?: boolean;
  };
}
export interface ILogoutUserRequested {
  type: typeof LOGOUT_USER_REQUESTED;
}
export interface ILogoutUserCompleted {
  type: typeof LOGOUT_USER_COMPLETED;
}
export interface IOAuthRequested {
  type: typeof OAUTH_REQUESTED;
}

export interface IFetchOutfitsRequested {
  type: typeof FETCH_OUTFITS_REQUESTED;
}

export interface IFetchOutfitsCompleted {
  type: typeof FETCH_OUTFITS_COMPLETED;
  payload: URLItem[];
}

export interface ISetCurrentUser {
  type: typeof SET_CURRENT_USER;
  payload: IUserData;
}

export interface IUpdateUserRequested {
  type: typeof UPDATE_USER_REQUESTED;
  payload: Partial<IUserData>;
}

export interface IUploadUserAvatarRequested {
  type: typeof UPLOAD_USER_AVATAR_REQUESTED;
  payload: {
    avatar: string;
  };
}

export function signupRequested(data: SignupPayload): ISignupRequested {
  const {email, password} = data;

  return {
    type: SIGNUP_REQUESTED,
    payload: {
      email,
      password,
    },
  };
}

export function loginRequested(data: SignupPayload): ILoginRequested {
  const {email, password} = data;

  return {
    type: LOGIN_REQUESTED,
    payload: {
      email,
      password,
    },
  };
}

export function loginCompleted(user: Partial<IUserData>): ILoginCompleted {
  return {
    type: LOGIN_COMPLETED,
    payload: user,
  };
}

export function fetchMeRequested(config?: {
  onlySession?: boolean;
}): IFetchMeRequested {
  return {
    type: FETCH_ME_REQUESTED,
    payload: {
      onlySession: config?.onlySession,
    },
  };
}

export function logoutUserRequested(): ILogoutUserRequested {
  return {
    type: LOGOUT_USER_REQUESTED,
  };
}
export function logoutUserCompleted(): ILogoutUserCompleted {
  return {
    type: LOGOUT_USER_COMPLETED,
  };
}

export function oAuthRequested(): IOAuthRequested {
  return {
    type: OAUTH_REQUESTED,
  };
}

export function fetchOutfitsRequested(): IFetchOutfitsRequested {
  return {
    type: FETCH_OUTFITS_REQUESTED,
  };
}

export function fetchOutfitsCompleted(
  outfits: URLItem[],
): IFetchOutfitsCompleted {
  return {
    type: FETCH_OUTFITS_COMPLETED,
    payload: outfits,
  };
}

export function setCurrentUser(user: IUserData): ISetCurrentUser {
  return {
    type: SET_CURRENT_USER,
    payload: user,
  };
}

export function updateUserRequested(
  data: Partial<IUserData>,
): IUpdateUserRequested {
  return {
    type: UPDATE_USER_REQUESTED,
    payload: data,
  };
}

export function uploadUserAvatarRequested({
  avatar,
}: {
  avatar: string;
}): IUploadUserAvatarRequested {
  return {
    type: UPLOAD_USER_AVATAR_REQUESTED,
    payload: {
      avatar,
    },
  };
}
