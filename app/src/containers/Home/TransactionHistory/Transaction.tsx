import React from 'react';
import makeStyles from '../../../lib/makeStyles';
import Button from '../../../components/Button';

import AppText from '../../../components/Text';
import {Box, Theme, useTheme} from '../../../contants/theme';
import {Point} from './Graph';

import moment from 'moment';

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
            style={[styles.infoContainer, {backgroundColor: transaction.color}]}
          />
          <AppText style={styles.id} medium>
            {'#'}
            {transaction.id}
          </AppText>
        </Box>
        <Box>
          <Box flexDirection="row">
            <AppText style={styles.text}>${transaction.value}</AppText>
            <AppText style={styles.text}>
              {' '}
              - {moment(transaction.date).format('DD MMMM, YYYY')}
            </AppText>
          </Box>
        </Box>
      </Box>
      <Box alignItems="flex-end" backgroundColor="danger">
        <Button onPress={() => {}} textBtn>
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
  infoContainer: {
    borderRadius: 5,
    marginRight: theme.spacing.m - 3,
  },
  id: {
    fontSize: 16,
    color: '#000',
  },
}));

export default Transaction;
