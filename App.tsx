import 'react-native-gesture-handler';
import React from 'react';
import {Platform} from 'react-native';
import {ThemeProvider} from '@shopify/restyle';
import {Provider} from 'react-redux';
import theme from './src/contants/theme';
import RootNavigator from './src/lib/navigation/rootNavigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import {ApolloProvider} from '@apollo/client';
import config from './src/lib/apolloConfig';
import store from './src/lib/store';

export default function App() {
  React.useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }
  }, []);

  return (
    <ApolloProvider client={config}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <SafeAreaProvider>
            {/* <IsLoggedInProvider> */}
            <RootNavigator />
            {/* </IsLoggedInProvider> */}
          </SafeAreaProvider>
        </ThemeProvider>
      </Provider>
    </ApolloProvider>
  );
}
