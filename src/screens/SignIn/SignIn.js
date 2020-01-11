import React from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, View, KeyboardAvoidingView } from 'react-native';
import { Input, Button } from '../../components';
import styles from './SignIn.style';
import { useAuth } from '../../context/auth';

const SignIn = ({ navigation }) => {
  const auth = useAuth();

  const onPressSignIn = () => {
    auth.signin('manindu90@gmail.com', 'qazwsxedc');
  };

  if (auth.user) {
    navigation.navigate('App');
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
        <Input
          id="email"
          label="Email"
          placeholder=""
          keyboardType="email-address"
        />
        <Input id="password" label="Password" placeholder="" secureTextEntry />
        <View style={styles.buttonContainer}>
          <Button label="Sign In" onClick={onPressSignIn} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

SignIn.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default SignIn;
