import React, {useState} from 'react';
import {Switch} from 'react-native';
import AppText from '../../../components/Text';
import {Box, useTheme} from '../../../contants/theme';

interface NotificationProps {
  title: string;
  description: string;
}

export default function Notification({title, description}: NotificationProps) {
  const [toggled, setToggle] = useState(false);

  const theme = useTheme();

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
          value={toggled}
          onValueChange={setToggle}
          trackColor={{
            true: theme.colors.primatyBtnBg,
            false: theme.colors.lightGrey,
          }}
        />
      </Box>
    </Box>
  );
}
