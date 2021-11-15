import gql from 'graphql-tag';
import config from '../../lib/apolloConfig';
import {SignupPayload} from '../../redux/actions/user.actions';

export const signUpUserRequested = (payload: SignupPayload) => {
  const {email, password} = payload;

  const schema = gql`
    mutation signup($signupInput: UserCredsInput!) {
      signup(input: $signupInput) {
        status {
          error
          msg
        }
        result {
          user_id
          email
        }
      }
    }
  `;

  return config.mutate({
    mutation: schema,
    variables: {
      signupInput: {
        email,
        password,
      },
    },
  });
};

export const loginUserRequested = (payload: SignupPayload) => {
  const {email, password} = payload;

  const schema = gql`
    mutation login($signupInput: UserCredsInput!) {
      login(input: $signupInput) {
        status {
          error
          msg
        }
        result {
          token
        }
      }
    }
  `;

  return config.mutate({
    mutation: schema,
    variables: {
      signupInput: {
        email,
        password,
      },
    },
  });
};
