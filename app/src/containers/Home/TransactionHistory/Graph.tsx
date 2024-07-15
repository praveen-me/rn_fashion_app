import React, {useEffect} from 'react';
import {Dimensions, View} from 'react-native';
import {Box, Theme, useTheme} from '../../../contants/theme';
import makeStyles from '../../../lib/makeStyles';
import Underlay from './Underlay';
import moment from 'moment';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {useIsFocused} from '@react-navigation/native';

export interface Point {
  date: number;
  value: number;
  color: string;
  id: number;
}

interface GraphProps {
  data: Point[];
  numOfMonths: number;
  startDate: number;
}

const AnimatedBox = Animated.createAnimatedComponent(Box);

const {width: wWidth} = Dimensions.get('screen');
const apspectRatio = 195 / 305;

// Functionc for calculation linear interpolation
const lerp = (v0: number, v1: number, t: number) => {
  return (1 - t) * v0 + t * v1;
};

const useStyles = makeStyles((theme: Theme) => ({
  bar: {
    position: 'absolute',
    left: theme.spacing.m,
    right: theme.spacing.m,
    bottom: 0,
    top: 0,
    opacity: 0.1,
    borderTopLeftRadius: theme.spacing.m,
    borderTopRightRadius: theme.spacing.m,
  },
  tip: {
    position: 'absolute',
    left: theme.spacing.m,
    right: theme.spacing.m,
    top: 0,
    borderRadius: theme.spacing.m,
    zIndex: 1000,
    height: 32,
  },
}));

const Graph = ({data, startDate, numOfMonths}: GraphProps) => {
  const isFocused = useIsFocused();
  const transition = useSharedValue(0);
  const theme = useTheme();
  const canvasWidth = wWidth - theme.spacing.m * 2;
  const canvasHeight = canvasWidth * apspectRatio;
  const width = canvasWidth - theme.spacing.l;
  const height = canvasHeight - theme.spacing.l;

  const step = width / data.length;
  const values = data.map(d => d.value);
  const dates = data.map(d => d.date);
  const maxY = Math.max(...values);
  const minY = Math.min(...values);
  const styles = useStyles();

  useEffect(() => {
    transition.value = withTiming(isFocused ? 1 : 0, {duration: 300});
  }, [isFocused]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        // {translateY},
        {
          scaleY: transition.value,
        },
      ],
    };
  });

  return (
    <Box paddingLeft="l" marginTop="xl" marginBottom="xl">
      <Underlay
        {...{
          dates,
          minY,
          maxY,
          step,
          startDate,
          numOfMonths,
        }}
        lerp={lerp}
      />
      <View style={{width, height, overflow: 'hidden'}}>
        <Box width={width} height={height}>
          {data.map(point => {
            if (point.value === 0) {
              return null;
            }
            const i = Math.round(
              moment.duration(point.date - startDate).asMonths(),
            );

            const totalHeight = lerp(0, height, point.value / maxY);
            const currentHeight = useDerivedValue(
              () => totalHeight * transition.value,
            );
            const translateY = useDerivedValue(
              () => (totalHeight - currentHeight.value) / 2,
            );
            return (
              <AnimatedBox
                width={step}
                key={point.date}
                position="absolute"
                bottom={0}
                left={i * step}
                height={lerp(0, height, point.value / maxY)}
                style={[
                  {
                    transform: [{translateY}],
                  },
                  animatedStyles,
                ]}>
                <View style={[styles.bar, {backgroundColor: point.color}]} />
                <View style={[styles.tip, {backgroundColor: point.color}]} />
              </AnimatedBox>
            );
          })}
        </Box>
      </View>
    </Box>
  );
};

export default Graph;
