import gql from 'graphql-tag';
import config from '../../lib/apolloConfig';
import {SignupPayload} from '../../redux/actions/user.actions';

export const signUpUserRequested = (payload: SignupPayload) => {
  const {email, password} = payload;

  console.log({email, password});

  const schema = gql`
    mutation SignUp($email: String!, $password: String!) {
      signup(email: $email, password: $password) {
        status
        result
      }
    }
  `;

  return config.mutate({
    mutation: schema,
    variables: {
      email,
      password,
    },
  });
};
