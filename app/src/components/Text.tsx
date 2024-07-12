import React, {forwardRef, ReactNode, type Ref} from 'react';
import {Text, Theme} from '../contants/theme';
import fonts from '../contants/fonts';
import type {Text as RNText} from 'react-native';

interface TextProps {
  children: string | ReactNode;
  bold?: boolean;
  medium?: boolean;
  style?: object | Array<object>;
  variant?: keyof Theme['textVariants'];
  center?: boolean;
}

const AppText = (
  {
    children,
    style = [],
    medium = false,
    bold = false,
    variant = 'body',
    center = false,
  }: TextProps,
  ref: Ref<RNText>,
) => {
  const internalStyles = {
    fontFamily: fonts.normal,
  };

  if (medium) {
    internalStyles.fontFamily = fonts.medium;
  } else if (bold) {
    internalStyles.fontFamily = fonts.bold;
  }

  const textStyles = Array.isArray(style)
    ? [...style, internalStyles]
    : {...style, ...internalStyles};

  return (
    <Text
      variant={variant}
      style={[textStyles, {textAlign: center ? 'center' : 'auto'}]}
      ref={ref}>
      {children}
    </Text>
  );
};

export default forwardRef(AppText);
