import gql from 'graphql-tag';
import config from '../../lib/apolloConfig';

export const fetchUser = () => {
  const schema = gql`
    query fetchUser() {
      me() {
        user_id
        email
        name
      }
    }
  `;

  return config.query({
    query: schema,
  });
};
