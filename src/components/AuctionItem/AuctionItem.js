import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import PropTypes from 'prop-types';
import styles from './AuctionItem.style';
import { theme } from '../../constants';
import { addCommaToNumber } from '../../helpers';

const AuctionItem = ({
  item,
  itemName,
  imageUrl,
  timeRemaining,
  lastBid,
  yourBid,
  onPressBidButton,
  hasUserBid,
  onPress,
}) => (
  <View style={styles.container}>
    <TouchableWithoutFeedback onPress={() => onPress(item)}>
      <Image
        style={styles.image}
        resizeMode="cover"
        source={{ uri: imageUrl }}
      />
    </TouchableWithoutFeedback>
    <View style={styles.infoContainer}>
      <Text onPress={() => onPress(item)} style={styles.itemName}>
        {itemName}
      </Text>
      <View style={styles.timeContainer}>
        <Icon size={14} color={theme.fontColor} name="clock" />
        <Text style={styles.remainingTime}>{timeRemaining}</Text>
      </View>
      <View style={styles.bidRow}>
        <View style={styles.lastBid}>
          <Text>Last Bid</Text>
          <Text style={styles.lastBidPrice}>
            {`$${addCommaToNumber(lastBid)}`}
          </Text>
        </View>
        <View style={styles.yourBid}>
          <TouchableOpacity onPress={() => onPressBidButton(item)}>
            <View
              style={[
                styles.bidNowButton,
                hasUserBid && { backgroundColor: theme.primaryColor },
              ]}
            >
              {!hasUserBid ? (
                <Text style={styles.bidNowText}>Bid Now</Text>
              ) : (
                <Text
                  style={[
                    styles.bidNowText,
                    { color: theme.contentHightlight },
                  ]}
                >
                  {`Your bid $${addCommaToNumber(yourBid)}`}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </View>
);

AuctionItem.propTypes = {
  item: PropTypes.shape({}).isRequired,
  itemName: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  timeRemaining: PropTypes.string.isRequired,
  lastBid: PropTypes.number.isRequired,
  onPressBidButton: PropTypes.func.isRequired,
  onPress: PropTypes.func.isRequired,
  yourBid: PropTypes.number,
  hasUserBid: PropTypes.bool,
};

AuctionItem.defaultProps = {
  yourBid: 0,
  hasUserBid: false,
};

export default AuctionItem;
