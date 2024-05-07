import React, {forwardRef, useEffect, useRef} from 'react';
import {Dimensions, Platform, ToastAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  GestureDetector,
  GestureHandlerRootView,
  PanGestureHandler,
} from 'react-native-gesture-handler';

import Animated, {
  Extrapolate,
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {useSpring} from '../OutfitIdeas/Animations';
import AppText from '../../../components/Text';
import makeStyles from '../../../lib/makeStyles';
import {Box, Theme, useTheme} from '../../../contants/theme';
// import {usePanGestureHandler} from 'react-native-redash';
import {DrawerNavigationHelpers} from '@react-navigation/drawer/lib/typescript/src/types';
import usePanGestureHandler from '../../../hooks/usePanGestureHandler';

const {width: wWidth} = Dimensions.get('screen');

interface BottomSaveButtonProps {
  navigation: DrawerNavigationHelpers;
  setShowBtn: (value: boolean) => void;
}

function BottomSaveButton(props: BottomSaveButtonProps, ref) {
  const isSwiped = useRef(false);
  const {gestureHandler, translation} = usePanGestureHandler({
    snapPoints: {min: 0, max: wWidth - 90},
    onSnap: ({translationX, x}) => {
      onSwiped();
      setShowBtn(false);
    },
    onEnd: () => {
      // Add any additional logic for onEnd event
    },
  });
  const styles = useStyles();

  const theme = useTheme();

  const {navigation, setShowBtn} = props;

  useEffect(() => {
    return () => {
      isSwiped.current = true;
    };
  }, []);

  const opacityStyles = useAnimatedStyle(() => ({
    opacity: interpolate(
      translation.value.x,
      [0, wWidth - 100],
      [1, 0],
      Extrapolation.CLAMP,
    ),
  }));

  function onSwiped() {
    if (!isSwiped.current) {
      isSwiped.current = true;

      if (Platform.OS === 'android') {
        ToastAndroid.showWithGravity(
          'Settings Saved',
          ToastAndroid.SHORT,
          ToastAndroid.TOP,
        );
      }

      navigation.navigate('OutfitIdeas');
    }
  }

  const sliderAnimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translation.value.x}],
    };
  });

  return (
    <Box style={{minHeight: 80}}>
      <GestureHandlerRootView>
        <GestureDetector gesture={gestureHandler}>
          <Animated.View style={styles.sliderBtnContainer}>
            <Animated.View style={[styles.sliderBtn, sliderAnimatedStyles]}>
              <Icon
                name="grip-vertical"
                size={20}
                color={theme.colors.primatyBtnBg}
              />
            </Animated.View>
            <Animated.View
              style={[
                {
                  flex: 1,
                },
                opacityStyles,
              ]}>
              <AppText style={{color: 'white'}} center>
                Swipe to save changes
              </AppText>
            </Animated.View>
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
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

export default forwardRef(BottomSaveButton);
