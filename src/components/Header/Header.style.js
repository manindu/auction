import { StyleSheet } from 'react-native';
import { theme } from '../../constants';

export default StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 60,
    backgroundColor: theme.white,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3,
    elevation: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: theme.primaryColor,
  },
});
