import 'react-native-gesture-handler';
import * as React from 'react';
import {
  NavigationContainer,
  ParamListBase,
  RouteProp,
} from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import {Login, Onboarding, Welcome} from '../../containers/Authentication';
import SignUp from '../../containers/Authentication/SignUp';
import ForgetPassword from '../../containers/Authentication/ForgetPassword';
import PasswordChanged from '../../containers/Authentication/PasswordChanged';
import OutfitIdeas from '../../containers/Home/OutfitIdeas';

export interface StackNavigationProps<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = string
> {
  navigation: StackNavigationProp<ParamList, RouteName>;
  route: RouteProp<ParamList, RouteName>;
}

type AuthRouteName =
  | 'Onboarding'
  | 'Welcome'
  | 'Login'
  | 'SignUp'
  | 'ForgetPassword'
  | 'PasswordChanged';

type AppRouteName = 'Home' | 'Auth';

type HomeRouteName = 'OutfitIdeas';

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
};

export type AllRoutes = HomeRoutes | AuthRoutes;

const AuthStack = createStackNavigator<AuthRoutes>();

const AppStack = createStackNavigator<AppRoutes>();

const HomeDrawer = createDrawerNavigator<HomeRoutes>();

const HomeDrawerScreens = () => {
  return (
    <HomeDrawer.Navigator initialRouteName="OutfitIdeas">
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
    <AuthStack.Navigator headerMode="none">
      {StackRoutes.map(({name, component}, index) => {
        return (
          <AuthStack.Screen name={name} component={component} key={index} />
        );
      })}
    </AuthStack.Navigator>
  );
};

const AppStackRoutes: Array<AppRoute> = [
  {
    name: 'Home',
    component: HomeDrawerScreens,
  },
  {
    name: 'Auth',
    component: AuthStackScreens,
  },
];

const StackRoutes: Array<AuthRoute> = [
  {
    name: 'Onboarding',
    component: Onboarding,
  },
  {
    name: 'Welcome',
    component: Welcome,
  },
  {
    name: 'Login',
    component: Login,
  },
  {
    name: 'SignUp',
    component: SignUp,
  },
  {
    name: 'ForgetPassword',
    component: ForgetPassword,
  },
  {
    name: 'PasswordChanged',
    component: PasswordChanged,
  },
];

const HomeDrawerRoutes: HomeRoute[] = [
  {
    name: 'OutfitIdeas',
    component: OutfitIdeas,
  },
];

const RootNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  React.useEffect(() => {}, []);

  return (
    <NavigationContainer>
      <AppStack.Navigator
        headerMode="none"
        initialRouteName={isLoggedIn ? 'Home' : 'Auth'}>
        {AppStackRoutes.map(({name, component}, index) => (
          <AppStack.Screen name={name} component={component} key={index} />
        ))}
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
