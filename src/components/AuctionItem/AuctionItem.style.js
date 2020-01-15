import { StyleSheet, Dimensions } from 'react-native';
import { theme } from '../../constants';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    width: '90%',
    backgroundColor: theme.white,
    flexDirection: 'column',
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: theme.borderRadius,
    ...theme.values.shadow,
  },
  image: {
    width: width * 0.9,
    height: width * 0.9 * 0.75,
    borderTopLeftRadius: theme.borderRadius,
    borderTopRightRadius: theme.borderRadius,
  },
  infoContainer: {
    flex: 1,
    padding: 10,
  },
  itemName: {
    color: theme.primaryColor,
    marginBottom: 5,
    fontWeight: 'bold',
    fontSize: 18,
  },
  description: {
    fontSize: 10,
    color: theme.fontColor,
    marginBottom: 5,
  },
  remainingTime: {
    color: theme.black,
    marginLeft: 3,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  bidRow: {
    flexDirection: 'row',
  },
  lastBid: {
    width: '50%',
    color: theme.fontColor,
  },
  lastBidPrice: {
    color: theme.fontColor,
    fontWeight: 'bold',
  },
  yourBid: {
    width: '50%',
  },
  yourBidLabel: {
    color: theme.positive,
    fontWeight: 'bold',
  },
  yourBidPrice: {
    color: theme.positive,
    fontWeight: 'bold',
  },
  bidNowButton: {
    backgroundColor: theme.contentHightlight,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '90%',
    height: 40,
    borderRadius: 20,
  },
  bidNowText: {
    color: theme.primaryColor,
    fontWeight: 'bold',
  },
});
