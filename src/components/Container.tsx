import React, {ReactNode} from 'react';
import {StyleSheet, Dimensions, Image, StatusBar, Platform} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Box, useTheme} from '../contants/theme';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

interface ContainerProps {
  children: ReactNode;
  footer: ReactNode;
}

const {width, height: screenHeight} = Dimensions.get('screen');

const aspectRatio = 750 / 1125;
const height = width * aspectRatio;

const assets = [require('./../assets/images/patterns/1.jpeg')];

const Container = ({children, footer}: ContainerProps) => {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  const statusBarHeight =
    Platform.OS === 'android' ? StatusBar.currentHeight || 0 : 0;

  return (
    <KeyboardAwareScrollView enableOnAndroid scrollEnabled={false}>
      <Box
        height={screenHeight - statusBarHeight}
        backgroundColor={'textPrimaryColor'}>
        <StatusBar barStyle="light-content" />
        <Box backgroundColor="white">
          <Box
            borderBottomLeftRadius="xl"
            overflow="hidden"
            height={height * 0.61}>
            <Image
              source={assets[0]}
              style={{
                height,
                width,
                borderBottomLeftRadius: theme.borderRadii.xl,
              }}
            />
          </Box>
        </Box>
        <Box flex={1} overflow="hidden">
          <Image
            source={assets[0]}
            style={{
              height,
              width,
              ...StyleSheet.absoluteFillObject,
              top: -height * 0.61,
            }}
          />
          <Box
            flex={1}
            backgroundColor="white"
            borderRadius="xl"
            borderTopLeftRadius={0}
            overflow="hidden">
            {children}
          </Box>
        </Box>
        <Box backgroundColor="textPrimaryColor" paddingBottom="l">
          {footer}
          <Box height={insets.bottom} />
        </Box>
      </Box>
    </KeyboardAwareScrollView>
  );
};

export default Container;
