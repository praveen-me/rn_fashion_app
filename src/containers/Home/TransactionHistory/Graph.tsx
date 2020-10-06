import React from 'react';
import {Dimensions, View} from 'react-native';
import {Box, Theme, useTheme} from '../../../contants/theme';
import makeStyles from '../../../lib/makeStyles';
import Underlay from './Underlay';

interface Point {
  date: number;
  value: number;
  color: string;
}

interface GraphProps {
  data: Point[];
}

const {width: wWidth} = Dimensions.get('screen');
const apspectRatio = 195 / 305;

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

const Graph = ({data}: GraphProps) => {
  const theme = useTheme();
  const canvasWidth = wWidth - theme.spacing.m * 2;
  const canvasHeight = canvasWidth * apspectRatio;
  const width = canvasWidth - theme.spacing.l;
  const height = canvasHeight - theme.spacing.l;

  const step = width / data.length;
  const values = data.map((d) => d.value);
  const dates = data.map((d) => d.date);
  const maxY = Math.max(...values);
  const minY = Math.min(...values);
  const minX = Math.min(...dates);

  const styles = useStyles();

  return (
    <Box paddingBottom="l" paddingLeft="l" marginTop="xl">
      <Underlay {...{dates, minX, minY, step}} />
      <Box width={width} height={height}>
        {data.map((point, index) => {
          if (point.value === 0) {
            return null;
          }

          return (
            <Box
              width={step}
              key={point.date}
              position="absolute"
              bottom={0}
              left={index * step}
              height={lerp(0, height, point.value / maxY)}>
              <View style={[styles.bar, {backgroundColor: point.color}]} />
              <View style={[styles.tip, {backgroundColor: point.color}]} />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default Graph;
