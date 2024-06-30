import React, {useEffect, useRef, useState} from 'react';
import {StatusBar} from 'react-native';
import {Box, useTheme} from '../../../contants/theme';
import Header from '../../../components/Header';
import {DrawerActions} from '@react-navigation/native';
import {HomeNavigationProps} from 'src/lib/navigation/rootNavigation';
import AppText from '../../../components/Text';
import Tabs from './Tabs';
import BottomSaveButton from './BottomSaveButton';
import {useSelector} from 'react-redux';
import {getUser} from '../../../redux/selectors/user.selectors';
import {
  EditProfileContextProvider,
  useEditProfileContext,
} from './EditProfileProvider';
import UserAvatar from '../../../components/UserAvatar';

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

function EditProfile({navigation, route}: HomeNavigationProps<'EditProfile'>) {
  const theme = useTheme();
  const [showBtn, setShowBtn] = useState(true);
  const user = useSelector(getUser);

  const {currentTabState, handleSaveUserInformation} = useEditProfileContext();

  const {currentTab, setCurrentTab} = currentTabState;

  // const [userData, setUserData] = useState({
  //   outfitSelection: user?.outfitSelection,
  //   preferredBrands: user?.preferredBrands,
  //   preferredSize: user?.preferredSizes,
  //   name: user?.name,
  //   address: user?.address,
  //   preferredColors: user?.preferredColors,
  // });

  const bottomSaveBtnRef = useRef(null);

  useEffect(() => {
    const {showSaveBtn = false} = route?.params || {};

    if (showSaveBtn) {
      setShowBtn(true);
    }
  }, [route?.params]);

  return (
    <Box backgroundColor="white" flex={1}>
      {showBtn && (
        <>
          <StatusBar barStyle="light-content" />
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
                  // right={{icon: 'shopping-bag', onPress: () => {}}}
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
                paddingTop="xl">
                <UserAvatar />
                <Box marginTop="m">
                  <AppText
                    variant="title1"
                    center
                    bold
                    style={{
                      color: theme.colors.textPrimaryColor,
                    }}>
                    {user?.name || 'User'}
                  </AppText>
                  <AppText center>{user?.email}</AppText>
                </Box>
                <Tabs
                  tabs={tabs}
                  currentTab={currentTab}
                  setCurrentTab={setCurrentTab}
                />
              </Box>
            </Box>
          </Box>
          <BottomSaveButton
            navigation={navigation}
            ref={bottomSaveBtnRef}
            setShowBtn={setShowBtn}
            onSave={handleSaveUserInformation}
          />
        </>
      )}
    </Box>
  );
}

export default function EditProfileRoot({
  navigation,
  route,
}: HomeNavigationProps<'EditProfile'>) {
  return (
    <EditProfileContextProvider>
      <EditProfile navigation={navigation} route={route} />
    </EditProfileContextProvider>
  );
}
