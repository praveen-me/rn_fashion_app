import React from 'react';

import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import AppText from '../../../components/Text';
import {Box, useTheme} from '../../../contants/theme';
import SocialLogin from './SocialLogin';

interface FooterProps {
  onPress: () => void;
  title: string;
  action: string;
}

const Footer = ({onPress, title, action}: FooterProps) => {
  const theme = useTheme();

  return (
    <>
      <SocialLogin />
      <Box flexDirection="row" justifyContent="center" marginVertical="m">
        <TouchableWithoutFeedback onPress={onPress}>
          <AppText style={{color: 'white'}}>
            <AppText style={{marginRight: theme.spacing.m, color: 'white'}}>
              {` ${title} `}
            </AppText>
            <AppText
              style={{
                color: theme.colors.primatyBtnBg,
              }}>
              {action}
            </AppText>
          </AppText>
        </TouchableWithoutFeedback>
      </Box>
    </>
  );
};

export default Footer;
