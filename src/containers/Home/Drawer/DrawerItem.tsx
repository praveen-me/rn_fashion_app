import {DrawerNavigationProp} from '@react-navigation/drawer';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {RectButton} from 'react-native-gesture-handler';
import {HomeRoutes} from 'src/lib/navigation/rootNavigation';
import RoundedIcon from '../../../components/RoundedIcon';
import AppText from '../../../components/Text';
import {Box, Theme, useTheme} from '../../../contants/theme';

interface BaseDrawerItemProps {
  icon: string;
  color: keyof Theme['colors'];
  label: string;
}

interface ScreenDrawerItemProps extends BaseDrawerItemProps {
  screen: keyof HomeRoutes;
}

interface OptionDrawerItemProps extends BaseDrawerItemProps {
  onPress: (navigation: ReturnType<typeof useNavigation>) => void;
}

export type DrawerItemProps = OptionDrawerItemProps | ScreenDrawerItemProps;

const DrawerItem = ({icon, color, label, ...props}: DrawerItemProps) => {
  const theme = useTheme();
  const navigation = useNavigation<
    DrawerNavigationProp<HomeRoutes, 'OutfitIdeas'>
  >();

  return (
    <RectButton
      activeOpacity={0.1}
      style={{borderRadius: theme.spacing.m}}
      onPress={() => {
        const params =
          'screen' in props && props.screen === 'EditProfile'
            ? {showSaveBtn: true}
            : {};

        'screen' in props
          ? navigation.navigate(props.screen, params)
          : props.onPress(navigation);
      }}>
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
