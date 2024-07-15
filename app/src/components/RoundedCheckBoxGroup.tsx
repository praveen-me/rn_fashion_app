import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useCallback,
  memo,
  useRef,
} from 'react';
import {Pressable, ScrollView, type ScrollViewProps} from 'react-native';
import makeStyles from '../lib/makeStyles';

import {Box, Theme, useTheme} from '../contants/theme';
import AppText from './Text';
import Icon from 'react-native-vector-icons/Feather';
import type {BoxProps} from '@shopify/restyle';
import Animated, {useSharedValue, withTiming} from 'react-native-reanimated';

type CheckBoxType = 'single' | 'multi';

interface Option {
  id: string;
  label: string;
}

interface RoundedCheckBoxGroupProps {
  options: Option[];
  type?: CheckBoxType;
  labelAsColor?: boolean;
  selectedOptions?: string[];
}

export interface RoundedCheckBoxGroupRef {
  value: string | string[];
}

const RoundedCheckBoxGroup = forwardRef<
  RoundedCheckBoxGroupRef,
  RoundedCheckBoxGroupProps
>(
  (
    {
      options,
      type,
      labelAsColor,
      selectedOptions = [],
    }: RoundedCheckBoxGroupProps,
    ref,
  ) => {
    const [selected, setSelected] = useState<string | string[]>(
      type === 'single' ? '' : selectedOptions,
    );

    const selectedRef = useRef(selected);
    selectedRef.current = selected;

    const handleChange = useCallback((id: string) => {
      if (!type || type === 'single') {
        setSelected(id);
      } else {
        const selectedOptions = selectedRef.current;

        const index = Array.isArray(selectedOptions)
          ? selectedOptions.findIndex(item => item === id)
          : -1;
        if (index === -1) {
          setSelected(state => [...new Set([...state, id])]);
        } else {
          const remainingSelected = [...selectedOptions];
          remainingSelected.splice(index, 1);

          setSelected(remainingSelected);
        }
      }
    }, []);

    useImperativeHandle(ref, () => ({
      get value() {
        return selected;
      },
    }));

    const MainWrapper = labelAsColor ? ScrollView : Box;

    const mainWrapperProps = labelAsColor
      ? ({
          showsHorizontalScrollIndicator: false,
          horizontal: true,
        } as ScrollViewProps)
      : ({style: {flexDirection: 'row', flexWrap: 'wrap'}} as BoxProps<Theme>);

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
      <MainWrapper {...mainWrapperProps}>
        {options.map(({id, label}) => (
          <RenderItem
            key={id}
            handleChange={handleChange}
            isSelected={getIsSelected(id)}
            id={id}
            labelAsColor={labelAsColor}
            label={label}
          />
        ))}
      </MainWrapper>
    );
  },
);

const AnimatedAppText = Animated.createAnimatedComponent(AppText);
const AnimatedBox = Animated.createAnimatedComponent(Box);

interface IRenderItemProps {
  handleChange: (id: string) => void;
  isSelected: boolean;
  id: string;
  labelAsColor?: boolean;
  label: string;
}

const RenderItem = memo((props: IRenderItemProps) => {
  const theme = useTheme();
  const styles = useStyles();

  const {handleChange, id, isSelected, labelAsColor, label} = props;

  const color = useSharedValue(isSelected ? 'white' : theme.colors.bodyText);
  const backgroundColor = useSharedValue(
    isSelected ? theme.colors.primatyBtnBg : theme.colors.lightGrey,
  );

  color.value = isSelected
    ? withTiming(theme.colors.white)
    : withTiming(theme.colors.bodyText);

  backgroundColor.value = isSelected
    ? withTiming(theme.colors.primatyBtnBg)
    : withTiming(theme.colors.lightGrey);

  return (
    <Pressable
      key={id}
      onPress={() => handleChange(id)}
      style={styles.btnStyles}>
      <Box
        height={50}
        width={50}
        style={styles.outerOptionWrapper}
        justifyContent="center"
        alignItems="center"
        overflow="hidden"
        borderWidth={1}
        borderColor="darkGrey">
        <AnimatedBox
          // eslint-disable-next-line react-native/no-inline-styles
          style={{
            height: 39,
            width: 39,
            borderRadius: 39 / 2,
            backgroundColor: labelAsColor ? label : backgroundColor,
          }}
          justifyContent="center"
          alignItems="center">
          {!labelAsColor ? (
            <AnimatedAppText
              style={{
                color,
              }}
              variant="body"
              center>
              {label}
            </AnimatedAppText>
          ) : (
            isSelected && <Icon name="check" color={'white'} size={20} />
          )}
        </AnimatedBox>
      </Box>
    </Pressable>
  );
});

const useStyles = makeStyles((theme: Theme) => ({
  outerOptionWrapper: {
    padding: 5,
    borderRadius: 25,
  },
  btnStyles: {
    width: undefined,
    margin: theme.spacing.s,
  },
}));

export default RoundedCheckBoxGroup;
