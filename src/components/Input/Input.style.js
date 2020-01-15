import { StyleSheet } from 'react-native';
import { theme } from '../../constants';

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginBottom: 20,
  },
  errorInput: {
    borderWidth: 2,
    borderColor: theme.errorColor,
  },
  input: {
    width: '100%',
    borderColor: theme.controlBorderColor,
    borderWidth: 1,
    borderRadius: 5,
    height: 50,
    paddingLeft: 10,
    paddingRight: 10,
  },
  inputLabel: {},
  labelContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  required: {
    color: theme.errorColor,
  },
  errorText: {
    fontSize: 10,
    color: theme.errorColor,
  },
});

export default styles;
