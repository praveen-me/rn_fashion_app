import React from 'react';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Button from '../../../components/Button';
import {Box} from '../../../contants/theme';

interface FooterProps {
  label: string;
  onPress: () => void;
}

const Footer = ({label, onPress}: FooterProps) => {
  const insets = useSafeAreaInsets();

  return (
    <Box position="absolute" bottom={0} width={'100%'}>
      <Box
        backgroundColor="textPrimaryColor"
        padding="m"
        borderTopLeftRadius="xl">
        <Box alignItems="center" style={{marginBottom: insets.bottom}}>
          <Button label={label} onPress={onPress} variant="primary" />
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
