import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

const AppInit = ({ navigation }) => {
  const initAuth = () => {
    navigation.navigate('Auth');
  };

  useEffect(() => {
    initAuth();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <ActivityIndicator />
    </View>
  );
};

AppInit.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func }).isRequired,
};

export default AppInit;
