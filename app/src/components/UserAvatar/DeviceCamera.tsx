import {StyleSheet, Modal, Dimensions, TouchableOpacity} from 'react-native';
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import {Camera, useCameraDevice} from 'react-native-vision-camera';
import {Box} from '../../contants/theme';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const screenHeight = Dimensions.get('screen').height;

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

interface IDeviceCameraProps {
  onTakePicture: (userAvatar: string) => void;
}

export interface IDeviceCameraRef {
  openCamera: () => void;
}

export default forwardRef(function DeviceCamera(
  props: IDeviceCameraProps,
  ref: React.Ref<IDeviceCameraRef>,
) {
  useImperativeHandle(ref, () => ({
    openCamera: () => setShowModal(true),
  }));

  const [showModal, setShowModal] = useState(false);

  const device = useCameraDevice('front');
  const camera = useRef<Camera>(null);

  const scaleCamera = useSharedValue(1);

  const takePicture = useCallback(async () => {
    if (!camera.current) return;

    const currentCamera = camera.current;

    const takePhoto = async () => {
      const data = await currentCamera.takePhoto();

      const sendPhoto = () => {
        setShowModal(false);
        props.onTakePicture(data.path);
      };

      scaleCamera.value = withTiming(1, {duration: 200}, () => {
        runOnJS(sendPhoto)();
      });
    };

    scaleCamera.value = withTiming(0.8, {duration: 200}, () => {
      runOnJS(takePhoto)();
    });
  }, []);

  const animatedTakePhotoStyles = useAnimatedStyle(() => {
    return {
      transform: [{scale: scaleCamera.value}],
    };
  }, []);

  if (!device) return null;

  return (
    <Modal visible={showModal}>
      <Box flex={1}>
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          ref={camera}
          photo={true}
        />
        <Box
          height={screenHeight * 0.15}
          width={'100%'}
          backgroundColor={'overlay'}
          position="absolute"
          bottom={0}
          alignItems="center"
          flexDirection="row"
          justifyContent="center">
          <Box height={60} width={60} style={styles.takePicBtnWrapper}>
            <AnimatedTouchableOpacity
              style={[styles.takePicBtn, animatedTakePhotoStyles]}
              activeOpacity={1}
              onPress={takePicture}></AnimatedTouchableOpacity>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
});

const styles = StyleSheet.create({
  takePicBtnWrapper: {
    borderRadius: 30,
    padding: 2,
    borderWidth: 3,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  takePicBtn: {
    borderRadius: 25,
    backgroundColor: 'white',
    height: 50,
    width: 50,
  },
});
