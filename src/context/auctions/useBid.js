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

    return firestore()
      .collection('bids')
      .where('userId', '==', userId)
      .onSnapshot(querySnapshot => {
        const items = querySnapshot.docs.map(documentSnapshot => {
          return {
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          };
        });

        setUserBids(items);
        toggleLoading(false);
      });
  };

  const getUserBidItems = userId => {
    return firestore()
      .collection('bids')
      .where('userId', '==', userId)
      .onSnapshot(querySnapshot => {
        const items = querySnapshot.docs.map(documentSnapshot => {
          return {
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          };
        });

        firestore()
          .collection('items')
          .where(
            'itemId',
            'in',
            items.map(i => i.itemId),
          )
          .onSnapshot(snapshot => {
            const itemList = snapshot.docs.map(documentSnapshot => {
              return {
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              };
            });

            setUserBidItems(itemList);
            toggleLoading(false);
          });
      });
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
