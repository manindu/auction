/* eslint-disable react/prop-types */
import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/Feather';
import {
  Auctions,
  SignIn,
  AppInit,
  Profile,
  MyBids,
  ItemDetail,
} from '../screens';
import { theme } from '../constants';

const AuctionStack = createStackNavigator({
  AuctionsScreen: {
    screen: Auctions,
    navigationOptions: {
      headerShown: false,
    },
  },
  ItemDetails: {
    screen: ItemDetail,
    navigationOptions: {
      headerTransparent: true,
      title: '',
    },
  },
});

const MyBidStack = createStackNavigator({
  MyBidsScreen: {
    screen: MyBids,
    navigationOptions: {
      headerShown: false,
    },
  },
  ItemDetails: {
    screen: ItemDetail,
    navigationOptions: {
      headerTransparent: true,
      title: '',
    },
  },
});

const AppStack = createBottomTabNavigator(
  {
    AuctionsScreen: {
      screen: AuctionStack,
      navigationOptions: {
        title: 'Auction',
        headerTitle: 'Auction',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="shopping-bag" size={22} color={tintColor} />
        ),
        tabBarOptions: {
          activeTintColor: theme.primaryColor,
          showLabel: false,
        },
      },
    },
    MyBidsScreen: {
      screen: MyBidStack,
      navigationOptions: {
        title: 'My Bids',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="dollar-sign" size={22} color={tintColor} />
        ),
        tabBarOptions: {
          activeTintColor: theme.primaryColor,
          showLabel: false,
        },
      },
    },
    ProfileScreen: {
      screen: Profile,
      navigationOptions: {
        title: 'Profile',
        tabBarIcon: ({ tintColor }) => (
          <Icon name="user" size={22} color={tintColor} />
        ),
        tabBarOptions: {
          activeTintColor: theme.primaryColor,
          showLabel: false,
        },
      },
    },
  },
  {
    defaultNavigationOptions: {
      tabBarOptions: {
        activeTintColor: theme.primaryColor,
      },
    },
  },
);

const AuthStack = createStackNavigator(
  {
    SignInScreen: SignIn,
  },
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
