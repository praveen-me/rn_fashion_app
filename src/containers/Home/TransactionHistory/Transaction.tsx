import React from 'react';
import makeStyles from '../../../lib/makeStyles';
import Button from '../../../components/Button';

import AppText from '../../../components/Text';
import {Box, Theme, useTheme} from '../../../contants/theme';
import {Point} from './Graph';

interface TransactionProps {
  transaction: Point;
}

const Transaction = ({transaction}: TransactionProps) => {
  const theme = useTheme();
  const styles = useStyles();
  return (
    <Box
      flex={1}
      marginTop="l"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center">
      <Box>
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
            <AppText style={styles.text}>${transaction.value}</AppText>
            <AppText style={styles.text}>
              {' '}
              - {new Date(transaction.date).toDateString().slice(4)}
            </AppText>
          </Box>
        </Box>
      </Box>
      <Box alignItems="flex-end" backgroundColor="danger">
        <Button
          onPress={() => {
            console.log('hello');
          }}
          textBtn>
          See More
        </Button>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  text: {
    fontSize: 14,
    color: theme.colors.darkGrey,
  },
}));

export default Transaction;
