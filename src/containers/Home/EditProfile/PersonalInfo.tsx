import React, {useRef} from 'react';
import {ScrollView} from 'react-native';
import {Box} from '../../../contants/theme';
import AppText from '../../../components/Text';
import CheckBoxGroup, {
  CheckBoxGroupRef,
} from '../../../components/CheckboxGroup';
import TextInput from '../../Authentication/components/Form/TextInput';

const genders = [
  {
    id: 'male',
    label: 'Male',
  },
  {
    id: 'female',
    label: 'Female',
  },
];

export default function PersonalInfo() {
  const genderRef = useRef<CheckBoxGroupRef>(null);

  return (
    <ScrollView>
      <Box padding="m">
        <Box marginBottom="m">
          <AppText variant="body">Account Information</AppText>
        </Box>
        <Box marginBottom="m">
          <TextInput
            placeholder="Name"
            icon="user"
            // handleChange={handleChange('email')}
            // onBlur={handleBlur('email')}
            // value={values.email}
            // error={errors.email}
            // touched={touched.email}
            autoCompleteType="name"
            autoCapitalize="none"
            returnKeyType="next"
            returnKeyLabel="next"
            // onSubmitEditing={() => passwordField.current?.focus()}
          />
        </Box>
        <Box marginBottom="m">
          <TextInput
            // ref={passwordField}
            placeholder="Enter your password"
            icon="lock"
            // handleChange={handleChange('password')}
            // onBlur={handleBlur('password')}
            // value={values.password}
            // error={errors.password}
            // touched={touched.password}
            secureTextEntry
            autoCompleteType="password"
            autoCapitalize="none"
            returnKeyType="go"
            returnKeyLabel="go"
            // onSubmitEditing={handleSubmit}
          />
        </Box>
        <Box marginBottom="m">
          <TextInput
            // ref={passwordField}
            placeholder="Address"
            icon="map-pin"
            // handleChange={handleChange('password')}
            // onBlur={handleBlur('password')}
            // value={values.password}
            // error={errors.password}
            // touched={touched.password}
            secureTextEntry
            autoCompleteType="street-address"
            autoCapitalize="none"
            returnKeyType="go"
            returnKeyLabel="go"
            // onSubmitEditing={handleSubmit}
          />
        </Box>
      </Box>
    </ScrollView>
  );
}
