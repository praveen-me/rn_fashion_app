import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback,
} from 'react';
import {Pressable, StyleSheet} from 'react-native';

import {Box, useTheme} from '../contants/theme';
import AppText from './Text';
import Animated, {useSharedValue, withTiming} from 'react-native-reanimated';

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

    const getIsSelected = useCallback(
      (id: string) => {
        if (!type || type === 'single') {
          return id === selected;
        }

        if (Array.isArray(selected)) {
          return selected.findIndex(item => item === id) !== -1;
        }

        return false;
      },
      [selected, type],
    );

    return (
      <Box flexDirection="row" flexWrap="wrap">
        {options.map(({id, label}, index) => {
          return (
            <RenderItem
              key={id}
              label={label}
              id={id}
              isSelected={getIsSelected(id)}
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

const AnimatedBox = Animated.createAnimatedComponent(Box);
const AnimatedAppText = Animated.createAnimatedComponent(AppText);

function RenderItem({isSelected, handleChange, label, id}: IRenderItemProps) {
  const theme = useTheme();
  const color = useSharedValue(isSelected ? 'white' : theme.colors.bodyText);
  const backgroundColor = useSharedValue(
    isSelected ? theme.colors.primatyBtnBg : theme.colors.lightGrey,
  );

  color.value = isSelected
    ? withTiming('white')
    : withTiming(theme.colors.bodyText);

  backgroundColor.value = isSelected
    ? withTiming(theme.colors.primatyBtnBg)
    : withTiming(theme.colors.lightGrey);

  return (
    <Pressable
      onPress={() => handleChange(id)}
      style={{width: undefined, margin: theme.spacing.s}}>
      <AnimatedBox
        // eslint-disable-next-line react-native/no-inline-styles
        style={[
          {
            backgroundColor,
          },
          styles.itemContainer,
        ]}>
        <AnimatedAppText style={{width: 'auto', color}}>
          {label}
        </AnimatedAppText>
      </AnimatedBox>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    borderRadius: 25,
    padding: 15,
  },
});

export default CheckBoxGroup;
