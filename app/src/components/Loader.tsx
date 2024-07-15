import React, {useEffect} from 'react';
import LottieView from 'lottie-react-native';
import {Box} from '../contants/theme';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated';
import Text from './Text';
import useTimer from '../hooks/useTimer';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {getLoaderConfig} from '../redux/selectors/misc.selectors';

const loaderSize = 300;

const AnimatedBox = Animated.createAnimatedComponent(Box);

interface ILoaderProps {
  showLocalLoader?: boolean;
}

export default function Loader(props: ILoaderProps) {
  const showAnimatedText = useSharedValue(0);
  const {state, message} = useSelector(getLoaderConfig);

  const {showLocalLoader} = props;
  const {timerExpired} = useTimer(2, {
    shouldStart: showLocalLoader || state,
  });

  useEffect(() => {
    if (timerExpired) {
      showAnimatedText.value = 1;
    }

    if (!state && !showLocalLoader) {
      showAnimatedText.value = 0;
    }
  }, [timerExpired, state]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: showAnimatedText.value
            ? withSpring(showAnimatedText.value ? 1.2 : 0, {duration: 300})
            : 0,
        },
      ],
    };
  }, [timerExpired]);

  if (!showLocalLoader && !state) return null;

  return (
    <Box
      flex={1}
      justifyContent="center"
      alignItems="center"
      backgroundColor="white"
      position="absolute"
      style={StyleSheet.absoluteFillObject}>
      <AnimatedBox
        position="relative"
        backgroundColor="white"
        entering={ZoomIn.springify().duration(600)}
        exiting={ZoomOut.springify()}>
        <LottieView
          source={require('../animations/loader.json')}
          autoPlay
          loop
          style={{height: loaderSize, width: loaderSize}}
        />
        <Box
          backgroundColor="white"
          position="absolute"
          height={loaderSize * 0.2}
          width={100}
          right={0}
          bottom={0}
        />
      </AnimatedBox>
      <AnimatedBox style={animatedStyle}>
        <Text variant="body" medium>
          {message || '🚀 Hang on! Awesome stuff coming! 🍲'}
        </Text>
      </AnimatedBox>
    </Box>
  );
}
