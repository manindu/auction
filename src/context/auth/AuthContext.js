import React, { createContext } from 'react';
import PropTypes from 'prop-types';
import useSetupAuth from './useSetupAuth';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const auth = useSetupAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]).isRequired,
};

export default AuthContext;

export { AuthProvider };
