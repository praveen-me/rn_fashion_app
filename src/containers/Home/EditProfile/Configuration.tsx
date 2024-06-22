import React, {useMemo} from 'react';
import {ScrollView} from 'react-native';
import {Box, useTheme} from '../../../contants/theme';
import AppText from '../../../components/Text';
import CheckBoxGroup from '../../../components/CheckboxGroup';
import RoundedCheckBoxGroup from '../../../components/RoundedCheckBoxGroup';

import {useEditProfileContext} from './EditProfileProvider';
import {useSelector} from 'react-redux';
import {getUserConstants} from '../../../redux/selectors/misc.selectors';

interface IConfigurationProps {
  // user: IUserData;
}

export default function Configuration(props: IConfigurationProps) {
  const theme = useTheme();

  const {addInputRef} = useEditProfileContext();

  const {clothingBrands, outfitSelections, clothingSize, preferredColors} =
    useSelector(getUserConstants);

  // const [userChoices, setUserChoices] = useState({
  //   outfitSelection: props.user?.outfitSelection,
  //   preferredBrands: props.user?.preferredBrands,
  //   preferredSize: props.user?.preferredSizes,
  //   preferredColors: props.user?.preferredColors,
  // });

  console.log({outfitSelections});

  const outfitSelectionOptions = useMemo(
    () =>
      outfitSelections.map(outfit => ({id: outfit.key, label: outfit.label})),
    [outfitSelections],
  );
  console.log({outfitSelectionOptions});

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
        />
      </Box>
    </ScrollView>
  );
}
