import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Header from '../../../components/Header';
import AppText from '../../../components/Text';
import {Box, Theme, useTheme} from '../../../contants/theme';
import makeStyles from '../../../lib/makeStyles';
import {HomeNavigationProps} from '../../../lib/navigation/rootNavigation';
import Graph from './Graph';

const useStyles = makeStyles((theme: Theme) => {
  return {
    amount: {
      lineHeight: 38,
    },
    allTime: {
      backgroundColor: theme.colors.primaryLight,
      padding: theme.spacing.s * 0.8,
      borderRadius: theme.borderRadii.m * 2,
    },
    head: {
      color: theme.colors.darkGrey,
      fontSize: 14,
    },
  };
});

const graphData = [
  {
    date: new Date('2019-09-01').getTime(),
    value: 0,
    color: '#2CB9B0',
  },
  {
    date: new Date('2019-10-01').getTime(),
    value: 0,
    color: '#a09c00',
  },
  {
    date: new Date('2019-11-01').getTime(),
    value: 139.42,
    color: '#FF0058',
  },
  {
    date: new Date('2019-12-01').getTime(),
    value: 281.43,
    color: '#0C0D34',
  },
  {
    date: new Date('2020-01-01').getTime(),
    value: 0,
    color: '#FF0058',
  },
  {
    date: new Date('2020-02-01').getTime(),
    value: 198.54,
    color: '#a09c00',
  },
  {
    date: new Date('2020-03-01').getTime(),
    value: 0,
    color: '#2CB9B0',
  },
];

const TransactionHistory = ({
  navigation,
}: HomeNavigationProps<'TransactionHistory'>) => {
  const theme = useTheme();
  const styles = useStyles();

  return (
    <Box flex={1}>
      <Header
        title="Transaction History"
        left={{
          icon: 'menu',
          onPress: () => {
            navigation.openDrawer();
          },
          iconColor: '#fafafa',
        }}
        right={{
          icon: 'share',
          onPress: () => {},
        }}
      />
      <Box margin="m">
        <Box
          justifyContent="space-between"
          alignItems="flex-end"
          flexDirection="row">
          <Box>
            <AppText style={styles.head}>TOTAL SPENT</AppText>
            <AppText style={styles.amount} variant="title1" bold>
              $619,19
            </AppText>
          </Box>
          <TouchableOpacity style={styles.allTime}>
            <AppText style={{color: theme.colors.primatyBtnBg}}>
              All Time
            </AppText>
          </TouchableOpacity>
        </Box>
        <Graph data={graphData} />
      </Box>
    </Box>
  );
};

export default TransactionHistory;
