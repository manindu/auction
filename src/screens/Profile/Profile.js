import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  Image,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import ImagePicker from 'react-native-image-picker';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Header,
  InfoField,
  CustomModal,
  Input,
  Button,
  ContentContainer,
} from '../../components';
import { useAuth } from '../../context/auth';
import styles from './Profile.style';
import useProfile from '../../context/profile/useProfile';
import { profileFields } from '../../constants';
import { showToast } from '../../helpers';

const NOT_SET = 'Not Set';
const PIC_PLACEHOLDER = 'https://randomuser.me/api/portraits/lego/1.jpg';

const Profile = ({ navigation }) => {
  const [editModalVisible, toggleEditModal] = useState(false);
  const [activeForm, setActiveForm] = useState({
    id: profileFields.displayName,
    label: 'Display Name',
  });

  const { user, signout } = useAuth();

  const {
    additionaDetails,
    getAdditionalDetails,
    saveMainData,
    saveAdditionalData,
    getCurrentUser,
    uploadProfilePicture,
    uploadProgress,
    uploading,
  } = useProfile();

  const currentUser = getCurrentUser() || {};

  useEffect(() => {
    const unsubscribe = getAdditionalDetails(user.uid);

    return () => unsubscribe();
  }, []);

  const toggleModal = () => {
    toggleEditModal(visible => !visible);
  };

  const onPressSave = values => {
    switch (activeForm.id) {
      case profileFields.firstName:
        saveAdditionalData(user.uid, {
          firstName: values.firstName,
        });
        break;
      case profileFields.lastName:
        saveAdditionalData(user.uid, {
          lastName: values.lastName,
        });
        break;
      default:
        saveMainData({ displayName: values.displayName });
        break;
    }
    toggleModal();
  };

  const displayNameForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      displayName: currentUser.displayName || '',
    },
    validationSchema: Yup.object().shape({
      displayName: Yup.string(),
    }),
    onSubmit: onPressSave,
  });

  const firstNameForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: additionaDetails.firstName || '',
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string(),
    }),
    onSubmit: onPressSave,
  });

  const lastNameForm = useFormik({
    enableReinitialize: true,
    initialValues: {
      lastName: additionaDetails.lastName || '',
    },
    validationSchema: Yup.object().shape({
      lastName: Yup.string(),
    }),
    onSubmit: onPressSave,
  });

  const onPressImage = () => {
    ImagePicker.showImagePicker({ quality: 0.6 }, response => {
      if (response.didCancel) {
        showToast('Operation Cancelled');
      } else if (response.error) {
        showToast(response.error);
      } else {
        uploadProfilePicture(user.uid, response.uri);
      }
    });
  };

  const getActiveForm = () => {
    switch (activeForm.id) {
      case profileFields.firstName:
        return firstNameForm;
      case profileFields.lastName:
        return lastNameForm;
      default:
        return displayNameForm;
    }
  };

  const onPressField = fieldId => {
    toggleModal();
    switch (fieldId) {
      case profileFields.firstName:
        setActiveForm({
          id: fieldId,
          label: 'First Name',
        });
        break;
      case profileFields.lastName:
        setActiveForm({
          id: fieldId,
          label: 'Last Name',
        });
        break;
      default:
        setActiveForm({
          id: fieldId,
          label: 'Display Name',
        });
        break;
    }
  };

  const onPressSignOut = async () => {
    await signout();
    navigation.navigate('SignInScreen');
  };

  const { id, label } = activeForm;

  const {
    handleChange,
    handleBlur,
    values,
    touched,
    errors,
    handleSubmit,
    isValid,
  } = getActiveForm();

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Header title="Profile" />
      <SafeAreaView style={styles.safeAreaView}>
        <CustomModal visible={editModalVisible} onRequestClose={toggleModal}>
          <ContentContainer>
            <Input
              id={id}
              label={label}
              onChange={handleChange(id)}
              onBlur={handleBlur(id)}
              value={values[id]}
              error={touched[id] && errors[id] && errors[id].toString()}
              placeholder=""
            />
            <Button label="Save" onClick={handleSubmit} disabled={!isValid} />
          </ContentContainer>
        </CustomModal>
        <ScrollView style={styles.scrollView}>
          <View style={styles.topArea}>
            <TouchableOpacity onPress={onPressImage}>
              <Image
                source={{
                  uri: currentUser.photoURL
                    ? currentUser.photoURL
                    : PIC_PLACEHOLDER,
                }}
                style={styles.profilePicture}
              />
            </TouchableOpacity>
            {uploading && <Text>{`${uploadProgress}%`}</Text>}
          </View>
          <View style={styles.infoFieldContainer}>
            <InfoField
              id="displayName"
              label="Display Name"
              value={
                currentUser.displayName ? currentUser.displayName : NOT_SET
              }
              onPress={onPressField}
            />
            <InfoField
              id="firstName"
              label="First Name"
              value={
                additionaDetails.firstName
                  ? additionaDetails.firstName
                  : NOT_SET
              }
              onPress={onPressField}
            />
            <InfoField
              id="lastName"
              label="Last Name"
              value={
                additionaDetails.lastName ? additionaDetails.lastName : NOT_SET
              }
              onPress={onPressField}
            />
          </View>
          <View style={styles.signOutButtonSection}>
            <Button label="Sign out" onClick={onPressSignOut} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaView>
  );
};

Profile.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default Profile;
