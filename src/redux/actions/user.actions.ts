export const userActionTypes = {
  SIGNUP_REQUESTED: 'SIGNUP_REQUESTED',
};

export interface ISignupRequested {
  type: typeof userActionTypes.SIGNUP_REQUESTED;
  payload: {
    email: string;
    password: string;
  };
}

export function signupRequested(
  email: string,
  password: string,
): ISignupRequested {
  return {
    type: userActionTypes.SIGNUP_REQUESTED,
    payload: {
      email,
      password,
    },
  };
}
