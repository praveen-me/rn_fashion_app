import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {RectButton} from 'react-native-gesture-handler';
import RoundedIcon from '../../../components/RoundedIcon';
import AppText from '../../../components/Text';
import {Box, Theme, useTheme} from '../../../contants/theme';

interface DrawerItemProps {
  icon: string;
  color: keyof Theme['colors'];
  label: string;
  screen: string;
}

const DrawerItem = ({icon, color, label, screen}: DrawerItemProps) => {
  const theme = useTheme();
  const navigation = useNavigation();

  return (
    <RectButton
      activeOpacity={0.1}
      style={{borderRadius: theme.spacing.m}}
      onPress={() => navigation.navigate(screen)}>
      <Box flexDirection="row" alignItems="center" padding="m">
        <RoundedIcon
          {...{name: icon}}
          backgroundColor={color}
          color={'#fff'}
          size={30}
          iconRatio={0.5}
        />
        <AppText
          variant="button"
          medium
          style={{
            color: theme.colors.textPrimaryColor,
            marginLeft: theme.spacing.m,
          }}>
          {label}
        </AppText>
      </Box>
    </RectButton>
  );
};

export default DrawerItem;
