import React, {useRef} from 'react';
import {TextInput as RNTextInput} from 'react-native';
import Button from '../../../components/Button';
import Container from '../../../components/Container';
import AppText from '../../../components/Text';
import {Box, useTheme} from '../../../contants/theme';
import TextInput from '../components/Form/TextInput';

import {useFormik} from 'formik';

import * as Yup from 'yup';
import Footer from '../components/Footer';
import {AuthNavigationProps} from '../../../lib/navigation/rootNavigation';
import {useDispatch} from 'react-redux';
import {signupRequested} from '../../../redux/actions/user.actions';

const SignUpSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string().min(2, 'Too Short').max(30, 'Too Long'),
  passwordConfirmation: Yup.string()
    .equals([Yup.ref('password')], "Password don't match")
    .required('Required'),
});

export interface ISignupState {
  email: string;
  password: string;
  passwordConfirmation: string;
}

const SignUp = ({navigation}: AuthNavigationProps<'SignUp'>) => {
  const theme = useTheme();
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    isValid,
  } = useFormik({
    initialValues: {email: '', password: '', passwordConfirmation: ''},
    onSubmit,
    validationSchema: SignUpSchema,
  });

  const passwordField = useRef<RNTextInput>(null);
  const confirmPasswordField = useRef<RNTextInput>(null);

  const dispatch = useDispatch();

  function onSubmit(formValues: ISignupState) {
    if (isValid) {
      const payload = {
        email: formValues.email,
        password: formValues.password,
      };

      dispatch(signupRequested(payload));
    }
  }

  const footer = (
    <Footer
      onPress={() => navigation.navigate('Login')}
      title="Already have an account?"
      action="Login here"
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
          Create Account
        </AppText>
        <AppText variant="body" center>
          Let's us know what you name, email and your password
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
            autoComplete="password"
            autoCapitalize="none"
            returnKeyType="go"
            returnKeyLabel="go"
            onSubmitEditing={() => confirmPasswordField.current?.focus()}
          />
          <TextInput
            ref={confirmPasswordField}
            placeholder="Confirm your password"
            icon="lock"
            handleChange={handleChange('passwordConfirmation')}
            onBlur={handleBlur('passwordConfirmation')}
            value={values.passwordConfirmation}
            error={errors.passwordConfirmation}
            touched={touched.passwordConfirmation}
            secureTextEntry
            autoCompleteType="password"
            autoCapitalize="none"
            returnKeyType="go"
            returnKeyLabel="go"
            onSubmitEditing={handleSubmit}
          />
        </Box>
        <Box marginVertical="m" alignItems="center">
          <Button variant="primary" onPress={handleSubmit}>
            Create your account
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default SignUp;
