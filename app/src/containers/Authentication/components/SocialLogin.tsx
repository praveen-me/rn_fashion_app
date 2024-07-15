import React, {ReactNode} from 'react';
import {TouchableOpacity} from 'react-native';
import {useDispatch} from 'react-redux';

// import Facebook from '../../../assets/svg/Facebook';
// import Apple from '../../../assets/svg/Apple';

import {Box} from '../../../contants/theme';
import Google from './../../../assets/svg/Google';
import {oAuthRequested} from '../../../redux/actions/user.actions';

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
  const dispatch = useDispatch();

  function handleGoogleOAuthPress() {
    dispatch(oAuthRequested());
  }

  return (
    <Box flexDirection="row" justifyContent="center" marginVertical="l">
      {/* <SocialIcon>
        <Facebook />
      </SocialIcon> */}
      <TouchableOpacity onPress={handleGoogleOAuthPress}>
        <SocialIcon>
          <Google />
        </SocialIcon>
      </TouchableOpacity>
      {/* <SocialIcon>
        <Apple />
      </SocialIcon> */}
    </Box>
  );
};

export default SocialLogin;
