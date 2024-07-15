import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import {Box, useTheme} from '../../../contants/theme';
// import {useShare} from 'react-native-redash';
// import {useAnimatedGestureHandler} from 'react-native-reanimated'

const {width} = Dimensions.get('window');

const height = (682 * width) / 375;

export default function Cart() {
  const theme = useTheme();
  // const translateY = useAn
  // const onGestureEvent = useAnimatedGestureHandler({

  // });

  return (
    <Box flex={1} backgroundColor="textPrimaryColor">
      <PanGestureHandler onGestureEvent={(k) => {}}>
        <Animated.View
          style={{
            ...StyleSheet.absoluteFill,
            backgroundColor: 'white',
            top: 0,
            left: 0,
            right: 0,
            height,
            borderBottomLeftRadius: theme.borderRadii.xl,
            borderBottomRightRadius: theme.borderRadii.xl,
          }}
        />
      </PanGestureHandler>
    </Box>
  );
}
