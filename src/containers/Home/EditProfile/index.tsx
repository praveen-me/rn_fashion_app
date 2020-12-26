import React from 'react';
import {StyleSheet} from 'react-native';
import {Box, useTheme} from '../../../contants/theme';
import Header from '../../../components/Header';
import {DrawerActions} from '@react-navigation/native';
import {HomeNavigationProps} from 'src/lib/navigation/rootNavigation';
import AppText from '../../../components/Text';
import Tabs from './Tabs';
import Configuration from './Configuration';
import PersonalInfo from './PersonalInfo';

const tabs = [
  {
    id: 'configuration',
    label: 'Configuration',
  },
  {
    id: 'info',
    label: 'Personal Info',
  },
];

export default function EditProfile({
  navigation,
}: HomeNavigationProps<'EditProfile'>) {
  const theme = useTheme();

  return (
    <Box flex={1}>
      <Box flex={0.2} backgroundColor="white">
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          borderBottomRightRadius="xl"
          backgroundColor="textPrimaryColor">
          <Header
            left={{
              icon: 'menu',
              onPress: () => {
                navigation.dispatch(DrawerActions.openDrawer());
              },
            }}
            right={{icon: 'shopping-bag', onPress: () => {}}}
            title="My Profile"
            dark
          />
        </Box>
      </Box>
      <Box flex={0.8}>
        <Box flex={1} backgroundColor="textPrimaryColor" />
        <Box flex={1} backgroundColor="transparent" />
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          borderTopLeftRadius="xl"
          backgroundColor="white"
          borderBottomRightRadius="xl"
          paddingTop="xl">
          <Box
            height={100}
            width={100}
            backgroundColor={'danger'}
            style={{borderRadius: 100 / 2}}
            alignSelf="center"
            position="absolute"
            top={-50}
            zIndex={1000}
          />
          <Box marginTop="m">
            <AppText
              variant="title1"
              center
              bold
              style={{
                color: theme.colors.textPrimaryColor,
              }}>
              Mike Peter
            </AppText>
            <AppText center>mike@email.com</AppText>
          </Box>
          <Tabs tabs={tabs}>{[<Configuration />, <PersonalInfo />]}</Tabs>
        </Box>
      </Box>
    </Box>
  );
}

const styles = StyleSheet.create({});
