import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import AppText from '../../../components/Text';
import {Box} from '../../../contants/theme';

interface UnderProps {
  minX: number;
  minY: number;
  dates: number[];
}

const formatter = Intl.DateTimeFormat('en', {month: 'short'});

const Underlay = ({dates, minX, minY}: UnderProps) => {
  return (
    <Box style={StyleSheet.absoluteFill}>
      <Box>
        {dates.map((date) => (
          <AppText key={date}>{formatter.format(date)}</AppText>
        ))}
      </Box>
    </Box>
  );
};

export default Underlay;
