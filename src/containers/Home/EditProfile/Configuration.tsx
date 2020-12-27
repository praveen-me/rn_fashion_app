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

const preferredColorOptions = [
  {
    id: '1',
    label: '#0C0D34',
  },
  {
    id: '2',
    label: '#2CB9B0',
  },
  {
    id: '3',
    label: '#FF0058',
  },
  {
    id: '4',
    label: '#a09c00',
  },
  {
    id: '5',
    label: 'orange',
  },
  {
    id: '6',
    label: 'pink',
  },
  {
    id: '7',
    label: 'violet',
  },
];

export default function Configuration() {
  const theme = useTheme();

  const outfitRef = useRef<CheckBoxGroupRef>(null);
  const preferredBrandsRef = useRef<RoundedCheckBoxGroupRef>(null);
  const preferredColorsRef = useRef<CheckBoxGroupRef>(null);
  const clothingSizeRef = useRef<RoundedCheckBoxGroupRef>(null);

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
          ref={clothingSizeRef}
          type="multi"
        />
      </Box>
      <Box>
        <AppText bold variant="body">
          My preferred clothing colors
        </AppText>
        <RoundedCheckBoxGroup
          options={preferredColorOptions}
          ref={preferredColorsRef}
          type="multi"
          labelAsColor
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
          console.log(clothingSizeRef.current?.value);
          console.log(preferredColorsRef.current?.value);
        }}
      />
    </ScrollView>
  );
}
