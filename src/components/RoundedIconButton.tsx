import React from 'react';
import {RectButton} from 'react-native-gesture-handler';
import RoundedIcon, {RoundedIconProps} from './RoundedIcon';

interface RoundedIconButtonProps extends RoundedIconProps {
  onPress: () => void;
}

const RoundedIconButton = ({onPress, ...props}: RoundedIconButtonProps) => {
  return (
    <RectButton style={{borderRadius: props.size / 2}} onPress={onPress}>
      <RoundedIcon {...props} />
    </RectButton>
  );
};

export default RoundedIconButton;
