import { StyleSheet } from 'react-native';
import { theme } from '../../constants';

const style = StyleSheet.create({
  button: {
    borderColor: theme.controlBorderColor,
    width: '90%',
    height: 50,
    backgroundColor: theme.primaryColor,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: theme.white,
    fontWeight: 'bold',
  },
  disabled: {
    backgroundColor: theme.controlBorderColor,
  },
});

export default style;
