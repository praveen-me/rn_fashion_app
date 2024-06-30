import React, {useCallback, useEffect, useState} from 'react';
import {Modal, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import theme, {Box} from '../contants/theme';
import AppText from './Text';
import useBackHandler from '../hooks/useBackHandler';

const AnimatedBox = Animated.createAnimatedComponent(Box);

export default function UserAvatar() {
  const [showModal, setShowModal] = useState(false);

  const handleUploadImagePress = useCallback(() => {
    setShowModal(true);
  }, []);

  return (
    <>
      <Box
        height={100}
        width={100}
        backgroundColor={'danger'}
        style={{borderRadius: 100 / 2}}
        alignSelf="center"
        position="absolute"
        top={-50}
        zIndex={1000}>
        <Box
          position="absolute"
          bottom={5}
          right={-5}
          borderRadius="xl"
          style={{
            borderWidth: 2,
            borderColor: 'black',
            padding: 8,
          }}
          backgroundColor="white"
          justifyContent="center"
          alignItems="center">
          <TouchableOpacity hitSlop={20} onPress={handleUploadImagePress}>
            <Icon name="upload" size={15} color="black" />
          </TouchableOpacity>
        </Box>
      </Box>

      <RenderModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
}

interface IRenderModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
}

function RenderModal({showModal, setShowModal}: IRenderModalProps) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(0);

  useBackHandler(() => {
    console.log('back button pressed');
    setShowModal(false);
    return true;
  }, [showModal]);

  useEffect(() => {
    if (showModal) {
      opacity.value = withTiming(1, {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      });
      translateY.value = withTiming(0, {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      });
    }
  }, [showModal]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{translateY: translateY.value}],
    };
  });

  function handleModalClose() {
    translateY.value = withTiming(50, {
      duration: 300,
      easing: Easing.inOut(Easing.ease),
    });
    opacity.value = withTiming(
      0,
      {
        duration: 300,
        easing: Easing.inOut(Easing.ease),
      },
      () => {
        runOnJS(setShowModal)(false);
      },
    );
  }

  return (
    <Modal
      visible={showModal}
      transparent
      animationType="none"
      hardwareAccelerated
      onRequestClose={handleModalClose}>
      <AnimatedBox flex={1} style={animatedStyle}>
        <TouchableOpacity
          activeOpacity={1}
          style={theme.commonStyles.flex1}
          onPress={handleModalClose}>
          <AnimatedBox
            flex={1}
            backgroundColor="overlay"
            justifyContent={'center'}
            alignItems={'center'}>
            <Box
              flex={1}
              backgroundColor="white"
              width={200}
              position="absolute"
              borderRadius="m">
              <TouchableOpacity onPress={() => {}} style={styles.btnContainer}>
                <Box flexDirection="row" alignItems="center">
                  <Box marginRight="s">
                    <Icon name="camera" size={15} color="black" />
                  </Box>
                  <AppText>Upload from Camera</AppText>
                </Box>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {}}
                style={[styles.btnContainer, styles.btnContainerWithBorder]}>
                <Box flexDirection="row" alignItems="center">
                  <Box marginRight="s">
                    <Icon name="image" size={15} color="black" />
                  </Box>
                  <AppText>Upload from Gallery</AppText>
                </Box>
              </TouchableOpacity>
            </Box>
          </AnimatedBox>
        </TouchableOpacity>
      </AnimatedBox>
    </Modal>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
  },
  btnContainerWithBorder: {
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
  },
});
