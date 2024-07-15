import React, {useCallback} from 'react';
import {Switch} from 'react-native';
import AppText from '../../../components/Text';
import {Box, useTheme} from '../../../contants/theme';

interface NotificationProps {
  title: string;
  description: string;
  value: boolean;
  onChange: (notificationKey: string, value: boolean) => void;
  notificationKey: string;
}

export default function Notification({
  title,
  description,
  value,
  notificationKey,
  onChange,
}: NotificationProps) {
  const theme = useTheme();

  const handleOnChange = useCallback(() => {
    onChange(notificationKey, !value);
  }, []);

  return (
    <Box
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      marginTop="m"
      marginBottom="m">
      <Box width="80%">
        <AppText
          medium
          variant="body"
          style={{color: theme.colors.textPrimaryColor}}>
          {title}
        </AppText>
        <AppText variant="button">{description}</AppText>
      </Box>
      <Box>
        <Switch
          value={value}
          onValueChange={handleOnChange}
          trackColor={{
            true: theme.colors.primatyBtnBg,
            false: theme.colors.lightGrey,
          }}
        />
      </Box>
    </Box>
  );
}
