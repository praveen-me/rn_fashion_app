import {ISignupState} from '../../containers/Authentication/SignUp';

export type SignupPayload = Omit<ISignupState, 'passwordConfirmation'>;

export const SIGNUP_REQUESTED = 'SIGNUP_REQUESTED';

export interface ISignupRequested {
  type: typeof SIGNUP_REQUESTED;
  payload: SignupPayload;
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
