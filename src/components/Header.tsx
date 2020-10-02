import React from 'react';
import {StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Box, Theme, useTheme} from '../contants/theme';
import RoundedIconButton from './RoundedIconButton';
import AppText from './Text';

interface HeaderProps {
  left: {
    icon: string;
    onPress: () => void;
    iconColor?: string;
  };
  title: string;
  right: {
    icon: string;
    onPress: () => void;
    iconColor?: string;
  };
  dark: boolean;
}

const Header = ({title, left, right, dark}: HeaderProps) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  const color = dark ? 'white' : 'textPrimaryColor';
  const backgroundColor = dark ? 'textPrimaryColor' : 'lightGrey';

  console.log(theme.colors[color], 'cokor');

  return (
    <Box
      flexDirection="row"
      paddingHorizontal="m"
      style={{marginTop: insets.top}}
      justifyContent="space-between"
      alignItems="center">
      <RoundedIconButton
        name={left.icon}
        size={44}
        onPress={left.onPress}
        {...{color, backgroundColor}}
        iconRatio={0.5}
      />
      <AppText
        style={{...styles.headerTitle, color: theme.colors[color]}}
        medium>
        {title.toUpperCase()}
      </AppText>
      <RoundedIconButton
        name={right.icon}
        size={44}
        onPress={right.onPress}
        {...{color, backgroundColor}}
        iconRatio={0.5}
      />
    </Box>
  );
};

Header.defaultProps = {
  left: {
    iconColor: '#fff',
  },
  right: {
    iconColor: '#fff',
  },
  dark: false,
};

const styles = StyleSheet.create({
  headerTitle: {
    color: '#fff',
    fontSize: 12,
    lineHeight: 24,
  },
});

export default Header;
