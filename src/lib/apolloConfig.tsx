import {ApolloClient, createHttpLink, InMemoryCache} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from 'react-native-config';
import {AUTH_TOKEN} from '../contants/keys';

let config = new ApolloClient({
  uri: Config.GRAPHQL_URI as string,
  cache: new InMemoryCache(),
});

export function setGraphqlHeaders() {
  const httpLink = createHttpLink({
    uri: Config.GRAPHQL_URI as string,
  });

  const authLink = setContext(async (_, {headers}) => {
    // get the authentication token from local storage if it exists
    const token = await AsyncStorage.getItem(AUTH_TOKEN);
    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token || null,
      },
    };
  });

  config = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
}

export default config;
