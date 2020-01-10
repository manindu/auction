import React from 'react';
import { TextInput, View, Text } from 'react-native';
import PropTypes from 'prop-types';
import styles from './Input.style';

const Input = ({
  id,
  label,
  placeholder,
  onChange,
  onBlur,
  value,
  error,
  style,
  keyboardType,
  autoCapitalize,
  secureTextEntry,
}) => {
  return (
    <View id={id} style={[styles.container, style]}>
      {label ? (
        <View style={styles.labelContainer}>
          <Text style={styles.inputLabel}>{label}</Text>
        </View>
      ) : (
        <View style={styles.spacing} />
      )}
      <TextInput
        id={id}
        style={error ? [styles.input, styles.errorInput] : styles.input}
        placeholder={placeholder}
        onChangeText={onChange}
        onBlur={onBlur}
        value={value}
        underlineColorAndroid="transparent"
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );
};

Input.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  error: PropTypes.string,
  style: PropTypes.shape({}),
  keyboardType: PropTypes.string,
  autoCapitalize: PropTypes.string,
  secureTextEntry: PropTypes.bool,
};

Input.defaultProps = {
  label: '',
  placeholder: 'John Doe',
  error: '',
  style: {},
  keyboardType: 'default',
  autoCapitalize: 'none',
  secureTextEntry: false,
};

export default Input;
