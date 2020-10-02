import {useTheme} from '@shopify/restyle';
import React, {ReactNode} from 'react';
import {StyleSheet} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';
import {Theme} from '../contants/theme';

import AppText from './Text';

interface ButtonProps {
  label?: string;
  variant?: 'default' | 'primary' | 'transparent';
  onPress: () => void;
  children?: string | ReactNode;
  textVariant?: 'default' | 'primary' | 'transparent';
  textBtn?: boolean;
}

const Button = ({
  label = '',
  variant = 'default',
  onPress = () => {},
  children = '',
  textVariant = 'default',
  textBtn = false,
}: ButtonProps) => {
  const theme = useTheme<Theme>();

  let backgroundColor = theme.colors['slide.grey'];

  if (variant === 'primary') {
    backgroundColor = theme.colors.primatyBtnBg;
  } else if (variant === 'transparent') {
    backgroundColor = 'transapent';
  }

  let color =
    variant === 'primary' ? theme.colors.white : theme.colors.textPrimaryColor;

  color =
    textVariant !== 'default'
      ? textVariant === 'primary'
        ? theme.colors.primatyBtnBg
        : theme.colors.textPrimaryColor
      : color;

  const inlineStyles = {
    backgroundColor,
    height: textBtn ? 'auto' : 50,
    width: textBtn ? 'auto' : 245,
    borderRadius: textBtn ? 0 : 25,
  };

  return (
    <RectButton
      style={[styles.container, inlineStyles]}
      onPress={onPress}
      activeOpacity={variant !== 'transparent' ? 0.3 : 0}>
      {typeof children === 'string' || label ? (
        <AppText medium style={[{color}]} variant="button">
          {label || children}
        </AppText>
      ) : (
        children
      )}
    </RectButton>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    textAlign: 'center',
  },
});

export default Button;
