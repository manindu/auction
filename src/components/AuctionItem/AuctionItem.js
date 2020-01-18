import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
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
}) => (
  <View style={styles.container}>
    <Image style={styles.image} resizeMode="cover" source={{ uri: imageUrl }} />
    <View style={styles.infoContainer}>
      <Text style={styles.itemName}>{itemName}</Text>
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
          {yourBid > 0 ? (
            <>
              <Text style={styles.yourBidLabel}>Your Bid</Text>
              <Text style={styles.yourBidPrice}>{`$${yourBid}`}</Text>
            </>
          ) : (
            <TouchableOpacity onPress={() => onPressBidButton(item)}>
              <View style={styles.bidNowButton}>
                {!hasUserBid ? (
                  <Text style={styles.bidNowText}>Bid Now</Text>
                ) : (
                  <Text>{`$${yourBid}`}</Text>
                )}
              </View>
            </TouchableOpacity>
          )}
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
  yourBid: PropTypes.number,
  hasUserBid: PropTypes.bool,
};

AuctionItem.defaultProps = {
  yourBid: 0,
  hasUserBid: false,
};

export default AuctionItem;
