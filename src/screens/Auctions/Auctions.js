import React from 'react';
import { SafeAreaView } from 'react-native';
import { Header } from '../../components';
import styles from './Auctions.style';

const SignIn = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="Auction" />
    </SafeAreaView>
  );
};

export default SignIn;
