import React from 'react';
import { SafeAreaView, View, KeyboardAvoidingView } from 'react-native';
import { Input, Button } from '../../components';
import styles from './SignIn.style';

const SignIn = () => {
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
          <Button label="Sign In" onClick={() => {}} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;
