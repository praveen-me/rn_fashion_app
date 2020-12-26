import React from 'react';
import {ScrollView} from 'react-native';
import {useTheme} from '../../../contants/theme';
import AppText from '../../../components/Text';
import CheckBoxGroup from '../../../components/CheckboxGroup';
// import {Text} from 'src/contants/theme';

const outfitSelectionOptions = [
  {
    id: 'men',
    label: 'For men',
  },
  {
    id: 'women',
    label: 'For Women',
  },
  {
    id: 'both',
    label: 'For both',
  },
];

export default function Configuration() {
  const theme = useTheme();

  return (
    <ScrollView contentContainerStyle={{padding: theme.spacing.m}}>
      <AppText variant="body">
        What type of outfit you usually wear now?
      </AppText>
      <CheckBoxGroup options={outfitSelectionOptions} type="multi" />
    </ScrollView>
  );
}
