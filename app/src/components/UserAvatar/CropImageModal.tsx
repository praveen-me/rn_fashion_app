import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from 'react';
import {Modal, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import theme, {Box} from '../../contants/theme';
import Button from '../Button';
import {CropView} from 'react-native-image-crop-tools';

const cropAspectRatio = {width: 20, height: 20};

interface ICropImageModalProps {
  onCropImage: (cropData: any) => void;
  userAvatar: string;
}

export type CropImageModalRef = {
  toggleCropModal: () => void;
};

const CropImageModal = React.forwardRef(
  (props: ICropImageModalProps, ref: React.Ref<CropImageModalRef>) => {
    const [showCropModal, setShowCropModal] = React.useState(false);
    const cropViewRef = useRef<CropView>(null);

    const {userAvatar, onCropImage} = props;

    useImperativeHandle(ref, () => ({
      toggleCropModal: () => setShowCropModal(!showCropModal),
    }));

    useEffect(() => {
      if (userAvatar) {
        setShowCropModal(true);
      }
    }, [userAvatar]);

    const handleCropImage = useCallback(() => {
      cropViewRef.current?.saveImage();
    }, []);

    if (!userAvatar) return null;

    return (
      <Modal
        animationType="fade"
        transparent
        visible={showCropModal}
        onRequestClose={() => setShowCropModal(false)}>
        <GestureHandlerRootView style={theme.commonStyles.flex1}>
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
              style={styles.cropView}
              ref={cropViewRef}
              onImageCrop={onCropImage}
              keepAspectRatio
              aspectRatio={cropAspectRatio}
            />
          </Box>
        </GestureHandlerRootView>
      </Modal>
    );
  },
);

const styles = StyleSheet.create({
  cropView: {
    flex: 1,
    margin: 10,
  },
});

export default CropImageModal;
