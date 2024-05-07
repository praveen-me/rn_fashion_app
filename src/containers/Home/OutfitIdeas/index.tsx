import React, {useEffect, useState} from 'react';
import {
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated';

import Header from '../../../components/Header';
import {Box} from '../../../contants/theme';
import {HomeNavigationProps} from '../../../lib/navigation/rootNavigation';
import Background from './Background';
import Card from './Card';
import Categories from './Categories';
import {useSelector} from 'react-redux';
import {getOutfits} from '../../../redux/selectors/user.selectors';

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

const step = 1 / (5 - 1);

interface OutfitCardsProps {
  outfits: {id: number; url: string}[];
  currentIndex: number;
  aIndex: SharedValue<number>;
  step: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

const OutfitCards: React.FC<OutfitCardsProps> = ({
  outfits,
  currentIndex,
  aIndex,
  step,
  setCurrentIndex,
}) => {
  return (
    <>
      {outfits.map(({id: index, url: source}) => {
        const position = useDerivedValue(() => index * step - aIndex.value);

        return (
          currentIndex < index * step + step && (
            <Card
              key={index}
              position={position}
              onSwipe={() => {
                console.log('called');
                setCurrentIndex(prev => prev + step);
              }}
              source={source}
              step={step}
            />
          )
        );
      })}
    </>
  );
};

const OutfitIdeas = ({navigation}: HomeNavigationProps<'OutfitIdeas'>) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const outfits = useSelector(getOutfits);

  const aIndex = useSharedValue(currentIndex);

  useEffect(() => {
    aIndex.value = withTiming(currentIndex, {duration: 50});
  }, [currentIndex]);

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

        {outfits.length > 0 && (
          <OutfitCards
            outfits={outfits}
            currentIndex={currentIndex}
            aIndex={aIndex}
            step={step}
            setCurrentIndex={setCurrentIndex}
          />
        )}
      </Box>
    </Box>
  );
};

export default OutfitIdeas;
