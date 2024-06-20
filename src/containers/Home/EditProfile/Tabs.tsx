import React from 'react';
import {Dimensions} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import {mix, useTiming} from 'react-native-redash';
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
  const transition = useTiming(currentTab, {duration: 300});

  const translateX = useDerivedValue(
    () => mix(transition.value, width * 0.25 - 5, width * 0.75 - 5),
    [],
  );

  const styles = useStyles();

  const styleForAnimatedView = useAnimatedStyle(() => {
    return {
      transform: [{translateX: -width * transition.value}],
      width: width * tabs.length,
      flexDirection: 'row',
      flex: 1,
    };
  });

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
        style={styleForAnimatedView}>
        {tabs.map(tab => (
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
