import React, {useRef} from 'react';
import {TextInput as RNTextInput} from 'react-native';
import Button from '../../../components/Button';
import Container from '../../../components/Container';
import AppText from '../../../components/Text';
import {Box, useTheme} from '../../../contants/theme';
import CheckBox from '../components/Form/CheckBox';
import TextInput from '../components/Form/TextInput';
import EncryptedStorage from 'react-native-encrypted-storage';

import {useFormik} from 'formik';

import * as Yup from 'yup';
import Footer from '../components/Footer';
import {AuthNavigationProps} from '../../../lib/navigation/rootNavigation';
import {IS_LOGGED_IN} from '../../../lib/keys';
import {useDispatch} from 'react-redux';
import {loginRequested} from '../../../redux/actions/user.actions';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(2, 'Too Short').max(30, 'Too Long'),
  remember: Yup.boolean(),
});

export interface ILoginState {
  email: string;
  password: string;
  remember: boolean;
}

const Login = ({navigation}: AuthNavigationProps<'Login'>) => {
  const dispatch = useDispatch();

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
    onSubmit,
    validationSchema: LoginSchema,
  });

  const passwordField = useRef<RNTextInput>(null);

  async function onSubmit(values: ILoginState) {
    const payload = {
      email: values.email,
      password: values.password,
    };

    dispatch(loginRequested(payload));

    await EncryptedStorage.setItem(IS_LOGGED_IN, 'true');
  }

  const footer = (
    <Footer
      onPress={() => navigation.navigate('SignUp')}
      title="Don't have an account?"
      action="Signup"
    />
  );

  return (
    <Container {...{footer}}>
      <Box padding="xl" style={{marginTop: 100}}>
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
            autoComplete="email"
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
            onChange={value => setFieldValue('remember', value)}
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
