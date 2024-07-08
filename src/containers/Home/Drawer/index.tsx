import {DrawerContentComponentProps} from '@react-navigation/drawer';
import {DrawerActions} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Dimensions} from 'react-native';
import Header from '../../../components/Header';
import AppText from '../../../components/Text';
import theme, {Box} from '../../../contants/theme';

import DrawerItem from './DrawerItem';

import {useDispatch, useSelector} from 'react-redux';
import {logoutUserRequested} from '../../../redux/actions/user.actions';
import UserAvatar from '../../../components/UserAvatar';
import {getUser} from '../../../redux/selectors/user.selectors';

const {width: wWidth, height: hHeight} = Dimensions.get('screen');
export const DRAWER_WIDTH = wWidth;
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
    color: 'textPrimaryColor',
  },
];

const Drawer = (props: DrawerContentComponentProps) => {
  const dispatch = useDispatch();
  const currentUser = useSelector(getUser);

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
          backgroundColor="textPrimaryColor">
          <Header
            left={{
              icon: 'x',
              onPress: () => {
                props.navigation.dispatch(DrawerActions.closeDrawer());
              },
            }}
            // right={{
            //   icon: 'shopping-bag',
            //   onPress: () => {
            //     props.navigation.navigate('Cart');
            //   },
            // }}
            title="My Profile"
            dark
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
          paddingTop="m">
          <UserAvatar />

          <Box marginVertical="xl">
            <AppText
              variant="title1"
              center
              style={{
                color: theme.colors.textPrimaryColor,
              }}>
              {currentUser?.name || 'Mike Peter'}
            </AppText>
            <AppText center>{currentUser?.email || 'mike@email.com'}</AppText>
          </Box>
          {drawerItems.map(item => {
            return (
              <DrawerItem
                {...item}
                key={item.icon}
                {...(item.label === 'Logout'
                  ? {
                      onPress: () => dispatch(logoutUserRequested()),
                    }
                  : {})}
              />
            );
          })}
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
          style={styles.bg}
        />
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create({
  bg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'red',
    borderTopLeftRadius: 75,
  },
});

export default Drawer;
