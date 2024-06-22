import React, {useRef} from 'react';
import {ScrollView, type TextInput as RNTextInput} from 'react-native';
import {Box} from '../../../contants/theme';
import AppText from '../../../components/Text';

import TextInput from '../../Authentication/components/Form/TextInput';

import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useEditProfileContext} from './EditProfileProvider';

export default function PersonalInfo() {
  const addressFieldRef = useRef<RNTextInput>(null);

  const {personalInfoState} = useEditProfileContext();

  const {handleChange, values} = personalInfoState;

  return (
    <KeyboardAwareScrollView>
      <Box padding="m">
        <Box marginBottom="m">
          <AppText variant="body">Account Information</AppText>
        </Box>
        <Box marginBottom="m">
          <TextInput
            placeholder="Name"
            icon="user"
            handleChange={handleChange('name')}
            autoCapitalize="none"
            returnKeyType="next"
            returnKeyLabel="next"
            value={values.name}
            onSubmitEditing={() => addressFieldRef?.current?.focus()}
          />
        </Box>
        <Box marginBottom="m">
          <TextInput
            handleChange={handleChange('address')}
            value={values.address}
            ref={addressFieldRef}
            placeholder="Address"
            icon="map-pin"
            secureTextEntry
            autoComplete="street-address"
            autoCapitalize="none"
            returnKeyType="go"
            returnKeyLabel="go"
          />
        </Box>
      </Box>
    </KeyboardAwareScrollView>
  );
}
