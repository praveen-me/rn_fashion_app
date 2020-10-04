import {ImageStyle, TextStyle, ViewStyle} from 'react-native';
import {Theme, useTheme} from '../contants/theme';

type NamedStyles<T> = {[P in keyof T]: ViewStyle | TextStyle | ImageStyle};

const makeStyles = <T extends NamedStyles<T>>(
  styles: (theme: Theme) => T,
) => () => {
  const theme = useTheme();
  return styles(theme);
};

export default makeStyles;
