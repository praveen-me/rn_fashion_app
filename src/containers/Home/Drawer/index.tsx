import {
  DrawerContentComponentProps,
  DrawerContentOptions,
} from '@react-navigation/drawer';
import React from 'react';
import {Image, StyleSheet, Dimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import RoundedIcon from '../../../components/RoundedIcon';
import RoundedIconButton from '../../../components/RoundedIconButton';
import AppText from '../../../components/Text';
import theme, {Box, useTheme} from '../../../contants/theme';

import DrawerItem from './DrawerItem';

const {width: wWidth, height: hHeight} = Dimensions.get('screen');
export const DRAWER_WIDTH = wWidth * 0.8;
const aspectRatio = hHeight / 1125;
const height = DRAWER_WIDTH * aspectRatio;

interface Props {}

const drawerItems = [
  {
    icon: 'zap',
    label: 'Outfit Ideas',
    screen: 'OutfitIdeas',
    color: 'primatyBtnBg',
  },
  {
    icon: 'heart',
    label: 'Favourite Outfits',
    screen: 'FavouriteOutfits',
    color: 'orange',
  },
  {
    icon: 'user',
    label: 'Edit Profile',
    screen: 'EditProfile',
    color: 'yellow',
  },
  {
    icon: 'clock',
    label: 'Transaction History',
    screen: 'TransactionHistory',
    color: 'pink',
  },
  {
    icon: 'settings',
    label: 'Notification Settings',
    screen: 'NotificationSettings',
    color: 'violet',
  },
  {
    icon: 'log-out',
    label: 'Logout',
    screen: 'Logout',
    color: 'textPrimaryColor',
  },
];

const Drawer = (props: DrawerContentComponentProps<DrawerContentOptions>) => {
  const insets = useSafeAreaInsets();

  return (
    <Box flex={1} overflow="hidden">
      <Image
        style={{...StyleSheet.absoluteFillObject}}
        source={require('../../../assets/images/patterns/1.jpeg')}
      />
      <Box flex={0.2} backgroundColor="white">
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          borderBottomRightRadius="xl"
          backgroundColor="textPrimaryColor"
          flexDirection="row"
          padding="m"
          style={{paddingTop: insets.top}}
          justifyContent="space-between">
          <RoundedIconButton
            name="x"
            color="white"
            size={30}
            backgroundColor="textPrimaryColor"
            onPress={() => {}}
          />
          <AppText style={{color: '#fff'}}>My Profile</AppText>
          <RoundedIconButton
            name="shopping-bag"
            color="white"
            size={30}
            backgroundColor="textPrimaryColor"
            onPress={() => {}}
          />
        </Box>
      </Box>
      <Box flex={0.8}>
        <Box flex={1} backgroundColor="textPrimaryColor" />
        <Box flex={1} backgroundColor="transparent" />
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          borderTopLeftRadius="xl"
          backgroundColor="white"
          borderBottomRightRadius="xl"
          justifyContent="center"
          padding="xl">
          <Box
            height={100}
            width={100}
            backgroundColor={'danger'}
            style={{borderRadius: 100 / 2}}
            alignSelf="center"
            position="absolute"
            top={-50}
            zIndex={1000}
          />
          <Box marginVertical="xl">
            <AppText
              variant="title1"
              center
              style={{
                color: theme.colors.textPrimaryColor,
              }}>
              Mike Peter
            </AppText>
            <AppText center>mike@email.com</AppText>
          </Box>
          {drawerItems.map((item) => (
            <DrawerItem {...item} key={item.icon} />
          ))}
        </Box>
      </Box>
      <Box
        flex={0.2}
        backgroundColor="white"
        overflow="hidden"
        width={DRAWER_WIDTH}
        height={height}>
        <Image
          source={require('../../../assets/images/patterns/1.jpeg')}
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'red',
            borderTopLeftRadius: 75,
          }}
        />
      </Box>
    </Box>
  );
};

export default Drawer;
