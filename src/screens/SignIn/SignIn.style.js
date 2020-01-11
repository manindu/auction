import { StyleSheet } from 'react-native';
import { theme } from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.white,
  },
  keyboardAvoidingView: {
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 30,
  },
});
