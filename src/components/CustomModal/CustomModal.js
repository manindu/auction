import React from 'react';
import { Modal, View, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Feather';
import styles from './CustomModal.style';
import { theme } from '../../constants';

const CustomModal = ({ visible, children, onRequestClose }) => (
  <Modal
    animationType="slide"
    visible={visible}
    onRequestClose={onRequestClose}
  >
    <View style={styles.headerContainer}>
      <TouchableOpacity style={styles.touchable} onPress={onRequestClose}>
        <Icon size={28} color={theme.black} name="x" />
      </TouchableOpacity>
    </View>
    {children}
  </Modal>
);

CustomModal.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
  onRequestClose: PropTypes.func.isRequired,
  visible: PropTypes.bool,
};

CustomModal.defaultProps = {
  visible: false,
};

export default CustomModal;
