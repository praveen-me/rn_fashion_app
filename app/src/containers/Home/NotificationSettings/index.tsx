import React, {useCallback} from 'react';
import {StyleSheet, Image, Dimensions} from 'react-native';
import Header from '../../../components/Header';
import theme, {Box} from '../../../contants/theme';
import {HomeNavigationProps} from '../../../lib/navigation/rootNavigation';
import Notification from './Notification';
import {useDispatch, useSelector} from 'react-redux';
import {getUserNotifications} from '../../../redux/selectors/user.selectors';
import {updateUserNotificationsRequested} from '../../../redux/actions/user.actions';

const {width: wWidth} = Dimensions.get('screen');
export const DRAWER_WIDTH = wWidth;

const notificationOptions = [
  {
    key: 'outfitIdeas',
    label: 'Outfit Ideas',
    description: 'Receive daily notifications',
  },
  {
    key: 'discounts',
    label: 'Discounts & bSales',
    description: 'Buy the stuff you love for less',
  },
  {
    key: 'stock',
    label: 'Stock Notifications',
    description: 'If the product you 💜 comes back in the stock',
  },
  {
    key: 'newStuff',
    label: 'New Stuff',
    description: 'Hear it first, wear it first',
  },
];

export default function NotificationSettings({
  navigation,
}: HomeNavigationProps<'NotificationSettings'>) {
  const dispatch = useDispatch();
  const notifications = useSelector(getUserNotifications);

  const openDrawer = useCallback(() => {
    navigation.openDrawer();
  }, []);

  const handleUserNotificationUpdate = (
    notificationKey: keyof typeof notifications,
    value: boolean,
  ) => {
    dispatch(
      updateUserNotificationsRequested({
        key: notificationKey,
        value,
      }),
    );
  };

  return (
    <Box flex={1} backgroundColor="white">
      <Image
        style={{...StyleSheet.absoluteFillObject}}
        source={require('../../../assets/images/patterns/1.jpeg')}
      />
      <Box backgroundColor="white">
        <Header
          title="Notifications"
          left={{
            icon: 'menu',
            onPress: openDrawer,
            iconColor: '#fafafa',
          }}
          right={{
            icon: 'share',
            onPress: () => {},
          }}
        />
      </Box>
      <Box flex={1}>
        <Box
          flex={0.6}
          padding="m"
          backgroundColor="white"
          borderBottomRightRadius="xl">
          {notificationOptions.map(notificationItem => (
            <Notification
              key={notificationItem.key}
              title={notificationItem.label}
              description={notificationItem.description}
              value={
                notifications[
                  notificationItem.key as keyof typeof notifications
                ]
              }
              onChange={handleUserNotificationUpdate}
              notificationKey={notificationItem.key}
            />
          ))}
        </Box>
        <Box
          flex={0.4}
          width={wWidth}
          overflow="hidden"
          backgroundColor="white">
          <Image
            style={{
              ...StyleSheet.absoluteFillObject,
              borderTopLeftRadius: theme.spacing.xl * 1.5,
            }}
            source={require('../../../assets/images/patterns/1.jpeg')}
          />
        </Box>
      </Box>
    </Box>
  );
}
