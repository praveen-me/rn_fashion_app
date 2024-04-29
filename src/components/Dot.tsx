import React from 'react';
import {StyleSheet} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import colors from '../contants/colors';

interface DotProps {
  index: number;
  currentIndex: SharedValue<number>;
}

const Dot = ({index, currentIndex}: DotProps) => {
  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        currentIndex.value,
        [index - 1, index, index + 1],
        [0.5, 1, 0.5],
        Extrapolation.CLAMP,
      ),
      transform: [
        {
          scale: interpolate(
            currentIndex.value,
            [index - 1, index, index + 1],
            [1, 1.25, 1],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  });
  return <Animated.View style={[styles.dot, animatedStyles]} />;
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
