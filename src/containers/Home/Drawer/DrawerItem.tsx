import React from 'react';
import {RectButton} from 'react-native-gesture-handler';
import RoundedIcon from '../../../components/RoundedIcon';
import AppText from '../../../components/Text';
import {Box, Theme, useTheme} from '../../../contants/theme';

interface DrawerItemProps {
  icon: string;
  color: keyof Theme['colors'];
  label: string;
  key: string;
}

const DrawerItem = ({icon, color, label}: DrawerItemProps) => {
  const theme = useTheme();

  return (
    <RectButton activeOpacity={0.1} style={{borderRadius: theme.spacing.m}}>
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
