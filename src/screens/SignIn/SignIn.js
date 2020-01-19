import React from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, View, KeyboardAvoidingView } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Input, Button } from '../../components';
import styles from './SignIn.style';
import { useAuth } from '../../context/auth';

const SignIn = ({ navigation }) => {
  const auth = useAuth();

  const onPressSignIn = values => {
    auth.signin(values.email, values.password);
  };

  if (auth.user) {
    navigation.navigate('App');
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email('Should be a valid email')
        .required('Email is required'),
      password: Yup.string().required('Password is required'),
    }),
    onSubmit: onPressSignIn,
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
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView style={styles.keyboardAvoidingView}>
        <Input
          id="email"
          label="Email"
          placeholder=""
          keyboardType="email-address"
          onChange={handleChange('email')}
          onBlur={handleBlur('email')}
          value={values.email}
          error={touched.email && errors.email && errors.email.toString()}
        />
        <Input
          id="password"
          label="Password"
          placeholder=""
          secureTextEntry
          onChange={handleChange('password')}
          onBlur={handleBlur('password')}
          value={values.password}
          error={
            touched.password && errors.password && errors.password.toString()
          }
        />
        <View style={styles.buttonContainer}>
          <Button label="Sign In" onClick={handleSubmit} disabled={!isValid} />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

SignIn.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default SignIn;
