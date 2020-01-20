import { StyleSheet, Dimensions } from 'react-native';
import { theme } from '../../constants';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  safeAreaView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  itemImage: {
    width,
    height: width * 0.75,
  },
  contentContainer: {
    width: '100%',
    paddingHorizontal: 15,
  },
  itemName: {
    color: theme.primaryColor,
    marginBottom: 5,
    marginTop: 5,
    fontWeight: 'bold',
    fontSize: 22,
  },
  description: {
    color: theme.fontColor,
    marginBottom: 10,
  },
  remainingTime: {
    color: theme.black,
    fontWeight: 'bold',
    marginLeft: 3,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  latestBid: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  lastBidContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 15,
  },
  buttonContainer: {
    marginTop: 20,
    width: '100%',
    alignItems: 'center',
  },
});
