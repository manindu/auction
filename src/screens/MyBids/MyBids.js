import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Header,
  AuctionItem,
  CustomModal,
  Input,
  Button,
  ContentContainer,
} from '../../components';
import styles from './MyBids.style';
import useAuctionItems from '../../context/auctions/useAuctionItems';
import { getRemainingTime, getBidAmount } from '../../helpers';
import { useAuth } from '../../context/auth';
import useBid from '../../context/auctions/useBid';
import useInterval from '../../context/useInterval';

const MyBids = ({ navigation }) => {
  const [selectedItem, setSelectedItem] = useState({});
  const [myBidModalVisible, toggleMyBidModal] = useState(false);

  useInterval();
  const { user } = useAuth();
  const {
    placeBid,
    getUserBids,
    userBids,
    getUserBidItems,
    userBidItems,
  } = useBid();

  useEffect(() => {
    const unsubscribe = getUserBids(user.uid);
    const unsubscribeGetUserBidItems = getUserBidItems(user.uid);

    return () => {
      unsubscribe();
      unsubscribeGetUserBidItems();
    };
  }, []);

  const userBidItemIds = userBids.map(bid => bid.itemId);

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
      <Header title="My Bids" />
      <CustomModal visible={myBidModalVisible} onRequestClose={toggleBidModal}>
        <ContentContainer>
          <Input
            id="bid"
            label="Your Bid"
            onChange={handleChange('bid')}
            onBlur={handleBlur('bid')}
            defaultValue={
              selectedItemBidValue > 0 ? selectedItemBidValue.toString() : ''
            }
            value={values.bid}
            error={touched.bid && errors.bid && errors.bid.toString()}
            keyboardType="numeric"
            placeholder=""
          />
          <Button
            label="Place Bid"
            onClick={handleSubmit}
            disabled={!isValid}
          />
        </ContentContainer>
      </CustomModal>
      <FlatList
        contentContainerStyle={styles.listContentContainer}
        data={userBidItems}
        renderItem={renderAuctionItem}
        keyExtractor={item => item.key}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

MyBids.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default MyBids;
