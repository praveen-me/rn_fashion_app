import React from 'react';
import App from '../../../../App';

import AppText from '../../../components/Text';
import theme, {Box} from '../../../contants/theme';
import {Point} from './Graph';

interface TransactionProps {
  transaction: Point;
}

const Transaction = ({transaction}: TransactionProps) => {
  return (
    <Box flex={1} marginTop="l">
      <Box flexDirection="row" alignItems="center">
        <Box
          height={10}
          width={10}
          style={{
            borderRadius: 5,
            backgroundColor: transaction.color,
            marginRight: theme.spacing.m - 3,
          }}
        />
        <AppText style={{fontSize: 16, color: '#000'}} medium>
          {'#'}
          {transaction.id}
        </AppText>
      </Box>
      <Box>
        <Box flexDirection="row">
          <AppText style={{fontSize: 14}}>${transaction.value}</AppText>
          <AppText style={{fontSize: 14}}>
            {' '}
            - {new Date(transaction.date).toDateString().slice(4)}
          </AppText>
        </Box>
      </Box>
    </Box>
  );
};

export default Transaction;
