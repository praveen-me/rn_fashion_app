import React from 'react';
import {Box, Theme} from '../contants/theme';
import Icon from 'react-native-vector-icons/Feather';

export interface RoundedIconProps {
  name: string;
  size: number;
  color: string;
  backgroundColor?: keyof Theme['colors'];
  iconSize?: number;
  iconRatio?: number;
}

const RoundedIcon = ({
  backgroundColor,
  size,
  name,
  color,
  iconSize,
  iconRatio,
}: RoundedIconProps) => {
  const iconDimensions = iconSize || size * (iconRatio || 0.7);

  return (
    <Box
      justifyContent="center"
      alignItems="center"
      style={{
        height: size,
        width: size,
        borderRadius: size / 2,
      }}
      backgroundColor={backgroundColor}>
      <Icon
        name={name}
        size={iconDimensions}
        color={color}
        style={{textAlign: 'center'}}
      />
    </Box>
  );
};

RoundedIcon.backgroundColor = 'white';

export default RoundedIcon;
