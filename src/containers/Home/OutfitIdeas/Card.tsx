import React from 'react';
import {Dimensions, ImageRequireSource, StyleSheet} from 'react-native';
import {
  GestureDetector,
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';
import Animated, {
  add,
  Extrapolate,
  Extrapolation,
  interpolate,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';
import {mix, mixColor, useSpring} from 'react-native-redash';
import {Box} from '../../../contants/theme';
// import {useSpring} from './Animations';

import usePanGestureHandler from '../../../hooks/usePanGestureHandler';

interface CardProps {
  position: number;
  onSwipe: () => void;
  source: ImageRequireSource;
  step: number;
}

const {width: wWidth} = Dimensions.get('screen');
const width = wWidth * 0.8;
const height = width * (425 / 294);
const borderRadius = 24;

const Card = ({position, onSwipe, source, step}: CardProps) => {
  const {gestureHandler, translation, velocity, state} =
    usePanGestureHandler(onSwipe);

  const backgroundColor = useDerivedValue(
    () => mixColor(position, '#c9e9e7', '#74bcb8'),
    [position],
  );
  const translateYOffset = mix(position, position * 10, -60) + 100;

  const animatedStyles = useAnimatedStyle(
    () => ({
      transform: [
        {
          scale: withSpring(
            interpolate(position, [0, step], [1.2, 1], Extrapolation.CLAMP),
          ),
        },
      ],
    }),
    [position],
  );

  const cardAnimatedStyles = useAnimatedStyle(
    () => ({
      transform: [
        {translateY: translateYOffset + translation.value.y},
        {translateX: translation.value.x},
        {scale: withSpring(mix(position, 1, 0.9))},
      ],
      backgroundColor: backgroundColor.value as string,
    }),
    [translation, backgroundColor, position],
  );

  return (
    <Box
      style={StyleSheet.absoluteFill}
      justifyContent="center"
      alignItems="center">
      <GestureHandlerRootView style={{flex: 1}}>
        <GestureDetector gesture={gestureHandler}>
          <Animated.View
            style={[
              {
                // backgroundColor,
                height,
                width,
                borderRadius,

                overflow: 'hidden',
              },
              cardAnimatedStyles,
            ]}>
            <Animated.Image
              source={source}
              style={{
                ...StyleSheet.absoluteFillObject,
                height: undefined,
                width: undefined,
                transform: animatedStyles.transform,
              }}
            />
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
    </Box>
  );
};

export default Card;
