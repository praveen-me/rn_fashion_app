import React, {useRef, useState} from 'react';
import {Dimensions} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {
  Transition,
  Transitioning,
  TransitioningView,
} from 'react-native-reanimated';
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
    selected: false,
  },
  {
    id: 2,
    color: '#ddd',
    aspectRatio: 120 / 98,
    selected: false,
  },
  {
    id: 3,
    color: '#d5c3bb',
    aspectRatio: 210 / 145,
    selected: false,
  },
  {
    id: 4,
    color: '#bfea76',
    aspectRatio: 160 / 145,
    selected: false,
  },
  {
    id: 5,
    color: '#bfeaf5',
    aspectRatio: 1,
    selected: false,
  },
  {
    id: 6,
    color: '#d86736',
    aspectRatio: 188 / 145,
    selected: false,
  },
  {
    id: 7,
    color: '#d5c3bb',
    aspectRatio: 210 / 145,
    selected: false,
  },
  {
    id: 8,
    color: '#bfeaf5',
    aspectRatio: 160 / 145,
    selected: false,
  },
  {
    id: 9,
    color: '#bfeaf5',
    aspectRatio: 1,
    selected: false,
  },
  {
    id: 10,
    color: '#ddd',
    aspectRatio: 120 / 98,
    selected: false,
  },
  {
    id: 11,
    color: '#d5c3bb',
    aspectRatio: 210 / 145,
    selected: false,
  },
  {
    id: 12,
    color: '#bfea76',
    aspectRatio: 160 / 145,
    selected: false,
  },
  {
    id: 13,
    color: '#bfeaf5',
    aspectRatio: 1,
    selected: false,
  },
  {
    id: 14,
    color: '#d86736',
    aspectRatio: 188 / 145,
    selected: false,
  },
  {
    id: 15,
    color: '#d5c3bb',
    aspectRatio: 210 / 145,
    selected: false,
  },
  {
    id: 16,
    color: '#bfeaf5',
    aspectRatio: 160 / 145,
    selected: false,
  },
];

const FavouriteOutfits = ({
  navigation,
}: HomeNavigationProps<'FavouriteOutfits'>) => {
  const theme = useTheme();
  const width = (wWidth - theme.spacing.m * 3) / 2;
  const [outfits, setOutfits] = useState(allOutfits);
  const list = useRef<TransitioningView>(null);
  const transition = <Transition.Change interpolation="easeInOut" />;

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
          <Transitioning.View transition={transition} ref={list}>
            <Box flexDirection="row">
              <Box marginRight="m">
                {outfits
                  .filter(({id}) => id % 2 === 1)
                  .map((outfit) => (
                    <Outfit
                      key={outfit.id}
                      {...{width, ...outfit}}
                      onPress={onOutfitPress}
                      outfit={outfit}
                    />
                  ))}
              </Box>

              <Box>
                {outfits
                  .filter(({id}) => id % 2 === 0)
                  .map((outfit) => (
                    <Outfit
                      key={outfit.id}
                      {...{width, ...outfit}}
                      onPress={onOutfitPress}
                      outfit={outfit}
                    />
                  ))}
              </Box>
            </Box>
          </Transitioning.View>
        </ScrollView>
      </Box>

      <Footer
        label="Start"
        onPress={() => {
          const items = outfits.filter((k) => !k.selected);
          console.log({items});

          setOutfits([]);
          setOutfits(items);
          list.current?.animateNextTransition();
        }}
      />
    </Box>
  );
};

export default FavouriteOutfits;
