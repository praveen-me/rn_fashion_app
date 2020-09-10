import React, {useRef} from 'react';
import {Alert, TextInput as RNTextInput} from 'react-native';
import Button from '../../../components/Button';
import Container from '../../../components/Container';
import AppText from '../../../components/Text';
import {Box, useTheme} from '../../../contants/theme';
import CheckBox from '../components/Form/CheckBox';
import TextInput from '../components/Form/TextInput';

import {useFormik} from 'formik';

import * as Yup from 'yup';
import Footer from '../components/Footer';
import {AuthNavigationProps} from '../../../lib/navigation/rootNavigation';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(2, 'Too Short').max(30, 'Too Long'),
  remember: Yup.boolean(),
});

const Login = ({navigation}: AuthNavigationProps<'Login'>) => {
  const theme = useTheme();
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {email: '', password: '', remember: false},
    onSubmit: () => navigation.navigate('Home'),
    validationSchema: LoginSchema,
  });

  const passwordField = useRef<RNTextInput>(null);

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
          Welcome Back
        </AppText>
        <AppText variant="body" center>
          Use your credentials below and login to your account
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
            onSubmitEditing={() => passwordField.current?.focus()}
          />
          <TextInput
            ref={passwordField}
            placeholder="Enter your password"
            icon="lock"
            handleChange={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            error={errors.password}
            touched={touched.password}
            secureTextEntry
            autoCompleteType="password"
            autoCapitalize="none"
            returnKeyType="go"
            returnKeyLabel="go"
            onSubmitEditing={handleSubmit}
          />
        </Box>
        <Box
          flexDirection="row"
          justifyContent="space-between"
          marginVertical="s">
          <CheckBox
            label="Remember me"
            checked={values.remember}
            onChange={(value) => setFieldValue('remember', value)}
          />
          <Button
            variant="transparent"
            onPress={() => {
              navigation.navigate('ForgetPassword');
            }}
            textVariant="primary"
            textBtn>
            Forgot Password
          </Button>
        </Box>
        <Box marginVertical="m" alignItems="center">
          <Button variant="primary" onPress={handleSubmit}>
            Log into your account
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
