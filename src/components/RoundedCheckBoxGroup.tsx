import React, {useState, forwardRef, useImperativeHandle} from 'react';
import {Pressable, ScrollView} from 'react-native';
import makeStyles from '../lib/makeStyles';

import {Box, Theme, useTheme} from '../contants/theme';
import AppText from './Text';
import Icon from 'react-native-vector-icons/Feather';

type CheckBoxType = 'single' | 'multi';

interface Option {
  id: string;
  label: string;
}

interface RoundedCheckBoxGroupProps {
  options: Option[];
  type?: CheckBoxType;
  labelAsColor?: boolean;
}

export interface RoundedCheckBoxGroupRef {
  value: string | string[];
}

const RoundedCheckBoxGroup = forwardRef<
  RoundedCheckBoxGroupRef,
  RoundedCheckBoxGroupProps
>(({options, type, labelAsColor}: RoundedCheckBoxGroupProps, ref) => {
  const [selected, setSelected] = useState<string | string[]>(
    type === 'single' ? '' : [],
  );

  const theme = useTheme();
  const styles = useStyles();

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
        const remainingSelected = [...selected];
        remainingSelected.splice(index, 1);

        setSelected(remainingSelected);
      }
    }
  }

  useImperativeHandle(ref, () => ({
    get value() {
      return selected;
    },
  }));

  const MainWrapper = labelAsColor ? ScrollView : Box;

  const mainWrapperProps = labelAsColor
    ? {showsHorizontalScrollIndicator: false, horizontal: true}
    : {style: {flexDirection: 'row', flexWrap: 'wrap'}};

  return (
    <MainWrapper {...mainWrapperProps}>
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
              <Box
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
                  <AppText
                    style={{
                      color,
                    }}
                    variant="body"
                    center>
                    {label}
                  </AppText>
                ) : (
                  isSelected && <Icon name="check" color={'white'} size={20} />
                )}
              </Box>
            </Box>
          </Pressable>
        );
      })}
    </MainWrapper>
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
