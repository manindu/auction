import React from 'react';
import { Modal } from 'react-native';
import PropTypes from 'prop-types';

const CustomModal = ({ visible, children, onRequestClose }) => (
  <Modal
    animationType="slide"
    visible={visible}
    onRequestClose={onRequestClose}
  >
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
