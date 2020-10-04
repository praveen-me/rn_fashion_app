import React, {ReactNode} from 'react';
import {Text, Theme} from '../contants/theme';
import fonts from '../contants/fonts';

interface TextProps {
  children: string | ReactNode;
  bold?: boolean;
  medium?: boolean;
  style?: object | Array<object>;
  variant?: keyof Theme['textVariants'];
  center?: boolean;
}

const AppText = ({
  children,
  style = [],
  medium = false,
  bold = false,
  variant = 'body',
  center = false,
}: TextProps) => {
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
      style={[textStyles, {textAlign: center ? 'center' : 'auto'}]}>
      {children}
    </Text>
  );
};

export default AppText;
