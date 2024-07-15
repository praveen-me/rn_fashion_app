import 'react-native-gesture-handler';
import React from 'react';
import {Platform} from 'react-native';
import {ThemeProvider} from '@shopify/restyle';
import {Provider} from 'react-redux';
import theme from './src/contants/theme';
import RootNavigator from './src/lib/navigation/rootNavigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import store from './src/lib/store';
import setup from './src/lib/setup';
import Toast from './src/components/Toast';

export default function App() {
  React.useEffect(() => {
    if (Platform.OS === 'android') {
      setup();
    }
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SafeAreaProvider>
          <RootNavigator />
        </SafeAreaProvider>
        <Toast message="Placeholder" position="top" type="success" />
      </ThemeProvider>
    </Provider>
  );
}
