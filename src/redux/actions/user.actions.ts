import {ISignupState} from '../../containers/Authentication/SignUp';
import {IFetchMeUser} from '../@types';

export type SignupPayload = Omit<ISignupState, 'passwordConfirmation'>;

export const SIGNUP_REQUESTED = 'SIGNUP_REQUESTED';
export const LOGIN_REQUESTED = 'LOGIN_REQUESTED';
export const LOGIN_COMPLETED = 'LOGIN_COMPLETED';

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
  payload: IFetchMeUser;
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

export function loginCompleted(user: IFetchMeUser): ILoginCompleted {
  return {
    type: LOGIN_COMPLETED,
    payload: user,
  };
}
