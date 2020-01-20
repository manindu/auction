import { useState } from 'react';
import firestore from '@react-native-firebase/firestore';

const useAuctionItems = () => {
  const [itemList, setList] = useState([]);
  const [itemDetails, setItemDetails] = useState({});
  const [loading, setLoading] = useState(false);

  const getAllItems = () => {
    setLoading(true);

    return firestore()
      .collection('items')
      .onSnapshot(querySnapshot => {
        const items = querySnapshot
          ? querySnapshot.docs.map(documentSnapshot => {
              return {
                ...documentSnapshot.data(),
                key: documentSnapshot.id,
              };
            })
          : [];

        setList(items);
        setLoading(false);
      });
  };

  const getItemDetails = itemId => {
    setLoading(true);

    return firestore()
      .collection('items')
      .doc(itemId)
      .onSnapshot(documentSnapshot => {
        setItemDetails({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
        setLoading(false);
      });
  };

  return {
    getAllItems,
    getItemDetails,
    itemList,
    itemDetails,
    loading,
  };
};

export default useAuctionItems;
