import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from './Header.style';

const Header = ({ title }) => (
  <View style={styles.headerContainer}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
