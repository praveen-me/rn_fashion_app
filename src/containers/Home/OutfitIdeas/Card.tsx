import React from 'react';
import {Dimensions, ImageRequireSource, StyleSheet} from 'react-native';
import {
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  type SharedValue,
} from 'react-native-reanimated';
import {mix, mixColor, useSpring} from 'react-native-redash';
import {Box} from '../../../contants/theme';

import usePanGestureHandler from '../../../hooks/usePanGestureHandler';

interface CardProps {
  position: SharedValue<number>;
  onSwipe: () => void;
  source: string;
  step: number;
}

const {width: wWidth} = Dimensions.get('screen');
const width = wWidth * 0.8;
const height = width * (425 / 294);
const borderRadius = 24;

const Card = ({position, onSwipe, source, step}: CardProps) => {
  const {gestureHandler, translation} = usePanGestureHandler({
    onEnd: onSwipe,
    // snapPoints: {min: -wWidth, max: wWidth},
    // onEnd: onSwipe,
  });

  const backgroundColor = useDerivedValue(
    () => mixColor(position.value, '#c9e9e7', '#74bcb8'),
    [position],
  );
  const translateYOffset = mix(position.value, position.value * 10, -60) + 100;

  const animatedStyles = useAnimatedStyle(
    () => ({
      transform: [
        {
          scale: withSpring(
            interpolate(
              position.value,
              [0, step],
              [1.2, 1],
              Extrapolation.CLAMP,
            ),
          ),
        },
      ],
    }),
    // [position],
  );

  const cardAnimatedStyles = useAnimatedStyle(
    () => ({
      transform: [
        {translateY: translateYOffset + translation.value.y},
        {translateX: translation.value.x},
        {scale: withSpring(mix(position.value, 1, 0.9))},
      ],
      backgroundColor: backgroundColor.value as string,
    }),
    // [translation, backgroundColor, position],
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
              source={{uri: source}}
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
