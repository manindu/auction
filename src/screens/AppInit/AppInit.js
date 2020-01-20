import React, { useEffect } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import PropTypes from 'prop-types';
import { useAuth } from '../../context/auth';
import { theme } from '../../constants';
import styles from './AppInit.styles';

const SCREEN_NAVIGATION_DELAY = 1500;

const AppInit = ({ navigation }) => {
  const auth = useAuth();

  const initAuth = () => {
    if (auth.user) {
      setTimeout(() => {
        navigation.navigate('App');
      }, SCREEN_NAVIGATION_DELAY);
    } else {
      setTimeout(() => {
        navigation.navigate('Auth');
      }, SCREEN_NAVIGATION_DELAY);
    }
  };

  useEffect(() => {
    initAuth();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.nameText}>CenticBids</Text>
      <ActivityIndicator color={theme.primaryColor} />
    </View>
  );
};

AppInit.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};

export default AppInit;
