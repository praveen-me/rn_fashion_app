import React from 'react';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Header from '../../../components/Header';
import AppText from '../../../components/Text';
import {Box, Theme, useTheme} from '../../../contants/theme';
import makeStyles from '../../../lib/makeStyles';
import {HomeNavigationProps} from '../../../lib/navigation/rootNavigation';
import Graph from './Graph';
import Transaction from './Transaction';

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

const numOfMonths = 8;
const startDate = new Date('2019-09-01').getTime();

const graphData = [
  {
    date: new Date('2019-09-01').getTime(),
    value: 86,
    color: '#2CB9B0',
    id: 24576,
  },
  {
    date: new Date('2019-11-01').getTime(),
    value: 0,
    color: '#FF0058',
    id: 24578,
  },
  {
    date: new Date('2019-12-01').getTime(),
    value: 139.42,
    color: '#0C0D34',
    id: 24579,
  },
  {
    date: new Date('2020-01-01').getTime(),
    value: 297.98,
    color: '#FF0058',
    id: 24580,
  },
  {
    date: new Date('2020-02-01').getTime(),
    value: 198.54,
    color: '#a09c00',
    id: 24581,
  },
  {
    date: new Date('2020-03-01').getTime(),
    value: 0,
    color: '#2CB9B0',
    id: 24582,
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
      <Box margin="l">
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
        <Graph
          data={graphData}
          numOfMonths={numOfMonths}
          startDate={startDate}
        />

        <ScrollView>
          {graphData
            .filter((d) => d.value > 0)
            .map((data) => (
              <Transaction transaction={data} key={data.id} />
            ))}
        </ScrollView>
      </Box>
    </Box>
  );
};

export default TransactionHistory;
