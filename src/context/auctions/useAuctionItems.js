import { useState, useEffect } from 'react';
import firestore from '@react-native-firebase/firestore';

const useAuctionItems = () => {
  const [itemList, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firestore()
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

        if (loading) {
          setLoading(false);
        }
      });

    return () => unsubscribe();
  }, []);

  return {
    itemList,
    loading,
  };
};

export default useAuctionItems;
