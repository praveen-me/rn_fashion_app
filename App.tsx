import 'react-native-gesture-handler';
import React from 'react';
import {Platform} from 'react-native';
import {ThemeProvider} from '@shopify/restyle';
import theme from './src/contants/theme';
import RootNavigator from './src/lib/navigation/rootNavigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import SplashScreen from 'react-native-splash-screen';
import {IsLoggedInProvider} from './src/context/useIsLoggedIn';

export default function App() {
  React.useEffect(() => {
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <IsLoggedInProvider>
          <RootNavigator />
        </IsLoggedInProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
