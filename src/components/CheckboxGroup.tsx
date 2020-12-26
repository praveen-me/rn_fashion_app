import {backgroundColor} from '@shopify/restyle';
import React, {useState} from 'react';
import {Pressable} from 'react-native';

import {Box, useTheme} from '../contants/theme';
import AppText from './Text';

type CheckBoxType = 'single' | 'multi';

interface Option {
  id: string;
  label: string;
}

interface CheckBoxGroupProps {
  options: Option[];
  type?: CheckBoxType;
}

const CheckBoxGroup = ({options, type}: CheckBoxGroupProps) => {
  const [selected, setSelected] = useState<string | string[]>(
    type === 'single' ? '' : [],
  );

  const theme = useTheme();

  function handleChange(id: string) {
    if (!type || type === 'single') {
      setSelected(id);
    } else {
      const index = Array.isArray(selected)
        ? selected.findIndex((item) => item === id)
        : -1;

      if (index === -1) {
        setSelected((state) => [...new Set([...state, id])]);
      } else {
        const remaingSelected = [...selected];
        remaingSelected.splice(index, 1);

        setSelected(remaingSelected);
      }
    }
  }

  function getBackgroundColor(id: string) {
    return Array.isArray(selected)
      ? selected.findIndex((item) => item === id) !== -1
        ? theme.colors.primatyBtnBg
        : theme.colors.lightGrey
      : id !== selected
      ? theme.colors.lightGrey
      : theme.colors.primatyBtnBg;
  }

  return (
    <Box flexDirection="row" flexWrap="wrap">
      {options.map(({id, label}) => (
        <Pressable
          key={id}
          onPress={() => handleChange(id)}
          style={{width: undefined, margin: theme.spacing.s}}>
          {console.log(getBackgroundColor(id))}
          <Box
            // eslint-disable-next-line react-native/no-inline-styles
            style={{
              borderRadius: 25,
              backgroundColor: getBackgroundColor(id),
            }}
            padding="m">
            <AppText style={{width: 'auto'}}>{label}</AppText>
          </Box>
        </Pressable>
      ))}
    </Box>
  );
};

export default CheckBoxGroup;
