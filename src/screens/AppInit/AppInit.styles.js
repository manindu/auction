import { StyleSheet } from 'react-native';
import { theme } from '../../constants';

export default StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.white,
  },
  nameText: {
    fontWeight: 'bold',
    fontSize: 30,
    color: theme.primaryColor,
    marginBottom: 20,
  },
});
