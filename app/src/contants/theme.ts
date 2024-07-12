import {
  createBox,
  createText,
  createTheme,
  useTheme as useReTheme,
} from '@shopify/restyle';
import colors from './colors';
import {StyleSheet} from 'react-native';

const theme = createTheme({
  colors: {
    ...colors,
  },
  textVariants: {
    hero: {
      fontSize: 80,
      color: 'white',
      textAlign: 'center',
      lineHeight: 80,
    },
    title1: {
      fontSize: 28,
      color: 'textPrimaryColor',
    },
    title2: {
      fontSize: 23,
      color: 'textPrimaryColor',
      lineHeight: 30,
    },
    body: {
      fontSize: 16,
      color: 'bodyText',
      lineHeight: 24,
    },
    button: {
      fontSize: 15,
      color: 'bodyText',
    },
  },
  spacing: {
    s: 8,
    m: 16,
    l: 22,
    xl: 40,
  },
  borderRadii: {
    s: 4,
    m: 10,
    l: 25,
    xl: 75,
  },
  breakpoints: {},
  commonStyles: StyleSheet.create({
    flex1: {
      flex: 1,
    },
  }),
});

export type Theme = typeof theme;
export const Text = createText<Theme>();
export const Box = createBox<Theme>();

export const useTheme = () => useReTheme<Theme>();
export default theme;
