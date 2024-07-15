import React from 'react';
import {} from 'react-native';
import Container from '../../../components/Container';
import AppText from '../../../components/Text';
import {AuthNavigationProps} from '../../../lib/navigation/rootNavigation';
import Footer from '../components/Footer';

import {useFormik} from 'formik';

import * as Yup from 'yup';
import TextInput from '../components/Form/TextInput';
import {Box, useTheme} from '../../../contants/theme';
import Button from '../../../components/Button';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const ForgetPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(2, 'Too Short').max(30, 'Too Long'),
  remember: Yup.boolean(),
});

const ForgetPassword = ({
  navigation,
}: AuthNavigationProps<'ForgetPassword'>) => {
  const theme = useTheme();

  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
  } = useFormik({
    initialValues: {email: ''},
    onSubmit: () => {
      navigation.navigate('PasswordChanged');
    },
    validationSchema: ForgetPasswordSchema,
  });

  const footer = (
    <Footer
      onPress={() => navigation.navigate('SignUp')}
      title="Don't have an account?"
      action="Signup"
    />
  );

  return (
    <Container {...{footer}}>
      <Box padding="xl">
        <AppText
          variant="title1"
          center
          medium
          style={{marginBottom: theme.spacing.m}}>
          Forget password?
        </AppText>
        <AppText variant="body" center>
          Enter your email address associated with your account
        </AppText>

        <Box marginTop="m">
          <TextInput
            placeholder="Enter your email"
            icon="mail"
            handleChange={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
            error={errors.email}
            touched={touched.email}
            autoCompleteType="email"
            autoCapitalize="none"
            returnKeyType="next"
            returnKeyLabel="next"
          />
          <Box marginVertical="m" alignItems="center">
            <Button variant="primary" onPress={handleSubmit}>
              Reset Password
            </Button>
          </Box>
        </Box>
        <Box flexDirection="row" justifyContent="center" marginVertical="m">
          <TouchableWithoutFeedback onPress={() => {}}>
            <AppText style={{color: 'white'}}>
              <AppText
                style={{
                  marginRight: theme.spacing.m,
                  color: theme.colors.textPrimaryColor,
                }}>
                Don't work?{' '}
              </AppText>
              <AppText
                style={{
                  color: theme.colors.primatyBtnBg,
                }}>
                Try Another Way
              </AppText>
            </AppText>
          </TouchableWithoutFeedback>
        </Box>
      </Box>
    </Container>
  );
};

export default ForgetPassword;
