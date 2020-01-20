import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Header,
  AuctionItem,
  CustomModal,
  Input,
  Button,
  InputModal,
} from '../../components';
import styles from './Auctions.style';
import useAuctionItems from '../../context/auctions/useAuctionItems';
import { getRemainingTime } from '../../helpers';
import { useAuth } from '../../context/auth';
import useBid from '../../context/auctions/useBid';

const getBidAmount = (userBids, itemId) => {
  const item = userBids.find(bid => bid.itemId === itemId);
  if (item) {
    return item.bid;
  }
  return 0;
};

const Auctions = ({ navigation }) => {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [selectedItem, setSelectedItem] = useState({});
  const [myBidModalVisible, toggleMyBidModal] = useState(false);

  const auctions = useAuctionItems();
  const { user } = useAuth();
  const { placeBid, getUserBids, userBids } = useBid();

  const userBidItemIds = userBids.map(bid => bid.itemId);

  const { itemList } = auctions;

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeElapsed(prevTime => prevTime + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const unsubscribe = getUserBids(user.uid);
    const unsubscribeGetAll = auctions.getAllItems();

    return () => {
      unsubscribe();
      unsubscribeGetAll();
    };
  }, []);

  const toggleBidModal = () => {
    toggleMyBidModal(visible => !visible);
  };

  const onPressBid = item => {
    setSelectedItem(item);
    toggleMyBidModal(visible => !visible);
  };

  const onCardPress = item => {
    navigation.navigate('ItemDetails', {
      itemId: item.key,
    });
  };

  const renderAuctionItem = args => {
    const { name, description, image, endDate, latestBid, key } = args.item;
    return (
      <AuctionItem
        item={args.item}
        itemName={name}
        description={description}
        imageUrl={image}
        timeRemaining={getRemainingTime(endDate._seconds * 1000)}
        lastBid={latestBid}
        onPressBidButton={onPressBid}
        hasUserBid={userBidItemIds.includes(key)}
        yourBid={getBidAmount(userBids, key)}
        onPress={onCardPress}
      />
    );
  };

  const onPressPlaceBid = (values, { resetForm }) => {
    placeBid(user.uid, selectedItem.key, parseInt(values.bid, 10));
    resetForm({});
    toggleBidModal(false);
  };

  const formik = useFormik({
    initialValues: {
      bid: '',
    },
    validationSchema: Yup.object().shape({
      bid: Yup.number()
        .required('Bid is required')
        .min(1, 'Bid should be greater than 0')
        .integer('Bid should be an integer')
        .positive('Bid should be a positive value'),
    }),
    onSubmit: onPressPlaceBid,
  });

  const {
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    isValid,
    handleSubmit,
  } = formik;

  const selectedItemBidValue = selectedItem
    ? getBidAmount(userBids, selectedItem.key)
    : 0;

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Auctions" />
      {/*  <CustomModal visible={myBidModalVisible} onRequestClose={toggleBidModal}>
        <View style={styles.bidAmountContainer}>
          <Input
            id="bid"
            label="Your Bid"
            onChange={handleChange('bid')}
            onBlur={handleBlur('bid')}
            value={values.bid}
            defaultValue={
              selectedItemBidValue > 0 ? selectedItemBidValue.toString() : ''
            }
            error={touched.bid && errors.bid && errors.bid.toString()}
            keyboardType="numeric"
            placeholder=""
          />
          <Button
            label="Place Bid"
            onClick={handleSubmit}
            disabled={!isValid}
          />
        </View>
          </CustomModal> */}
      <InputModal
        visible={myBidModalVisible}
        onRequestClose={toggleBidModal}
        onChange={handleChange('bid')}
        onBlur={handleBlur('bid')}
        defaultValue={
          selectedItemBidValue > 0 ? selectedItemBidValue.toString() : ''
        }
        value={values.bid}
        error={touched.bid && errors.bid ? errors.bid.toString() : ''}
        onButtonPress={handleSubmit}
        disabled={!isValid}
      />
      <FlatList
        contentContainerStyle={styles.listContentContainer}
        data={itemList}
        renderItem={renderAuctionItem}
        keyExtractor={item => item.key}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

Auctions.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default Auctions;
