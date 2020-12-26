import React, {ReactNode, useState} from 'react';
import {Dimensions} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import Animated, {multiply} from 'react-native-reanimated';
import {mix, useTransition} from 'react-native-redash';
import makeStyles from '../../../lib/makeStyles';
import AppText from '../../../components/Text';
import {Box, Theme} from '../../../contants/theme';

interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  children: ReactNode[];
}

const {width} = Dimensions.get('window');

export default function Tabs({tabs, children}: TabsProps) {
  const [currentTab, setCurrentTab] = useState(0);
  const transition = useTransition(currentTab, {duration: 400});
  const translateX = mix(transition, width * 0.25 - 5, width * 0.75 - 5);

  const styles = useStyles();

  return (
    <Box flex={1}>
      <Box flexDirection="row" justifyContent="space-around">
        {tabs.map((tab, index) => (
          <RectButton style={{flex: 1}} onPress={() => setCurrentTab(index)}>
            <Box key={tab.id} padding="m">
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
        style={{
          width: width * tabs.length,
          flexDirection: 'row',
          transform: [{translateX: multiply(-width, transition)}],
        }}>
        {children.map((child, index) => (
          <Box flex={1} key={index} width={width}>
            {child}
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
