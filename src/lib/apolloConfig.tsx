import {ApolloClient, InMemoryCache} from '@apollo/client';
import Config from 'react-native-config';

console.log('uri', Config.GRAPHQL_URI);

const config = new ApolloClient({
  uri: Config.GRAPHQL_URI as string,
  cache: new InMemoryCache(),
});

export default config;
