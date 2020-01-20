import { StyleSheet } from 'react-native';
import { theme } from '../../constants';

export default StyleSheet.create({
  container: {
    width: '100%',
    paddingLeft: 15,
    justifyContent: 'center',
    borderBottomWidth: 1,
    paddingVertical: 15,
    borderColor: theme.controlBorderColor,
  },
  label: {
    fontSize: 12,
  },
  value: {
    fontSize: 15,
    fontWeight: 'bold',
    color: theme.black,
  },
});
