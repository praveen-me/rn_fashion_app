import {ApolloClient, InMemoryCache, HttpLink} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';
import {AUTH_TOKEN} from '../contants/keys';

const httpLink = new HttpLink({uri: Config.GRAPHQL_URI as string});

let config = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export async function setGraphqlHeaders() {
  const token = await AsyncStorage.getItem(AUTH_TOKEN);

  const authLink = setContext((_, {headers}) => {
    return {
      headers: {
        ...headers,
        authorization: token || null,
      },
    };
  });

  config.setLink(authLink.concat(httpLink));
}

export default config;
