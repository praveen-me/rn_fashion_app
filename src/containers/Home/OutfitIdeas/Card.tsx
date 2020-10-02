import React from 'react';
import {Dimensions, ImageRequireSource, StyleSheet} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {add, Extrapolate, interpolate} from 'react-native-reanimated';
import {mix, mixColor, usePanGestureHandler} from 'react-native-redash';
import {Box} from '../../../contants/theme';
import {useSpring} from './Animations';

interface CardProps {
  position: Animated.Adaptable<number>;
  onSwipe: () => void;
  source: ImageRequireSource;
  step: number;
}

const {width: wWidth} = Dimensions.get('screen');
const width = wWidth * 0.8;
const height = width * (425 / 294);
const borderRadius = 24;
const Card = ({position, onSwipe, source, step}: CardProps) => {
  const {gestureHandler, translation, velocity, state} = usePanGestureHandler();

  const backgroundColor = mixColor(position, '#c9e9e7', '#74bcb8');
  const translateYOffset = mix(position, 0, -60);
  const scale = mix(position, 1, 0.9);
  const imageScale = interpolate(position, {
    inputRange: [0, step],
    outputRange: [1.2, 1],
    extrapolate: Extrapolate.CLAMP,
  });
  const translateX = useSpring({
    value: translation.x,
    velocity: velocity.x,
    state,
    snapPoints: [-wWidth, 0, wWidth],
    onSnap: ([x]) => x !== 0 && onSwipe(),
  });
  const translateY = add(
    translateYOffset,
    useSpring({
      value: translation.y,
      velocity: velocity.y,
      state,
      snapPoints: [0],
    }),
  );

  return (
    <Box
      style={StyleSheet.absoluteFill}
      justifyContent="center"
      alignItems="center">
      <PanGestureHandler {...gestureHandler}>
        <Animated.View
          style={{
            backgroundColor,
            height,
            width,
            borderRadius,
            transform: [{translateY, translateX}, {scale}],
            overflow: 'hidden',
          }}>
          <Animated.Image
            source={source}
            style={{
              ...StyleSheet.absoluteFillObject,
              height: undefined,
              width: undefined,
              transform: [{scale: imageScale}],
            }}
          />
        </Animated.View>
      </PanGestureHandler>
    </Box>
  );
};

export default Card;
