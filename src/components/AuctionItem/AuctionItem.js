import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import PropTypes from 'prop-types';
import styles from './AuctionItem.style';
import { theme } from '../../constants';

const AuctionItem = ({
  itemName,
  imageUrl,
  timeRemaining,
  lastBid,
  yourBid,
  onPressBidButton,
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
          <Text style={styles.lastBidPrice}>{`$${lastBid}`}</Text>
        </View>
        <View style={styles.yourBid}>
          {yourBid > 0 ? (
            <>
              <Text style={styles.yourBidLabel}>Your Bid</Text>
              <Text style={styles.yourBidPrice}>{`$${yourBid}`}</Text>
            </>
          ) : (
            <TouchableOpacity onPress={onPressBidButton}>
              <View style={styles.bidNowButton}>
                <Text style={styles.bidNowText}>Bid Now</Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  </View>
);

AuctionItem.propTypes = {
  itemName: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  timeRemaining: PropTypes.string.isRequired,
  lastBid: PropTypes.number.isRequired,
  onPressBidButton: PropTypes.func.isRequired,
  yourBid: PropTypes.number,
};

AuctionItem.defaultProps = {
  yourBid: 0,
};

export default AuctionItem;
