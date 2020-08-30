import React from 'react';
import {StyleSheet} from 'react-native';
import Animated, {Extrapolate, interpolate} from 'react-native-reanimated';
import colors from '../contants/colors';

interface DotProps {
  index: number;
  currentIndex: Animated.Node<number>;
}

const Dot = ({index, currentIndex}: DotProps) => {
  const opacity = interpolate(currentIndex, {
    inputRange: [index - 1, index, index + 1],
    outputRange: [0.5, 1, 0.5],
    extrapolate: Extrapolate.CLAMP,
  });

  const scale = interpolate(currentIndex, {
    inputRange: [index - 1, index, index + 1],
    outputRange: [1, 1.25, 1],
    extrapolate: Extrapolate.CLAMP,
  });

  return (
    <Animated.View
      style={[
        styles.dot,
        {
          opacity,
          transform: [{scale}],
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  dot: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: colors.primatyBtnBg,
    margin: 4,
  },
});

export default Dot;
