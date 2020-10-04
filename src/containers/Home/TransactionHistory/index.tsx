import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Header from '../../../components/Header';
import AppText from '../../../components/Text';
import {Box, Theme, useTheme} from '../../../contants/theme';
import makeStyles from '../../../lib/makeStyles';

const useStyles = makeStyles((theme: Theme) => {
  return {
    amount: {
      color: theme.colors.textPrimaryColor,
      fontSize: 30,
      lineHeight: 38,
    },
    allTime: {
      backgroundColor: '#2cb9b026',
      padding: theme.spacing.s * 0.8,
      borderRadius: theme.borderRadii.m,
    },
    head: {
      color: theme.colors.darkGrey,
      fontSize: 14,
    },
  };
});

const TransactionHistory = (props) => {
  const theme = useTheme();
  const styles = useStyles();

  return (
    <Box flex={1}>
      <Header
        title="Transaction History"
        left={{
          icon: 'menu',
          onPress: () => {
            // navigation.openDrawer();
          },
          iconColor: '#fafafa',
        }}
        right={{
          icon: 'share',
          onPress: () => {},
        }}
      />
      <Box
        flexDirection="row"
        margin="m"
        justifyContent="space-between"
        alignItems="flex-end">
        <Box>
          <AppText style={styles.head}>TOTAL SPENT</AppText>
          <AppText style={styles.amount} bold>
            $619,19
          </AppText>
        </Box>
        <TouchableOpacity style={styles.allTime}>
          <AppText style={{color: theme.colors.primatyBtnBg}}>All Time</AppText>
        </TouchableOpacity>
      </Box>
    </Box>
  );
};

export default TransactionHistory;
