import React, { useEffect, useState } from 'react';
import { View, Text, Image, SafeAreaView, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/Feather';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import useAuctionItems from '../../context/auctions/useAuctionItems';
import styles from './ItemDetail.style';
import {
  getRemainingTime,
  addCommaToNumber,
  getBidAmount,
} from '../../helpers';
import { theme } from '../../constants';
import { Button, CustomModal, Input, ContentContainer } from '../../components';
import useBid from '../../context/auctions/useBid';
import { useAuth } from '../../context/auth';
import useInterval from '../../context/useInterval';

const ItemDetail = ({ navigation }) => {
  const [myBidModalVisible, toggleMyBidModal] = useState(false);

  useInterval();
  const { getItemDetails, itemDetails } = useAuctionItems();

  const { placeBid, userBids, getUserBids } = useBid();
  const { user } = useAuth();

  const userBidItemIds = userBids.map(bid => bid.itemId);
  const hasUserBid = userBidItemIds.includes(navigation.state.params.itemId);

  useEffect(() => {
    const unsubscribe = getItemDetails(navigation.state.params.itemId);
    const unsubscribeGetUserBids = getUserBids(user.uid);

    return () => {
      unsubscribe();
      unsubscribeGetUserBids();
    };
  }, []);

  const toggleBidModal = () => {
    toggleMyBidModal(visible => !visible);
  };

  const onPressPlaceBid = (values, { resetForm }) => {
    placeBid(
      user.uid,
      navigation.state.params.itemId,
      parseInt(values.bid, 10),
    );
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

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <ScrollView style={styles.scrollView}>
        <CustomModal
          visible={myBidModalVisible}
          onRequestClose={toggleBidModal}
        >
          <ContentContainer>
            <Input
              id="bid"
              label="Your Bid"
              onChange={handleChange('bid')}
              onBlur={handleBlur('bid')}
              value={values.bid}
              defaultValue={
                hasUserBid
                  ? getBidAmount(
                      userBids,
                      navigation.state.params.itemId,
                    ).toString()
                  : ''
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
          </ContentContainer>
        </CustomModal>
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
          <Button
            label={
              hasUserBid
                ? `Your bid $${addCommaToNumber(
                    getBidAmount(userBids, navigation.state.params.itemId),
                  )}`
                : 'Bid Now'
            }
            onClick={toggleBidModal}
            customButtonStyle={{
              backgroundColor: hasUserBid
                ? theme.primaryColor
                : theme.contentHightlight,
            }}
            customButtonTextStyle={{
              color: hasUserBid ? theme.contentHightlight : theme.primaryColor,
            }}
          />
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
