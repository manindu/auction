import { useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import storage from '@react-native-firebase/storage';
import { showToast } from '../../helpers';

const useProfile = () => {
  const [additionaDetails, setAdditionalDetails] = useState({});
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const getAdditionalDetails = userId => {
    setLoading(true);

    return firestore()
      .collection('userDetails')
      .doc(userId)
      .onSnapshot(documentSnapshot => {
        setAdditionalDetails({
          ...documentSnapshot.data(),
          key: documentSnapshot.id,
        });
        setLoading(false);
      });
  };

  const saveMainData = data => {
    setLoading(true);

    return auth()
      .currentUser.updateProfile(data)
      .then(() => {
        setLoading(false);
        showToast('Successfully Updated');
      })
      .catch(err => {
        setLoading(false);
        showToast(err);
      });
  };

  const saveAdditionalData = (userId, data) => {
    setLoading(true);
    return firestore()
      .collection('userDetails')
      .doc(userId)
      .update(data)
      .then(() => {
        setLoading(false);
        showToast('Successfully Updated');
      })
      .catch(err => {
        setLoading(false);
        showToast(err);
      });
  };

  const uploadProfilePicture = (userId, imageUri) => {
    const extension = imageUri.split('.').pop();
    const fileName = `${userId}.${extension}`;

    setUploading(true);

    return storage()
      .ref(`profic-pictures/${fileName}`)
      .putFile(imageUri)
      .on(
        storage.TaskEvent.STATE_CHANGED,
        snapshot => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress.toFixed(2));

          if (snapshot.state === storage.TaskState.SUCCESS) {
            snapshot.ref.getDownloadURL().then(downloadURL => {
              return auth()
                .currentUser.updateProfile({ photoURL: downloadURL })
                .then(() => {
                  setUploading(false);
                  return showToast('Successfully Uploaded the Profile Picture');
                })
                .catch(err => {
                  setUploading(false);
                  return showToast(err);
                });
            });
          }
        },
        err => {
          setUploading(false);
          showToast(err);
        },
      );
  };

  const getCurrentUser = () => {
    return auth().currentUser;
  };

  return {
    loading,
    additionaDetails,
    getAdditionalDetails,
    saveMainData,
    saveAdditionalData,
    getCurrentUser,
    uploadProfilePicture,
    uploadProgress,
    uploading,
  };
};

export default useProfile;
