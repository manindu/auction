import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import styles from './ContentContainer.style';

const ContentContainer = ({ children }) => (
  <View style={styles.container}>{children}</View>
);

ContentContainer.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

export default ContentContainer;
