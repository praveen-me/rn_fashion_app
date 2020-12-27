import React, {useState, forwardRef, useImperativeHandle} from 'react';
import {Pressable} from 'react-native';
import makeStyles from '../lib/makeStyles';

import {Box, Theme, useTheme} from '../contants/theme';
import AppText from './Text';

type CheckBoxType = 'single' | 'multi';

interface Option {
  id: string;
  label: string;
}

interface RoundedCheckBoxGroupProps {
  options: Option[];
  type?: CheckBoxType;
}

export interface RoundedCheckBoxGroupRef {
  value: string | string[];
}

const RoundedCheckBoxGroup = forwardRef<
  RoundedCheckBoxGroupRef,
  RoundedCheckBoxGroupProps
>(({options, type}: RoundedCheckBoxGroupProps, ref) => {
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
          : id !== selected;

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
              height={50}
              width={50}
              style={{
                padding: 5,
                borderRadius: 25,
              }}
              justifyContent="center"
              alignItems="center"
              overflow="hidden"
              borderWidth={1}
              borderColor="darkGrey">
              <Box
                // eslint-disable-next-line react-native/no-inline-styles
                style={{
                  height: 39,
                  width: 39,
                  borderRadius: 39 / 2,
                  backgroundColor,
                }}
                justifyContent="center"
                alignItems="center">
                <AppText
                  style={{
                    width: 'auto',
                    color,
                  }}
                  variant="body"
                  center>
                  {label}
                </AppText>
              </Box>
            </Box>
          </Pressable>
        );
      })}
    </Box>
  );
});

const useStyles = makeStyles((theme: Theme) => ({}));

export default RoundedCheckBoxGroup;
