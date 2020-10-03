import React, {useState} from 'react';
import {Dimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import Header from '../../../components/Header';
import {Box, useTheme} from '../../../contants/theme';
import {HomeNavigationProps} from '../../../lib/navigation/rootNavigation';
import Footer from './Footer';
import Outfit from './Outfit';

const {width: wWidth} = Dimensions.get('screen');

const allOutfits = [
  {
    id: 1,
    color: '#bfeaf5',
    aspectRatio: 1,
  },
  {
    id: 2,
    color: '#ddd',
    aspectRatio: 120 / 98,
  },
  {
    id: 3,
    color: '#d5c3bb',
    aspectRatio: 210 / 145,
  },
  {
    id: 4,
    color: '#bfea76',
    aspectRatio: 160 / 145,
  },
  {
    id: 5,
    color: '#bfeaf5',
    aspectRatio: 1,
  },
  {
    id: 6,
    color: '#d86736',
    aspectRatio: 188 / 145,
  },
  {
    id: 7,
    color: '#d5c3bb',
    aspectRatio: 210 / 145,
  },
  {
    id: 8,
    color: '#bfeaf5',
    aspectRatio: 160 / 145,
  },
  {
    id: 9,
    color: '#bfeaf5',
    aspectRatio: 1,
  },
  {
    id: 10,
    color: '#ddd',
    aspectRatio: 120 / 98,
  },
  {
    id: 11,
    color: '#d5c3bb',
    aspectRatio: 210 / 145,
  },
  {
    id: 12,
    color: '#bfea76',
    aspectRatio: 160 / 145,
  },
  {
    id: 13,
    color: '#bfeaf5',
    aspectRatio: 1,
  },
  {
    id: 14,
    color: '#d86736',
    aspectRatio: 188 / 145,
  },
  {
    id: 15,
    color: '#d5c3bb',
    aspectRatio: 210 / 145,
  },
  {
    id: 16,
    color: '#bfeaf5',
    aspectRatio: 160 / 145,
  },
];

const FavouriteOutfits = ({
  navigation,
}: HomeNavigationProps<'FavouriteOutfits'>) => {
  const theme = useTheme();
  const width = (wWidth - theme.spacing.m * 3) / 2;
  const [outfits] = useState(allOutfits);
  const [selectedOutfits, setSelectedOutfits] = useState<typeof allOutfits>([]);

  const onOutfitPress = () => {};

  return (
    <Box flex={1}>
      <Header
        title="Favourite Outfits"
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
        <ScrollView
          contentContainerStyle={{
            paddingHorizontal: theme.spacing.m,
            paddingBottom: theme.spacing.xl * 4,
          }}>
          <Box flexDirection="row">
            <Box marginRight="m">
              {outfits
                .filter((_, index) => index % 2 === 1)
                .map((outfit, index) => (
                  <Outfit
                    {...outfit}
                    key={index}
                    {...{width}}
                    onPress={onOutfitPress}
                  />
                ))}
            </Box>
            <Box>
              {outfits
                .filter((_, index) => index % 2 === 0)
                .map((outfit, index) => (
                  <Outfit
                    {...outfit}
                    key={index}
                    {...{width}}
                    onPress={onOutfitPress}
                  />
                ))}
            </Box>
          </Box>
        </ScrollView>
      </Box>

      <Footer label="Start" onPress={() => {}} />
    </Box>
  );
};

export default FavouriteOutfits;
