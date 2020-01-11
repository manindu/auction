import { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';

const useSetupAuth = () => {
  const [user, setUser] = useState(null);

  const signin = async (email, password) => {
    return auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        return response.user;
      });
  };

  const signup = (email, password) => {
    return auth()
      .createUserWithEmailAndPassword(email, password)
      .then(response => {
        return response.user;
      });
  };

  const signout = () => {
    return auth()
      .signOut()
      .then(() => {
        setUser(null);
      });
  };

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(loggedInUser => {
      if (loggedInUser) {
        setUser(loggedInUser);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    signin,
    signup,
    signout,
  };
};

export default useSetupAuth;
