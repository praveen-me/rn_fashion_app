import React from 'react';
import {Dimensions, StyleSheet, type ColorValue} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated';
import {mixColor} from 'react-native-redash';

import usePanGestureHandler from '../../../hooks/usePanGestureHandler';

interface CardProps {
  position: SharedValue<number>;
  onSwipe: () => void;

  step: number;
  aIndex: SharedValue<number>;
  currentIndex: number;
  cardsLength: number;
  index: number;
  item: {
    id: string;
    source: string;
  };
}

const {width: wWidth} = Dimensions.get('screen');
const width = wWidth * 0.8;
const height = width * (425 / 294);
const borderRadius = 24;

const STACK_SPACE = 35;

const Card = ({
  position,
  onSwipe,
  step,
  aIndex,
  cardsLength,
  currentIndex,
  index,
  item,
}: CardProps) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const gesture = Gesture.Pan()
    .onUpdate(({translationX, translationY}) => {
      if (currentIndex === index) {
        translateX.value = translationX;
        translateY.value = translationY;

        aIndex.value = interpolate(
          Math.abs(translationX),
          [0, width],
          [index, index + 1],
        );
      }
    })
    .onEnd(({translationX, velocityX}) => {
      if (Math.abs(translationX) > 100 || Math.abs(velocityX) > 1000) {
        translateX.value = withTiming(
          translationX > 0 ? width + width / 2 : -width - width / 2,
        );

        runOnJS(onSwipe)(item);
      } else {
        translateX.value = withTiming(0);
        translateY.value = withTiming(0);
        aIndex.value = withTiming(currentIndex);
      }
    });

  const imageAnimatedStyles = useAnimatedStyle(() => ({
    transform: [
      {
        scale: interpolate(aIndex.value, [index - 1, index], [1, 1.2]),
      },
    ],
  }));

  const cardAnimatedStyles = useAnimatedStyle(() => {
    const mainTranslateY = interpolate(
      aIndex.value,
      [index - 1, index],
      [-STACK_SPACE, 0],
    );

    const scale = interpolate(aIndex.value, [index - 1, index], [0.9, 1]);
    const backgroundColor = mixColor(
      position.value,
      '#c9e9e7',
      '#74bcb8',
    ) as ColorValue;

    const zIndex = cardsLength - currentIndex + 1000;

    return {
      transform: [
        {translateY: mainTranslateY + translateY.value},
        {translateX: translateX.value},
        {scale},
      ],
      backgroundColor,
      zIndex,
    };
  }, []);

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View
        style={[
          {
            height,
            width,
            borderRadius,
            overflow: 'hidden',
            position: 'absolute',
            alignSelf: 'center',
          },
          cardAnimatedStyles,
        ]}>
        <Animated.Image
          source={{uri: item.source}}
          style={[
            {
              ...StyleSheet.absoluteFillObject,
              height: undefined,
              width: undefined,
            },
            imageAnimatedStyles,
          ]}
        />
      </Animated.View>
    </GestureDetector>
  );
};

export default Card;
