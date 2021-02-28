import React, {ReactNode, useState} from 'react';
import {Dimensions} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import Animated, {multiply} from 'react-native-reanimated';
import {mix, useTransition} from 'react-native-redash';
import makeStyles from '../../../lib/makeStyles';
import AppText from '../../../components/Text';
import {Box, Theme} from '../../../contants/theme';
import Configuration from './Configuration';
import PersonalInfo from './PersonalInfo';

interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  currentTab: number;
  setCurrentTab: (index: number) => void;
}

const {width} = Dimensions.get('window');

export default function Tabs({tabs, currentTab, setCurrentTab}: TabsProps) {
  const transition = useTransition(currentTab, {duration: 300});
  const translateX = mix(transition, width * 0.25 - 5, width * 0.75 - 5);

  const styles = useStyles();

  return (
    <Box flex={1}>
      <Box flexDirection="row" justifyContent="space-around">
        {tabs.map((tab, index) => (
          <RectButton
            style={{flex: 1}}
            onPress={() => setCurrentTab(index)}
            key={tab.label}>
            <Box padding="m">
              <AppText variant="body" bold center>
                {tab.label}
              </AppText>
            </Box>
          </RectButton>
        ))}
        <Animated.View
          style={[styles.currentTabDot, {transform: [{translateX}]}]}
        />
      </Box>
      <Animated.View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          width: width * tabs.length,
          flexDirection: 'row',
          transform: [{translateX: multiply(-width, transition)}],
          flex: 1,
        }}>
        {tabs.map((tab) => (
          <Box flex={1} key={tab.id} width={width}>
            {tab.id === 'configuration' ? <Configuration /> : <PersonalInfo />}
          </Box>
        ))}
      </Animated.View>
    </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  currentTabDot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    position: 'absolute',
    backgroundColor: theme.colors.primatyBtnBg,
    bottom: 0,
    left: 0,
  },
}));
