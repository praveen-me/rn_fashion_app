import React from 'react';
import {StyleSheet} from 'react-native';
import AppText from '../../../components/Text';
import theme, {Box} from '../../../contants/theme';

interface UnderProps {
  minX: number;
  minY: number;
  dates: number[];
  step: number;
}

const formatter = Intl.DateTimeFormat('en', {month: 'short'});

const Underlay = ({dates, minX, minY, step}: UnderProps) => {
  return (
    <Box style={StyleSheet.absoluteFill}>
      <Box flex={1} />
      <Box
        marginLeft="l"
        height={theme.spacing.l}
        flexDirection="row"
        justifyContent="space-between">
        {dates.map((date, index) => (
          <Box width={step}>
            <AppText center key={index}>
              {formatter.format(date)}
            </AppText>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Underlay;
