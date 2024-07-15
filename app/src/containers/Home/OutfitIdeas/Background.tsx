import React from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Box, useTheme} from '../../../contants/theme';

const Background = () => {
  const theme = useTheme();

  return (
    <View style={StyleSheet.absoluteFill}>
      <Box flex={1 / 3} backgroundColor="lightBlue">
        <Box flex={1} backgroundColor="white" borderBottomRightRadius="xl" />
      </Box>
      <Box flex={1 / 3}>
        <Box flex={1} backgroundColor="white" />
        <Box flex={1} backgroundColor="textPrimaryColor" />
        <Image
          source={require('../../../assets/images/patterns/1.jpeg')}
          style={[
            styles.image,
            {
              borderTopLeftRadius: theme.borderRadii.xl,
              borderBottomRightRadius: theme.borderRadii.xl,
            },
          ]}
        />
      </Box>
      <Box flex={1 / 3} backgroundColor="lightBlue">
        <Box
          flex={1}
          backgroundColor="textPrimaryColor"
          borderTopLeftRadius="xl"
        />
      </Box>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
  },
});

export default Background;
