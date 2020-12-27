import React, {useRef} from 'react';
import {ScrollView} from 'react-native';
import {Box} from '../../../contants/theme';
import AppText from '../../../components/Text';
import CheckBoxGroup, {
  CheckBoxGroupRef,
} from '../../../components/CheckboxGroup';

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
        <AppText variant="body" bold>
          Account Information
        </AppText>
        <CheckBoxGroup options={genders} ref={genderRef} />
      </Box>
      <Box padding="m">
        <AppText variant="body" bold>
          Account Information
        </AppText>
        <CheckBoxGroup options={genders} ref={genderRef} />
      </Box>
      <Box padding="m">
        <AppText variant="body" bold>
          Account Information
        </AppText>
        <CheckBoxGroup options={genders} ref={genderRef} />
      </Box>
    </ScrollView>
  );
}
