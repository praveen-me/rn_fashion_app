import 'react-native-gesture-handler';
import * as React from 'react';

import {ThemeProvider} from '@shopify/restyle';
import theme from './src/contants/theme';
import RootNavigator from './src/lib/navigation/rootNavigation';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <RootNavigator />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}
