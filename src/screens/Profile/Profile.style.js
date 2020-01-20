import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  safeAreaView: {
    flex: 1,
    width: '100%',
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  topArea: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 25,
    marginBottom: 20,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 5,
  },
  infoFieldContainer: {
    width: '100%',
    alignItems: 'center',
  },
  signOutButtonSection: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 25,
  },
});
