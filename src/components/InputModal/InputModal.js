import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import CustomModal from '../CustomModal';
import Input from '../Input';
import Button from '../Button';
import styles from './InputModal.style';

const InputModal = ({
  visible,
  onRequestClose,
  defaultValue,
  error,
  value,
  onChange,
  onBlur,
  disabled,
  onButtonPress,
  inputId,
  inputLabel,
  keyboardType,
  placeholder,
  buttonLabel,
}) => {
  console.log(defaultValue.toString());
  return (
    <CustomModal visible={visible} onRequestClose={onRequestClose}>
      <View style={styles.bidAmountContainer}>
        <Input
          id={inputId}
          label={inputLabel}
          onChange={onChange}
          onBlur={onBlur}
          defaultValue={defaultValue}
          value={value}
          error={error}
          keyboardType={keyboardType}
          placeholder={placeholder}
        />
        <Button
          label={buttonLabel}
          onClick={onButtonPress}
          disabled={disabled}
        />
      </View>
    </CustomModal>
  );
};

InputModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  defaultValue: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  disabled: PropTypes.bool.isRequired,
  onButtonPress: PropTypes.func.isRequired,
  inputId: PropTypes.string,
  inputLabel: PropTypes.string,
  keyboardType: PropTypes.string,
  placeholder: PropTypes.string,
  buttonLabel: PropTypes.string,
};

InputModal.defaultProps = {
  inputId: 'bid',
  inputLabel: 'Your Bid',
  keyboardType: 'numeric',
  placeholder: '',
  buttonLabel: 'Place Bid',
};

export default InputModal;
