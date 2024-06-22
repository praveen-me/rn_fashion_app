import React, {forwardRef, useEffect, useRef} from 'react';
import {Dimensions, Platform, ToastAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  GestureDetector,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';

import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';

import AppText from '../../../components/Text';
import makeStyles from '../../../lib/makeStyles';
import {Box, Theme, useTheme} from '../../../contants/theme';

import {DrawerNavigationHelpers} from '@react-navigation/drawer/lib/typescript/src/types';
import usePanGestureHandler from '../../../hooks/usePanGestureHandler';

const {width: wWidth} = Dimensions.get('screen');

interface BottomSaveButtonProps {
  navigation: DrawerNavigationHelpers;
  setShowBtn: (value: boolean) => void;
  onSave: () => void;
}

function BottomSaveButton(props: BottomSaveButtonProps, ref) {
  const isSwiped = useRef(false);
  const {gestureHandler, translation} = usePanGestureHandler({
    snapPoints: {min: 0, max: wWidth - 90},
    onSnap: ({translationX}) => {
      console.log({translationX});
      onSwiped();
      // setShowBtn(false);
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
    props.onSave();

    // if (Platform.OS === 'android') {
    //   ToastAndroid.showWithGravity(
    //     'Settings Saved',
    //     ToastAndroid.SHORT,
    //     ToastAndroid.TOP,
    //   );
    // }

    // navigation.navigate('OutfitIdeas');
  }

  const sliderAnimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{translateX: translation.value.x}],
    };
  });

  return (
    <GestureHandlerRootView style={{justifyContent: 'flex-end'}}>
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
                paddingHorizontal: 10,
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
