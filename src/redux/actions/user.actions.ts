import type {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';
import type {IUserData} from '../../@types';
import {ISignupState} from '../../containers/Authentication/SignUp';
import type {URLItem} from '../../lib/firebase';

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
  payload: IUserData;
}

export interface IFetchMeRequested {
  type: typeof FETCH_ME_REQUESTED;
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

export function loginCompleted(user: IUserData): ILoginCompleted {
  return {
    type: LOGIN_COMPLETED,
    payload: user,
  };
}

export function fetchMeRequested(): IFetchMeRequested {
  return {
    type: FETCH_ME_REQUESTED,
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
