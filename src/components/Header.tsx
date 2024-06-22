import React from 'react';
import {StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Box, useTheme} from '../contants/theme';
import RoundedIconButton from './RoundedIconButton';
import AppText from './Text';

interface HeaderProps {
  left: {
    icon: string;
    onPress: () => void;
    iconColor?: string;
  };
  title: string;
  right?: {
    icon: string;
    onPress: () => void;
    iconColor?: string;
  };
  dark?: boolean;
}

const Header = ({
  title,
  left = {icon: '', onPress: () => {}, iconColor: '#fff'},
  right = {icon: '', onPress: () => {}, iconColor: '#fff'},
  dark = false,
}: HeaderProps) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();

  const textColor = dark ? 'white' : 'textPrimaryColor';
  const color = dark ? theme.colors.white : theme.colors.textPrimaryColor;
  const backgroundColor = dark ? 'textPrimaryColor' : 'lightGrey';

  return (
    <Box
      flexDirection="row"
      paddingHorizontal="m"
      paddingVertical="m"
      style={{marginTop: insets.top}}
      justifyContent="space-between"
      alignItems="center">
      {left.icon && (
        <RoundedIconButton
          name={left.icon}
          size={44}
          onPress={left.onPress}
          {...{color, backgroundColor}}
          iconRatio={0.5}
        />
      )}
      <AppText
        style={{...styles.headerTitle, color: theme.colors[textColor]}}
        medium
        center>
        {title.toUpperCase()}
      </AppText>
      {right.icon && (
        <RoundedIconButton
          name={right.icon}
          size={44}
          onPress={right.onPress}
          {...{color, backgroundColor}}
          iconRatio={0.5}
        />
      )}
    </Box>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    color: '#fff',
    fontSize: 12,
    lineHeight: 24,
    flex: 1,
  },
});

export default Header;
