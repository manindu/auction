import React from 'react';
import PropTypes from 'prop-types';
import { Text, TouchableOpacity } from 'react-native';
import style from './Button.style';

const Button = ({ label, onClick, disabled }) => (
  <TouchableOpacity
    onPress={onClick}
    style={disabled ? [style.button, style.disabled] : style.button}
    disabled={disabled}
    activeOpacity={0.8}
  >
    <Text style={style.buttonText}>{label}</Text>
  </TouchableOpacity>
);

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  disabled: false,
};

export default Button;
