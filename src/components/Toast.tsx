// Toast.tsx
import React, {useEffect, useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  withSpring,
  runOnJS,
  useDerivedValue,
  interpolate,
} from 'react-native-reanimated';

import Text from './Text';
import theme from '../contants/theme';

type ToastPosition = 'top' | 'bottom';

type ToastType = 'danger' | 'success';

type ToastProps = {
  message: string;
  position: ToastPosition;
  type: ToastType;
};

let showToast: (
  message: string,
  position: ToastPosition,
  type: ToastType,
) => void;

const Toast: React.FC<ToastProps> = ({message, position, type}) => {
  const [visible, setVisible] = useState(false);
  const translateY = useSharedValue(position === 'bottom' ? 100 : 0);
  const [config, setConfig] = useState({
    message: message,
    position: position,
    type: type,
  });
  const animatedOpacity = useSharedValue(0);

  console.log({visible});

  useEffect(() => {
    let timer: null | NodeJS.Timeout = null;
    if (visible) {
      animatedOpacity.value = withTiming(1, {
        duration: 300,
        easing: Easing.bezier(0.33, 0.01, 0, 1),
      });

      const hideToaster = () => {
        timer = setTimeout(() => {
          translateY.value = withSpring(
            position === 'bottom' ? 100 : 0,
            {
              damping: 10,
              stiffness: 100,
            },
            () => {
              runOnJS(setVisible)(false);
            },
          );

          animatedOpacity.value = withTiming(0, {
            duration: 300,
            easing: Easing.bezier(0.33, 0.01, 0, 1),
          });
        }, 1000);
      };

      translateY.value = withSpring(
        80,
        {
          damping: 10,
          stiffness: 100,
        },
        () => {
          runOnJS(hideToaster)();
        },
      );

      return () => {
        if (timer) {
          clearTimeout(timer);
        }
      };
    }
  }, [visible]);

  const animatedOpacityValue = useDerivedValue(() => animatedOpacity.value);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateY: translateY.value}],
      position: 'absolute',
      left: 0,
      right: 0,
      alignItems: 'center',
      opacity: interpolate(animatedOpacityValue.value, [0, 1], [0, 1]),
    };
  }, [config]);

  // Static method to show the toast
  showToast = (message: string, position: ToastPosition, type: ToastType) => {
    setConfig({
      message,
      position,
      type,
    });
    setVisible(true);
  };

  const toastStyles = useMemo(
    () => ({
      color:
        config.type === 'danger'
          ? theme.colors.danger
          : theme.colors.primatyBtnBg,
    }),
    [config.type],
  );

  if (!visible) return null;

  return (
    <Animated.View
      style={[styles.toastContainer, animatedStyle, {[config.position]: 20}]}>
      <View style={[styles.toast, {backgroundColor: theme.colors.white}]}>
        <Text style={[styles.toastText, toastStyles]} medium>
          {config.message}
        </Text>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toastContainer: {
    zIndex: 1000,
  },
  toast: {
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  toastText: {
    color: '#fff',
    marginRight: 10,
  },
});

export const toast = {
  display: (message: string, position: ToastPosition, type: ToastType) => {
    showToast(message, position, type);
  },
};

export default Toast;
