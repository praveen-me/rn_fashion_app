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
  selectedOptions?: string[];
  selectedOption?: string;
}

export interface CheckBoxGroupRef {
  value: string | string[];
}

const CheckBoxGroup = forwardRef<CheckBoxGroupRef, CheckBoxGroupProps>(
  (
    {
      options,
      type,
      selectedOptions = [],
      selectedOption = '',
    }: CheckBoxGroupProps,
    ref,
  ) => {
    const [selected, setSelected] = useState<string | string[]>(
      !type || type === 'single' ? selectedOption : selectedOptions,
    );

    function handleChange(id: string) {
      if (!type || type === 'single') {
        setSelected(id);
      } else {
        const index = Array.isArray(selected)
          ? selected.findIndex(item => item === id)
          : -1;
        if (index === -1) {
          setSelected(state => [...new Set([...state, id])]);
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
        {options.map(({id, label}, index) => {
          return (
            <RenderItem
              key={id}
              label={label}
              id={id}
              isSelected={
                Array.isArray(selected)
                  ? selected.findIndex(item => item === id) !== -1
                  : id === selected
              }
              handleChange={handleChange}
            />
          );
        })}
      </Box>
    );
  },
);

interface IRenderItemProps {
  handleChange: (id: string) => void;
  isSelected: boolean;
  label: string;
  id: string;
}

function RenderItem({isSelected, handleChange, label, id}: IRenderItemProps) {
  const theme = useTheme();

  // const isSelected = Array.isArray(selected)
  // ? selected.findIndex(item => item === id) !== -1
  // : id === selected;

  const color = isSelected ? 'white' : theme.colors.bodyText;
  const backgroundColor = isSelected
    ? theme.colors.primatyBtnBg
    : theme.colors.lightGrey;

  return (
    <Pressable
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
}

export default CheckBoxGroup;
