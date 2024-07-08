import React, {useMemo, useState} from 'react';
import {useDerivedValue, type SharedValue} from 'react-native-reanimated';

import Header from '../../../components/Header';
import {Box} from '../../../contants/theme';
import {HomeNavigationProps} from '../../../lib/navigation/rootNavigation';
import Background from './Background';
import Card from './Card';
import Categories from './Categories';
import {useSelector} from 'react-redux';
import {getOutfits} from '../../../redux/selectors/user.selectors';
import {useTiming} from 'react-native-redash';

interface OutfitCardsProps {
  currentIndex: number;
  aIndex: SharedValue<number>;
  step: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  index: number;
  source: string;
}

const OutfitCards: React.FC<OutfitCardsProps> = ({
  currentIndex,
  aIndex,
  step,
  setCurrentIndex,
  index,
  source,
}) => {
  const position = useDerivedValue(() => index * step - aIndex.value);

  return (
    currentIndex < index * step + step && (
      <Card
        position={position}
        onSwipe={() => setCurrentIndex(prev => prev + step)}
        source={source}
        step={step}
      />
    )
  );
};

const OutfitIdeas = ({navigation}: HomeNavigationProps<'OutfitIdeas'>) => {
  const outfits = useSelector(getOutfits);
  const [currentIndex, setCurrentIndex] = useState(0);

  const aIndex = useTiming(currentIndex);

  const mappedOutfits = useMemo(
    () =>
      outfits.reverse().map(({id, url: source}, index, items) => ({
        id,
        source,
        index: items.length - index - 1,
      })),
    [outfits],
  );

  const step = useMemo(() => 1 / (outfits.length - 1), [outfits]);

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

        {mappedOutfits.length > 0 &&
          mappedOutfits.map(({id, source, index}) => {
            return (
              <OutfitCards
                currentIndex={currentIndex}
                aIndex={aIndex}
                step={step}
                setCurrentIndex={setCurrentIndex}
                index={index}
                source={source}
                key={id}
              />
            );
          })}
      </Box>
    </Box>
  );
};

export default OutfitIdeas;
