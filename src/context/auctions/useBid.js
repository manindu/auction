import { useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { showToast } from '../../helpers';

const useBid = () => {
  const [loading, toggleLoading] = useState(false);
  const [userBids, setUserBids] = useState([]);
  const [userBidItems, setUserBidItems] = useState([]);

  const placeBid = (userId, itemId, bid) => {
    const itemDoc = firestore()
      .collection('items')
      .doc(itemId);

    toggleLoading(true);

    return itemDoc
      .update({ latestBid: bid })
      .then(() => {
        firestore()
          .collection('bids')
          .doc(`${userId}-${itemId}`)
          .set({
            userId,
            itemId,
            bid,
          });
        toggleLoading(false);
        showToast('Successfully placed the bid');
      })
      .catch(() => {
        toggleLoading(false);
        showToast('Failed to place the bid');
      });
  };

  const getUserBids = userId => {
    toggleLoading(true);

    console.log(userId);

    const unsubscribe = firestore()
      .collection('bids')
      .where('userId', '==', 'BOfg1blBwsNlUqBpQlhf6yU3Yf03')
      .onSnapshot(querySnapshot => {
        console.log(querySnapshot);
        const items = querySnapshot.docs.map(documentSnapshot => {
          return {
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          };
        });

        console.log(items);

        setUserBids(items);
        toggleLoading(false);
      });
    // const unsubscribe = firestore()
    //   .collection('items')
    //   .onSnapshot(querySnapshot => {
    //     const items = querySnapshot
    //       ? querySnapshot.docs.map(documentSnapshot => {
    //           return {
    //             ...documentSnapshot.data(),
    //             key: documentSnapshot.id,
    //           };
    //         })
    //       : [];

    //     console.log(items);

    //     if (loading) {
    //       toggleLoading(false);
    //     }
    //   });
  };

  const getUserBidItems = (userId, itemIds) => {
    const items = [];

    itemIds.forEach(itemId => {
      firestore()
        .collection('items')
        .doc(itemId)
        .onSnapshot(doc => {
          if (doc.exists) {
            console.log(doc);
            items.push({
              ...doc.data(),
              key: doc.id,
            });
          }
        });
    });

    setUserBidItems(items);
  };

  return {
    loading,
    placeBid,
    getUserBids,
    getUserBidItems,
    userBids,
    userBidItems,
  };
};

export default useBid;
