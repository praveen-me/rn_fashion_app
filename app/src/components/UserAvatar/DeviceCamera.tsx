import {
  StyleSheet,
  Modal,
  Dimensions,
  TouchableOpacity as RNTouchableOpacity,
} from 'react-native';
import React, {
  forwardRef,
  useCallback,
  useEffect,
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
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import * as ScreenOrientation from 'expo-screen-orientation';
import * as Haptics from 'expo-haptics';

const screenHeight = Dimensions.get('screen').height;

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(RNTouchableOpacity);

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
  const [isTakingPicture, setIsTakingPicture] = useState(false);

  useImperativeHandle(ref, () => ({
    openCamera: () => setShowModal(true),
  }));

  const [showModal, setShowModal] = useState(false);

  const device = useCameraDevice('front');
  const camera = useRef<Camera>(null);

  const scaleCamera = useSharedValue(1);

  const handleTakePhoto = useCallback(async () => {
    console.log('here');
    if (!camera.current) return;

    const currentCamera = camera.current;

    const takePhoto = async () => {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setIsTakingPicture(true);

      const data = await currentCamera.takePhoto();
      console.log({data});

      props.onTakePicture(data.path);

      setIsTakingPicture(false);
      setShowModal(false);
    };

    takePhoto();
  }, [props.onTakePicture, isTakingPicture]);

  useEffect(() => {
    ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
  }, []);

  const animatedTakePhotoStyles = useAnimatedStyle(() => {
    console.log({isTakingPicture});
    return {
      transform: [
        {
          scale: isTakingPicture
            ? withTiming(0.8, {duration: 200})
            : withTiming(1, {duration: 200}),
        },
      ],
    };
  }, [isTakingPicture]);

  if (!device) return null;

  return (
    <Modal visible={showModal} onRequestClose={() => setShowModal(false)}>
      <GestureHandlerRootView style={{flex: 1}}>
        <Box flex={1}>
          <Camera
            style={StyleSheet.absoluteFill}
            device={device}
            isActive={true}
            ref={camera}
            photo={true}
            outputOrientation="preview"
            isMirrored={false}
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
                onPress={handleTakePhoto}></AnimatedTouchableOpacity>
            </Box>
          </Box>
        </Box>
      </GestureHandlerRootView>
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
