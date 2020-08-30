import React, {ReactNode} from 'react';

import {Box} from '../../../contants/theme';

import Facebook from '../../../assets/svg/Facebook';
import Google from './../../../assets/svg/Google';
import Apple from '../../../assets/svg/Apple';

interface SocialIconProps {
  children: ReactNode;
}

const SocialIcon = ({children}: SocialIconProps) => {
  return (
    <Box
      height={44}
      width={44}
      backgroundColor="white"
      borderRadius="l"
      justifyContent="center"
      alignItems="center"
      marginHorizontal="s">
      {children}
    </Box>
  );
};

const SocialLogin = () => {
  return (
    <Box flexDirection="row" justifyContent="center" marginVertical="l">
      <SocialIcon>
        <Facebook />
      </SocialIcon>
      <SocialIcon>
        <Google />
      </SocialIcon>
      <SocialIcon>
        <Apple />
      </SocialIcon>
    </Box>
  );
};

export default SocialLogin;
