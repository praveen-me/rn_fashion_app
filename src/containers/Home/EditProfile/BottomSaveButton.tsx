import React, {forwardRef, useEffect, useRef} from 'react';
import {Dimensions, ToastAndroid} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {PanGestureHandler} from 'react-native-gesture-handler';

import Animated, {Extrapolate, interpolate} from 'react-native-reanimated';
import {useSpring} from '../OutfitIdeas/Animations';
import AppText from '../../../components/Text';
import makeStyles from '../../../lib/makeStyles';
import {Theme, useTheme} from '../../../contants/theme';
import {usePanGestureHandler} from 'react-native-redash';
import {DrawerNavigationHelpers} from '@react-navigation/drawer/lib/typescript/src/types';

const {width: wWidth} = Dimensions.get('screen');

interface BottomSaveButtonProps {
  navigation: DrawerNavigationHelpers;
  setShowBtn: (value: boolean) => void;
}

function BottomSaveButton(props: BottomSaveButtonProps, ref) {
  const isSwiped = useRef(false);
  const {gestureHandler, translation, velocity, state} = usePanGestureHandler();
  const styles = useStyles();

  const theme = useTheme();

  const {navigation, setShowBtn} = props;

  useEffect(() => {
    return () => {
      isSwiped.current = true;
    };
  }, []);

  let translateX = useSpring({
    value: translation.x,
    velocity: velocity.x,
    state,
    snapPoints: [0, wWidth - 90],
    onSnap: ([x]) => {
      if (x === wWidth - 90) {
        onSwiped();
        setShowBtn(false);
      }
    },
  });

  const opacity = interpolate(translateX, {
    inputRange: [0, wWidth - 100],
    outputRange: [1, 0],
    extrapolate: Extrapolate.CLAMP,
  });

  function onSwiped() {
    if (!isSwiped.current) {
      isSwiped.current = true;

      ToastAndroid.showWithGravity(
        'Settings Saved',
        ToastAndroid.SHORT,
        ToastAndroid.TOP,
      );

      navigation.navigate('OutfitIdeas');
    }
  }

  return (
    <PanGestureHandler {...gestureHandler}>
      <Animated.View style={styles.sliderBtnContainer}>
        <Animated.View style={[styles.sliderBtn, {transform: [{translateX}]}]}>
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
