import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Dimensions, Modal, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import Animated, {
  Easing,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {launchImageLibrary} from 'react-native-image-picker';
import {CropView} from 'react-native-image-crop-tools';
import {Image} from 'expo-image';

import theme, {Box} from '../contants/theme';

import useBackHandler from '../hooks/useBackHandler';
import {permissionEnabled} from '../helpers/common';
import {PERMISSIONS} from 'react-native-permissions';
import RenderOptionsWithIcons from './RenderOptionsWithIcons';
import {useDispatch, useSelector} from 'react-redux';
import {uploadUserAvatarRequested} from '../redux/actions/user.actions';
import {getUser} from '../redux/selectors/user.selectors';
import Button from './Button';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

declare type CropResponse = {
  uri: string;
  width: number;
  height: number;
};

const AnimatedBox = Animated.createAnimatedComponent(Box);

const imageSize = 100;

interface IUserAvatarProps {
  showUpload?: boolean;
}

export default function UserAvatar(props: IUserAvatarProps) {
  const user = useSelector(getUser);

  const cropViewRef = React.useRef<CropView>(null);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {}, []);

  const handleUploadImagePress = useCallback(() => {
    setShowModal(true);
  }, []);

  return (
    <>
      <Box
        height={100}
        width={100}
        position="absolute"
        top={-50}
        alignSelf="center">
        {user?.photoURL ? (
          <Image
            style={{
              height: imageSize,
              width: imageSize,
              borderRadius: imageSize / 2,
            }}
            source={{uri: user?.photoURL}}
            contentFit="cover"
            transition={300}
            contentPosition="center"
            alt="User Profile Image"
          />
        ) : (
          <Box
            height={imageSize}
            width={imageSize}
            backgroundColor={'danger'}
            style={{borderRadius: imageSize / 2}}
            position="absolute"
            zIndex={1000}
          />
        )}
        {props.showUpload && (
          <Box
            position="absolute"
            right={-5}
            bottom={5}
            borderRadius="xl"
            style={styles.uploadBtn}
            zIndex={1000}
            backgroundColor="white"
            justifyContent="center"
            alignItems="center">
            <TouchableOpacity hitSlop={20} onPress={handleUploadImagePress}>
              <Icon name="upload" size={15} color="black" />
            </TouchableOpacity>
          </Box>
        )}
      </Box>

      {props.showUpload && (
        <RenderModal showModal={showModal} setShowModal={setShowModal} />
      )}
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
  const dispatch = useDispatch();

  const [userAvatar, setUserAvatar] = useState('');
  const cropViewRef = React.useRef<CropView>(null);
  const [showCropModal, setShowCropModal] = useState(false);

  useBackHandler(() => {
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

  useEffect(() => {
    // dispatch(uploadUserAvatarRequested({avatar: userAvatar}));
  }, [userAvatar]);

  const handleCameraPress = useCallback(async () => {
    const isPermissionsEnabled = await permissionEnabled([
      {name: PERMISSIONS.ANDROID.CAMERA, optional: false},
    ]);

    if (isPermissionsEnabled) {
      const result = await launchImageLibrary({
        mediaType: 'photo',
      });

      if (
        Array.isArray(result.assets) &&
        result.assets.length > 0 &&
        result.assets[0].uri
      ) {
        setUserAvatar(result.assets[0].uri);
        setShowCropModal(true);
      }
    }
  }, []);

  const options = useMemo(
    () => [
      // {
      //   label: 'Upload from Camera',
      //   handler: () => {
      //     handleCameraPress();
      //     handleModalClose();
      //   },
      //   iconName: 'camera',
      // },
      {
        label: 'Upload from Gallery',
        handler: () => {
          handleCameraPress();
          handleModalClose();
        },
        iconName: 'image',
      },
    ],
    [],
  );

  const handleCropImage = useCallback(() => {
    if (cropViewRef.current) {
      cropViewRef.current.saveImage();
    }
  }, []);

  const onCropImage = useCallback((response: CropResponse) => {
    setShowCropModal(false);
    dispatch(uploadUserAvatarRequested({avatar: response.uri}));
  }, []);

  const toggleCropModal = useCallback(() => {
    setShowCropModal(!showCropModal);
  }, [showCropModal]);

  return (
    <>
      <Modal
        animationType="fade"
        transparent
        visible={showCropModal}
        onRequestClose={toggleCropModal}>
        <GestureHandlerRootView style={{flex: 1}}>
          <Box flex={1} backgroundColor="darkGrey">
            <Box
              flexDirection={'row'}
              justifyContent="space-between"
              alignItems="center"
              margin="m">
              <Button
                label="Close"
                textBtn
                onPress={() => setShowCropModal(false)}
                variant="transparent"
              />
              <Button
                label="Done"
                onPress={handleCropImage}
                variant="primary"
              />
            </Box>

            <CropView
              sourceUrl={userAvatar}
              style={{
                flex: 1,
                margin: 10,
              }}
              ref={cropViewRef}
              onImageCrop={onCropImage}
              keepAspectRatio
              aspectRatio={{width: 20, height: 20}}
            />
          </Box>
        </GestureHandlerRootView>
      </Modal>

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
                <RenderOptionsWithIcons options={options} />
              </Box>
            </AnimatedBox>
          </TouchableOpacity>
        </AnimatedBox>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  uploadBtn: {
    borderWidth: 2,
    borderColor: 'black',
    padding: 8,
  },
});
