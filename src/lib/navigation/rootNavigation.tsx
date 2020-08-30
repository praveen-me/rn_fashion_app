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
import {Login, Onboarding, Welcome} from '../../containers/Authentication';
import SignUp from '../../containers/Authentication/SignUp';
import ForgetPassword from '../../containers/Authentication/ForgetPassword';
import PasswordChanged from '../../containers/Authentication/PasswordChanged';

export interface StackNavigationProps<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = string
> {
  navigation: StackNavigationProp<ParamList, RouteName>;
  route: RouteProp<ParamList, RouteName>;
}

type RouteName =
  | 'Onboarding'
  | 'Welcome'
  | 'Login'
  | 'SignUp'
  | 'ForgetPassword'
  | 'PasswordChanged';

type Route = {
  name: RouteName;
  component: React.FunctionComponent<any>;
};

export type Routes = {
  Onboarding: undefined;
  Welcome: undefined;
  Login: undefined;
  SignUp: undefined;
  ForgetPassword: undefined;
  PasswordChanged: undefined;
};

const StackRoutes: Array<Route> = [
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

const Stack = createStackNavigator<Routes>();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        {StackRoutes.map(({name, component}, index) => {
          return <Stack.Screen name={name} component={component} key={index} />;
        })}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
