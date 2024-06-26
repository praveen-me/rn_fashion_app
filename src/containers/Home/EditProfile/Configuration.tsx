import React, {useMemo, memo} from 'react';
import {ScrollView} from 'react-native';
import {Box, useTheme} from '../../../contants/theme';
import AppText from '../../../components/Text';
import CheckBoxGroup, {
  type CheckBoxGroupRef,
} from '../../../components/CheckboxGroup';
import RoundedCheckBoxGroup, {
  type RoundedCheckBoxGroupRef,
} from '../../../components/RoundedCheckBoxGroup';

import {useSelector} from 'react-redux';
import {getUserConstants} from '../../../redux/selectors/misc.selectors';
import {getUser} from '../../../redux/selectors/user.selectors';
import type {RefKeys as InputRefKeys} from './EditProfileProvider';

interface IConfigurationProps {
  addInputRef: (
    key: InputRefKeys,
    ref: CheckBoxGroupRef | RoundedCheckBoxGroupRef,
  ) => void;
}

export default memo(function Configuration(props: IConfigurationProps) {
  const {addInputRef} = props;
  const theme = useTheme();

  const {clothingBrands, outfitSelections, clothingSize, preferredColors} =
    useSelector(getUserConstants);

  const user = useSelector(getUser);

  const userConfig = useMemo(
    () => ({
      outfitSelection: user?.outfitSelection || '',
      preferredBrands: user?.preferredBrands || [],
      preferredSize: user?.preferredSizes || [],
      preferredColors: user?.preferredColors || [],
    }),
    [user],
  );

  const outfitSelectionOptions = useMemo(
    () =>
      outfitSelections.map(outfit => ({id: outfit.key, label: outfit.label})),
    [outfitSelections],
  );

  const clothingSizeOptions = useMemo(
    () =>
      clothingSize.map(size => ({
        id: size.value.toLowerCase(),
        label: size.value.toUpperCase(),
      })),
    [clothingSize],
  );

  const preferredColorsOptions = useMemo(() => {
    return preferredColors.map((color, index) => ({
      id: color.value,
      label: color.value,
    }));
  }, [preferredColors]);

  const clothingBrandOptions = useMemo(
    () =>
      clothingBrands.map(brand => ({
        id: brand.key,
        label: brand.label,
      })),
    [clothingBrands],
  );

  console.log(JSON.stringify({userConfig, preferredColorsOptions}, null, 2));

  return (
    <ScrollView contentContainerStyle={{padding: theme.spacing.m}}>
      <Box paddingBottom="m">
        <AppText variant="body" bold>
          What type of outfit you usually wear now?
        </AppText>
        <CheckBoxGroup
          options={outfitSelectionOptions}
          ref={ref => {
            if (!ref) return;

            addInputRef('outfitSelection', ref);
          }}
          selectedOption={userConfig.outfitSelection}
        />
      </Box>
      <Box>
        <AppText bold variant="body">
          What is your clothing size?
        </AppText>
        <RoundedCheckBoxGroup
          options={clothingSizeOptions}
          ref={ref => {
            if (!ref) return;
            addInputRef('preferredSizes', ref);
          }}
          type="multi"
          selectedOptions={userConfig.preferredSize}
        />
      </Box>
      <Box>
        <AppText bold variant="body">
          My preferred clothing colors
        </AppText>
        <RoundedCheckBoxGroup
          options={preferredColorsOptions}
          ref={ref => {
            if (!ref) return;
            addInputRef('preferredColors', ref);
          }}
          type="multi"
          labelAsColor
          selectedOptions={userConfig.preferredColors}
        />
      </Box>
      <Box>
        <AppText bold variant="body">
          My Preferred Brand
        </AppText>
        <CheckBoxGroup
          options={clothingBrandOptions}
          ref={ref => {
            if (!ref) return;
            addInputRef('preferredBrands', ref);
          }}
          type="multi"
          selectedOptions={userConfig.preferredBrands}
        />
      </Box>
    </ScrollView>
  );
});
