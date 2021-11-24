import gql from 'graphql-tag';
import config from '../../lib/apolloConfig';

export const fetchUser = () => {
  const schema = gql`
    query fetchUser {
      me {
        status {
          error
          msg
        }
        result {
          user_id
          email
          name
        }
      }
    }
  `;

  return config.query({
    query: schema,
  });
};
