import React from 'react';
import {Image, Dimensions} from 'react-native';
import {Box, useTheme} from '../../../contants/theme';

import AppText from '../../../components/Text';
import Button from '../../../components/Button';
import {AuthNavigationProps} from '../../../lib/navigation/rootNavigation';

const picture = {
  src: require('./../../../assets/images/5.png'),
  width: 3383,
  height: 4074,
};

const {width} = Dimensions.get('window');

const Welcome = ({navigation}: AuthNavigationProps<'Welcome'>) => {
  const theme = useTheme();

  function onPressLogin() {
    navigation.navigate('Login');
  }

  function onPressJoinUs() {
    navigation.navigate('SignUp');
  }

  function onPressForgotPassword() {
    navigation.navigate('ForgetPassword');
  }

  return (
    <Box flex={1} backgroundColor="white">
      <Box
        flex={1}
        borderBottomRightRadius="xl"
        backgroundColor="slide.grey"
        alignItems="center"
        justifyContent="flex-end">
        <Image
          source={picture.src}
          style={{
            width: width - theme.borderRadii.xl,
            height:
              ((width - theme.borderRadii.xl) * picture.height) / picture.width,
          }}
        />
      </Box>
      <Box flex={1} borderBottomLeftRadius="xl">
        <Box
          backgroundColor="slide.grey"
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
        />
        <Box
          backgroundColor="white"
          borderTopLeftRadius="xl"
          flex={1}
          justifyContent="space-evenly"
          alignItems="center"
          padding="xl">
          <AppText variant="title2" bold>
            Let's get started
          </AppText>
          <AppText variant="body">
            Login to your account below or signup for an amazing experience
          </AppText>
          <Button
            onPress={onPressLogin}
            label="Have an account? login"
            variant="primary"
          />
          <Button onPress={onPressJoinUs} label="Join us, it's free" />
          <Button
            onPress={onPressForgotPassword}
            label="Forgot Password?"
            variant="transparent"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Welcome;
