import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Button from '../../../components/Button';
import AppText from '../../../components/Text';
import {Box, useTheme} from '../../../contants/theme';
interface CategoryProps {
  id: string;
  title: string;
  color: string;
}

const OUTER_RADIUS = 34;
const INNER_RADIUS = 30;

const Category = ({title, color}: CategoryProps) => {
  const theme = useTheme();
  const [active, setActive] = useState(false);

  const _handleState = () => {
    setActive(!active);
  };

  const backgroundColor = color;

  return (
    <Button onPress={_handleState} textBtn variant="transparent">
      <Box
        marginHorizontal="s"
        marginTop="s"
        alignItems="center"
        justifyContent="center">
        <Box
          height={OUTER_RADIUS * 2}
          width={OUTER_RADIUS * 2}
          justifyContent="center"
          alignItems="center">
          {active && (
            <View
              style={[styles.activeContainer, {borderColor: backgroundColor}]}
            />
          )}
          <View style={[styles.container, {backgroundColor}]} />
        </Box>
        <AppText style={{color: theme.colors.textPrimaryColor}}>
          {title}
        </AppText>
      </Box>
    </Button>
  );
};

const styles = StyleSheet.create({
  container: {
    width: INNER_RADIUS * 2,
    height: INNER_RADIUS * 2,
    borderRadius: INNER_RADIUS,
    marginVertical: 5,
  },
  activeContainer: {
    borderRadius: OUTER_RADIUS,
    ...StyleSheet.absoluteFillObject,
    borderWidth: 1,
  },
});

export default Category;
