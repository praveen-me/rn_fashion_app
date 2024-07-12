import React from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import Button from '../../../components/Button';
import AppText from '../../../components/Text';

const {height} = Dimensions.get('window');
export const SLIDE_HEIGHT = height * 0.61;

interface SlideProps {
  description: string;
  subTitle: string;
  last: boolean;
  onPress: () => void;
}

const SubSlide = ({description, subTitle, last, onPress}: SlideProps) => {
  return (
    <View style={styles.container}>
      <AppText medium style={styles.subTitle} variant="title2">
        {subTitle}
      </AppText>
      <AppText variant="body" style={styles.description}>
        {description}
      </AppText>

      <Button
        label={last ? "Let's get started" : 'Next'}
        variant={last ? 'primary' : 'default'}
        onPress={onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 44,
    marginTop: 20,
  },
  subTitle: {
    marginBottom: 20,
  },
  description: {
    textAlign: 'center',
    marginBottom: 40,
  },
});

export default SubSlide;
