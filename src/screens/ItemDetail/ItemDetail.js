import React, { useEffect } from 'react';
import { View, Text, Image, SafeAreaView, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Feather';
import useAuctionItems from '../../context/auctions/useAuctionItems';
import styles from './ItemDetail.style';
import { getRemainingTime, addCommaToNumber } from '../../helpers';
import { theme } from '../../constants';
import { Button } from '../../components';

const ItemDetail = ({ navigation }) => {
  const { getItemDetails, itemDetails } = useAuctionItems();

  useEffect(() => {
    const unsubscribe = getItemDetails(navigation.state.params.itemId);

    return () => unsubscribe();
  }, []);

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView style={styles.scrollView}>
        <Image
          style={styles.itemImage}
          resizeMode="cover"
          source={{ uri: itemDetails.image }}
        />
        <View style={styles.contentContainer}>
          <Text style={styles.itemName}>{itemDetails.name}</Text>
          <View style={styles.timeContainer}>
            <Icon size={14} color={theme.black} name="clock" />
            <Text style={styles.remainingTime}>
              {itemDetails.endDate &&
                getRemainingTime(itemDetails.endDate._seconds * 1000)}
            </Text>
          </View>
          <Text style={styles.description}>{itemDetails.description}</Text>
          <View style={styles.lastBidContainer}>
            <Text style={styles.latestBid}>
              {`Last Bid $${addCommaToNumber(itemDetails.latestBid)}`}
            </Text>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button label="Bid Now" onClick={() => {}} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

ItemDetail.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
    state: PropTypes.shape({
      params: PropTypes.shape({
        itemId: PropTypes.string,
      }),
    }),
  }).isRequired,
};

export default ItemDetail;
