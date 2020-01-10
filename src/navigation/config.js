import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { Auctions, SignIn, AppInit } from '../screens';

const AppStack = createBottomTabNavigator({ AuctionsScreen: Auctions });
const AuthStack = createStackNavigator(
  { SignInScreen: SignIn },
  {
    headerMode: 'none',
  },
);

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AppInitScreen: AppInit,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AppInitScreen',
    },
  ),
);

export default AppContainer;
