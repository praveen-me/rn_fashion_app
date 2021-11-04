import gql from 'graphql-tag';

export const signUpUserRequested = () => {
  const schema = gql`
    mutation signup() {
    }
  `;
};
