import React, {useRef} from 'react';
import {StatusBar, Dimensions} from 'react-native';
import {Box, Theme, useTheme} from '../../../contants/theme';
import Header from '../../../components/Header';
import {DrawerActions} from '@react-navigation/native';
import {HomeNavigationProps} from 'src/lib/navigation/rootNavigation';
import AppText from '../../../components/Text';
import Tabs from './Tabs';
import Configuration from './Configuration';
import PersonalInfo from './PersonalInfo';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {PanGestureHandler} from 'react-native-gesture-handler';
import {usePanGestureHandler} from 'react-native-redash';
import Animated, {Extrapolate, interpolate} from 'react-native-reanimated';
import {useSpring} from '../OutfitIdeas/Animations';
import makeStyles from '../../../lib/makeStyles';

const {width: wWidth} = Dimensions.get('screen');

const tabs = [
  {
    id: 'configuration',
    label: 'Configuration',
  },
  {
    id: 'info',
    label: 'Personal Info',
  },
];

export default function EditProfile({
  navigation,
}: HomeNavigationProps<'EditProfile'>) {
  const theme = useTheme();
  const isSwiped = useRef(false);
  const styles = useStyles();

  const {gestureHandler, translation, velocity, state} = usePanGestureHandler();

  const translateX = useSpring({
    value: translation.x,
    velocity: velocity.x,
    state,
    snapPoints: [0, wWidth - 90],
    onSnap: ([x]) => {
      if (x === wWidth - 90) {
        onSwiped();
      }
    },
  });

  const opacity = interpolate(translation.x, {
    inputRange: [0, wWidth - 100],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  function onSwiped() {
    if (!isSwiped.current) {
      isSwiped.current = true;

      console.log('swiped');
    }
  }

  return (
    <Box backgroundColor="white" flex={1}>
      <StatusBar barStyle="light-content" />
      <Box flex={1}>
        <Box flex={0.2} backgroundColor="white">
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            borderBottomRightRadius="xl"
            backgroundColor="textPrimaryColor">
            <Header
              left={{
                icon: 'menu',
                onPress: () => {
                  navigation.dispatch(DrawerActions.openDrawer());
                },
              }}
              right={{icon: 'shopping-bag', onPress: () => {}}}
              title="My Profile"
              dark
            />
          </Box>
        </Box>
        <Box flex={0.8}>
          <Box flex={1} backgroundColor="textPrimaryColor" />
          <Box flex={1} backgroundColor="transparent" />
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            borderTopLeftRadius="xl"
            backgroundColor="white"
            paddingTop="xl">
            <Box
              height={100}
              width={100}
              backgroundColor={'danger'}
              style={{borderRadius: 100 / 2}}
              alignSelf="center"
              position="absolute"
              top={-50}
              zIndex={1000}
            />
            <Box marginTop="m">
              <AppText
                variant="title1"
                center
                bold
                style={{
                  color: theme.colors.textPrimaryColor,
                }}>
                Mike Peter
              </AppText>
              <AppText center>mike@email.com</AppText>
            </Box>
            <Tabs tabs={tabs}>{[<Configuration />, <PersonalInfo />]}</Tabs>
          </Box>
        </Box>
      </Box>
      <PanGestureHandler {...gestureHandler}>
        <Animated.View style={styles.sliderBtnContainer}>
          <Animated.View
            style={[styles.sliderBtn, {transform: [{translateX}]}]}>
            <Icon
              name="grip-vertical"
              size={20}
              color={theme.colors.primatyBtnBg}
            />
          </Animated.View>
          <Animated.View style={{flex: 1, opacity}}>
            <AppText style={{color: 'white'}} center>
              Swipe to save changes
            </AppText>
          </Animated.View>
        </Animated.View>
      </PanGestureHandler>
    </Box>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  sliderBtnContainer: {
    backgroundColor: theme.colors.primatyBtnBg,
    margin: 15,
    padding: 15,
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  sliderBtn: {
    height: 40,
    width: 40,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    zIndex: 100,
    marginLeft: 10,
    elevation: 5,
  },
}));
