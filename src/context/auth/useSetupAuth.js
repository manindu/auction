import { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';

const useSetupAuth = () => {
  const [user, setUser] = useState(null);

  console.log(user);

  const signin = (email, password) => {
    console.log(email, password);
    return auth()
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        console.log(response);
        return response.user;
      })
      .catch(err => console.log(err));
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
        setUser(loggedInUser._user);
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
