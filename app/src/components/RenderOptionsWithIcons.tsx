import {TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import theme, {Box} from '../contants/theme';
import Icon from 'react-native-vector-icons/Feather';

import AppText from './Text';

type Option = {
  label: string;
  handler: () => void;
  iconName: string;
};

interface IRenderOptionsWithIcons {
  options: Option[];
}

export default function RenderOptionsWithIcons(props: IRenderOptionsWithIcons) {
  return (
    <>
      {props.options.map(({label, handler, iconName}, index) => (
        <TouchableOpacity
          onPress={handler}
          style={styles.btnContainer}
          key={index}>
          <Box flexDirection="row" alignItems="center">
            <Box marginRight="s">
              <Icon name={iconName} size={15} color="black" />
            </Box>
            <AppText medium>{label}</AppText>
          </Box>
        </TouchableOpacity>
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
  },
  btnContainerWithBorder: {
    borderTopWidth: 1,
    borderColor: '#e0e0e0',
  },
});
