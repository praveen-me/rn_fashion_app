import React, {useState} from 'react';
import {
  sub,
  useDerivedValue,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {useTransition} from 'react-native-redash';
import Header from '../../../components/Header';
import {Box} from '../../../contants/theme';
import {HomeNavigationProps} from '../../../lib/navigation/rootNavigation';
import Background from './Background';
import Card from './Card';
import Categories from './Categories';
import {Animated} from 'react-native';

const cards = [
  {
    index: 3,
    source: require('./../../../assets/images/4.png'),
  },
  {
    index: 2,
    source: require('./../../../assets/images/3.png'),
  },
  {
    index: 1,
    source: require('./../../../assets/images/2.png'),
  },
  {
    index: 0,
    source: require('./../../../assets/images/1.png'),
  },
];

const step = 1 / (cards.length - 1);

const OutfitIdeas = ({navigation}: HomeNavigationProps<'OutfitIdeas'>) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const aIndex = useSharedValue(currentIndex);

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
      <Categories />
      <Box flex={1}>
        <Background />
        {cards.map(({index, source}) => {
          return currentIndex < index * step + step ? (
            <Card
              key={index}
              position={index * step - currentIndex}
              onSwipe={() => setCurrentIndex(prev => prev + step)}
              {...{source, step}}
            />
          ) : null;
        })}
      </Box>
    </Box>
  );
};

export default OutfitIdeas;
