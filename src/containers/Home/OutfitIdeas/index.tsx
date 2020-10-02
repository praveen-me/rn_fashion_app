import {DrawerActions} from '@react-navigation/native';
import React from 'react';
import {View, Text} from 'react-native';
import Header from '../../../components/Header';
import {Box, useTheme} from '../../../contants/theme';
import {HomeNavigationProps} from '../../../lib/navigation/rootNavigation';
import Background from './Background';
import Card from './Card';

const OutfitIdeas = ({navigation}: HomeNavigationProps<'OutfitIdeas'>) => {
  return (
    <Box flex={1} backgroundColor="white">
      <Header
        title="Outfit Ideas"
        left={{
          icon: 'menu',
          onPress: () => {
            navigation.openDrawer();
          },
          iconColor: '#fafafa',
        }}
        right={{
          icon: 'shopping-bag',
          onPress: () => {},
        }}
      />
      <Box flex={1}>
        <Background />
        <Card position={1} />
        <Card position={0.5} />
        <Card position={0} />
      </Box>
    </Box>
  );
};

export default OutfitIdeas;
