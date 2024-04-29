import 'react-native-gesture-handler';
import * as React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

import {
  CompositeNavigationProp,
  NavigationContainer,
  NavigationContainerRef,
  RouteProp,
} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from '@react-navigation/drawer';

import {Login, Onboarding, Welcome} from '../../containers/Authentication';
import SignUp from '../../containers/Authentication/SignUp';
import ForgetPassword from '../../containers/Authentication/ForgetPassword';
import PasswordChanged from '../../containers/Authentication/PasswordChanged';
import OutfitIdeas from '../../containers/Home/OutfitIdeas';
import Drawer, {DRAWER_WIDTH} from '../../containers/Home/Drawer';
import FavouriteOutfits from '../../containers/Home/FavouriteOutfits';
import TransactionHistory from '../../containers/Home/TransactionHistory';
import EditProfile from '../../containers/Home/EditProfile';
import NotificationSettings from '../../containers/Home/NotificationSettings';
import Cart from '../../containers/Home/Cart';

import {useSelector} from 'react-redux';
import {getIsAuthenticated} from '../../redux/selectors/user.selectors';

import bootStrapApp from '../bootStarpApp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AUTH_TOKEN} from '../../contants/keys';

export interface AuthNavigationProps<RouteName extends keyof AuthRoutes> {
  navigation: CompositeNavigationProp<
    StackNavigationProp<AuthRoutes, RouteName>,
    DrawerNavigationProp<AppRoutes, 'Home'>
  >;
  route: RouteProp<AuthRoutes, RouteName>;
}

export interface HomeNavigationProps<RouteName extends keyof HomeRoutes> {
  navigation: DrawerNavigationProp<HomeRoutes, RouteName>;
  route: RouteProp<HomeRoutes, RouteName>;
}

type AuthRouteName =
  | 'Onboarding'
  | 'Welcome'
  | 'Login'
  | 'SignUp'
  | 'ForgetPassword'
  | 'PasswordChanged';

type AppRouteName = 'Home' | 'Auth';

type HomeRouteName =
  | 'FavouriteOutfits'
  | 'OutfitIdeas'
  | 'TransactionHistory'
  | 'EditProfile'
  | 'NotificationSettings'
  | 'Cart';

type AuthRoute = {
  name: AuthRouteName;
  component: React.FunctionComponent<any>;
};

type AppRoute = {
  name: AppRouteName;
  component: React.FunctionComponent<any>;
};

type HomeRoute = {
  name: HomeRouteName;
  component: React.FunctionComponent<any>;
};

export type AuthRoutes = {
  Onboarding: undefined;
  Welcome: undefined;
  Login: undefined;
  SignUp: undefined;
  ForgetPassword: undefined;
  PasswordChanged: undefined;
};

export type AppRoutes = {
  Home: undefined;
  Auth: undefined;
};

export type HomeRoutes = {
  OutfitIdeas: undefined;
  FavouriteOutfits: undefined;
  TransactionHistory: undefined;
  EditProfile: undefined;
  NotificationSettings: undefined;
  Cart: undefined;
};

export type AllRoutes = HomeRoutes | AuthRoutes;

const AuthStack = createStackNavigator<AuthRoutes>();

const AppStack = createStackNavigator<AppRoutes>();

const HomeDrawer = createDrawerNavigator<HomeRoutes>();

const HomeDrawerScreens = () => {
  return (
    <HomeDrawer.Navigator
      initialRouteName="OutfitIdeas"
      drawerContent={props => <Drawer {...props} />}
      drawerStyle={{width: DRAWER_WIDTH}}
    >
      {HomeDrawerRoutes.map(({name, component}, index) => {
        return (
          <HomeDrawer.Screen name={name} component={component} key={index} />
        );
      })}
    </HomeDrawer.Navigator>
  );
};

const AuthStackScreens = () => {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      {StackRoutes.map(({name, component}, index) => {
        return (
          <AuthStack.Screen name={name} component={component} key={index} />
        );
      })}
    </AuthStack.Navigator>
  );
};

const StackRoutes: Array<AuthRoute> = [
  {
    name: 'Onboarding',
    component: Onboarding,
  },
  {
    name: 'Welcome',
    component: Welcome,
  },
  // {
  //   name: 'Login',
  //   component: Login,
  // },
  // {
  //   name: 'SignUp',
  //   component: SignUp,
  // },
  // {
  //   name: 'ForgetPassword',
  //   component: ForgetPassword,
  // },
  // {
  //   name: 'PasswordChanged',
  //   component: PasswordChanged,
  // },
];

const HomeDrawerRoutes: HomeRoute[] = [
  {
    name: 'OutfitIdeas',
    component: OutfitIdeas,
  },
  {
    name: 'FavouriteOutfits',
    component: FavouriteOutfits,
  },
  {
    name: 'TransactionHistory',
    component: TransactionHistory,
  },
  {
    name: 'EditProfile',
    component: EditProfile,
  },
  {
    name: 'NotificationSettings',
    component: NotificationSettings,
  },
  {
    name: 'Cart',
    component: Cart,
  },
];

export const navigationRef = React.createRef<NavigationContainerRef>();

const RootNavigator = () => {
  const isLoggedIn = useSelector(getIsAuthenticated);

  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    bootStrapApp();
  }, []);

  React.useEffect(() => {
    if (isLoggedIn) {
      setIsLoading(false);
    }

    (async () => {
      const hasToken = await AsyncStorage.getItem(AUTH_TOKEN);

      if (!hasToken) {
        setIsLoading(false);
      }
    })();
  }, [isLoggedIn]);

  return !isLoading ? (
    <NavigationContainer ref={navigationRef}>
      <AppStack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={isLoggedIn ? 'Home' : 'Auth'}
      >
        {/* {isLoggedIn ? (
          <AppStack.Screen name={'Home'} component={HomeDrawerScreens} />
        ) : ( */}
        <AppStack.Screen name={'Auth'} component={AuthStackScreens} />
        {/* )} */}
      </AppStack.Navigator>
    </NavigationContainer>
  ) : (
    <View style={styles.activityContainer}>
      <ActivityIndicator size="large" />
    </View>
  );
};

const styles = StyleSheet.create({
  activityContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RootNavigator;
