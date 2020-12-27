import React from 'react';
import {StyleSheet, Image, Dimensions} from 'react-native';
import Header from '../../../components/Header';
import theme, {Box} from '../../../contants/theme';
import {HomeNavigationProps} from '../../../lib/navigation/rootNavigation';
import Notification from './Notification';

const {width: wWidth, height: hHeight} = Dimensions.get('screen');
export const DRAWER_WIDTH = wWidth;
const aspectRatio = hHeight / 1200;
const height = DRAWER_WIDTH * aspectRatio;

export default function NotificationSettings({
  navigation,
}: HomeNavigationProps<'NotificationSettings'>) {
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
            onPress: () => {
              navigation.openDrawer();
            },
            iconColor: '#fafafa',
          }}
          right={{
            icon: 'share',
            onPress: () => {},
          }}
        />
      </Box>
      <Box
        flex={0.6}
        padding="m"
        backgroundColor="white"
        borderBottomRightRadius="xl">
        <Notification
          title="Outfit Ideas"
          description="Receive daily notifications"
        />
        <Notification
          title="Discounts & bSales"
          description="Buy the stuff you love for less"
        />
        <Notification
          title="Stock Notifications"
          description="If the product you 💜 comes back in the stock"
        />
        <Notification
          title="New Stuff"
          description="Hear it first, wear it first"
        />
      </Box>
      <Box
        position="absolute"
        bottom={0}
        left={0}
        right={0}
        flex={0.4}
        width={wWidth}
        height={height}
        overflow="hidden"
        backgroundColor="white">
        <Image
          style={{
            ...StyleSheet.absoluteFillObject,
            borderTopLeftRadius: theme.spacing.xl,
          }}
          source={require('../../../assets/images/patterns/1.jpeg')}
        />
      </Box>
    </Box>
  );
}
