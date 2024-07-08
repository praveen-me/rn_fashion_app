import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  useDerivedValue,
  useSharedValue,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import Header from '../../../components/Header';
import {Box} from '../../../contants/theme';
import {HomeNavigationProps} from '../../../lib/navigation/rootNavigation';
import Background from './Background';
import Card from './Card';
import Categories from './Categories';
import {useSelector} from 'react-redux';
import {getOutfits} from '../../../redux/selectors/user.selectors';

interface OutfitCardsProps {
  currentIndex: number;
  aIndex: SharedValue<number>;
  step: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  index: number;
  source: string;
  cardsLength: number;
  onSwipe: () => void;
  item: {
    id: string;
    source: string;
  };
}

const OutfitCards: React.FC<OutfitCardsProps> = ({
  currentIndex,
  step,
  index,

  aIndex,
  cardsLength,
  onSwipe,
  item,
}) => {
  const position = useDerivedValue(
    () => index * step - aIndex.value * step + step,
  );

  return (
    <GestureHandlerRootView
      style={{
        backgroundColor: 'red',
      }}>
      <Card
        currentIndex={currentIndex}
        onSwipe={onSwipe}
        step={step}
        aIndex={aIndex}
        cardsLength={cardsLength}
        index={index}
        position={position}
        item={item}
      />
    </GestureHandlerRootView>
  );
};

const OutfitIdeas = ({navigation}: HomeNavigationProps<'OutfitIdeas'>) => {
  const outfitsFromStore = useSelector(getOutfits);

  const [outfits, setOutfits] = useState(outfitsFromStore);

  const [currentIndex, setCurrentIndex] = useState(0);

  const aIndex = useSharedValue(0);

  const mappedOutfits = useMemo(
    () =>
      outfits.map(({id, url: source}, index, items) => ({
        id,
        source,
        index: items.length - index - 1,
      })),
    [outfits],
  );

  useEffect(() => {
    setOutfits(outfitsFromStore);
  }, [outfitsFromStore]);

  const step = useMemo(() => 1 / (outfits.length - 1), [outfits]);

  const handleSwiped = useCallback(
    (item: {id: string; url: string}) => {
      console.log({item});
      aIndex.value = withTiming(currentIndex + 1);

      setCurrentIndex(prev => prev + 1);

      // TODO: Uncomment this line to work on infinite cards
      // setOutfits([item, ...outfits]);
    },
    [currentIndex, outfits],
  );

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
      <Box flex={1} style={{marginTop: 100}}>
        <Background />

        {mappedOutfits.length > 0 &&
          mappedOutfits.map(({id, source, index}) => {
            return (
              <OutfitCards
                currentIndex={currentIndex}
                aIndex={aIndex}
                step={step}
                setCurrentIndex={setCurrentIndex}
                index={index}
                key={index}
                cardsLength={mappedOutfits.length}
                onSwipe={handleSwiped}
                item={{id, source}}
              />
            );
          })}
      </Box>
    </Box>
  );
};

export default OutfitIdeas;
