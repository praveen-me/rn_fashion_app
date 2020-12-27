import React, {useState, forwardRef, useImperativeHandle} from 'react';
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

export interface CheckBoxGroupRef {
  value: string | string[];
}

const CheckBoxGroup = forwardRef<CheckBoxGroupRef, CheckBoxGroupProps>(
  ({options, type}: CheckBoxGroupProps, ref) => {
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

    useImperativeHandle(ref, () => ({
      get value() {
        return selected;
      },
    }));

    return (
      <Box flexDirection="row" flexWrap="wrap">
        {options.map(({id, label}) => {
          const isSelected = Array.isArray(selected)
            ? selected.findIndex((item) => item === id) !== -1
            : id === selected;

          const color = isSelected ? 'white' : theme.colors.bodyText;
          const backgroundColor = isSelected
            ? theme.colors.primatyBtnBg
            : theme.colors.lightGrey;

          return (
            <Pressable
              key={id}
              onPress={() => handleChange(id)}
              style={{width: undefined, margin: theme.spacing.s}}>
              <Box
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  borderRadius: 25,
                  backgroundColor,
                  padding: 15,
                }}>
                <AppText style={{width: 'auto', color}}>{label}</AppText>
              </Box>
            </Pressable>
          );
        })}
      </Box>
    );
  },
);

export default CheckBoxGroup;
