import React from 'react';
import {StyleSheet} from 'react-native';
import AppText from '../../../components/Text';
import theme, {Box} from '../../../contants/theme';

interface UnderProps {
  maxY: number;
  minY: number;
  dates: number[];
  step: number;
  lerp: (v0: number, v1: number, t: number) => number;
}

const ROW_HEIGHT = 18;

const formatter = Intl.DateTimeFormat('en', {month: 'short'});

const Underlay = ({dates, maxY, minY, step, lerp}: UnderProps) => {
  return (
    <Box style={StyleSheet.absoluteFill}>
      <Box flex={1} justifyContent="space-between">
        {[1, 0.66, 0.33, 0].map((value, index) => (
          <Box
            flexDirection="row"
            alignItems="center"
            key={value}
            height={ROW_HEIGHT}
            style={{
              top:
                index === 0
                  ? -ROW_HEIGHT / 2
                  : index === 3
                  ? ROW_HEIGHT / 2
                  : 0,
            }}>
            <Box width={theme.spacing.xl} alignItems="center">
              <AppText>{Math.round(lerp(minY, maxY, value))}</AppText>
            </Box>
            <Box flex={1} height={1} backgroundColor="darkGrey" />
          </Box>
        ))}
      </Box>
      <Box
        flex={1}
        flexDirection="row"
        position="absolute"
        bottom={-18}
        paddingLeft="l">
        {dates.map((date, index) => (
          <Box
            width={step}
            style={{top: ROW_HEIGHT}}
            // backgroundColor={index % 2 === 0 ? 'danger' : 'lightBlue'}
          >
            <AppText center variant="body">
              {formatter.format(date)}
            </AppText>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Underlay;
