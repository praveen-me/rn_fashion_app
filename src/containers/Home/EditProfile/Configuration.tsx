import React, {useRef} from 'react';
import {ScrollView, Button} from 'react-native';
import {Box, useTheme} from '../../../contants/theme';
import AppText from '../../../components/Text';
import CheckBoxGroup, {
  CheckBoxGroupRef,
} from '../../../components/CheckboxGroup';
import RoundedCheckBoxGroup, {
  RoundedCheckBoxGroupRef,
} from '../../../components/RoundedCheckBoxGroup';

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

const preferredBrandsOptions = [
  {
    id: 'addidas',
    label: 'Addidas',
  },
  {
    id: 'nike',
    label: 'Nike',
  },
  {
    id: 'converse',
    label: 'Converse',
  },
  {
    id: 'tommhilfiger',
    label: 'Tommy Hilfiger',
  },
  {
    id: 'bbclub',
    label: 'Billionaire Boys Club',
  },
  {
    id: 'lcs',
    label: 'Le Coq Sportif',
  },
  {
    id: 'jordan',
    label: 'Jordan',
  },
];

const preferredSizes = [
  {
    id: 's',
    label: 'S',
  },
  {
    id: 'm',
    label: 'M',
  },
  {
    id: 'l',
    label: 'L',
  },
  {
    id: 'xl',
    label: 'XL',
  },
  {
    id: 'xxl',
    label: 'XXL',
  },
];

export default function Configuration() {
  const theme = useTheme();

  const outfitRef = useRef<CheckBoxGroupRef>(null);
  const preferredBrandsRef = useRef<RoundedCheckBoxGroupRef>(null);

  return (
    <ScrollView contentContainerStyle={{padding: theme.spacing.m}}>
      <Box paddingBottom="m">
        <AppText variant="body" bold>
          What type of outfit you usually wear now?
        </AppText>
        <CheckBoxGroup options={outfitSelectionOptions} ref={outfitRef} />
      </Box>
      <Box>
        <AppText bold variant="body">
          What is your clothing size?
        </AppText>
        <RoundedCheckBoxGroup
          options={preferredSizes}
          ref={preferredBrandsRef}
          type="multi"
        />
      </Box>
      <Box>
        <AppText bold variant="body">
          My Preferred Brand
        </AppText>
        <CheckBoxGroup
          options={preferredBrandsOptions}
          ref={preferredBrandsRef}
          type="multi"
        />
      </Box>

      <Button
        title="One"
        onPress={() => {
          console.log(outfitRef.current?.value);
          console.log(preferredBrandsRef.current?.value);
        }}
      />
    </ScrollView>
  );
}
