import 'react-native-gesture-handler';

import React, {createContext, useContext, useEffect, useState} from 'react';
import InAppNavigation from './app/navigation/InAppNavigation';
import AppNavigator from './app/navigation/AppNavigator';
import {LogBox} from 'react-native';
import auth from '@react-native-firebase/auth';
import {
  AuthContext,
  AuthProvider,
} from './app/contexts/AuthContext/AuthContext';

LogBox.ignoreLogs(["exported from 'deprecated-react-native-prop-types'."]);

export const UserContext = createContext();

const App = () => {
  // const {user, setUser} = useContext(UserContext);
  const [user, setUser] = useState();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(theUser => {
      // console.log(user);
      setUser(theUser);
      // console.log('here: ' + JSON.stringify(currentUser));
    });
    auth()
      .signInAnonymously()
      .then(res => {
        console.log('User signed in anonymously');
        setUser(res.user);
      })
      .catch(error => {
        if (error.code === 'auth/operation-not-allowed') {
          console.log('Enable anonymous in your firebase console.');
        }

        console.error(error);
      });

    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle user state changes
  function onAuthStateChanged(user) {
    JSON.stringify(user, null, 2);
    setUser(user);
  }
  return (
    <UserContext.Provider value={{currentUser: user, setCurrentUser: setUser}}>
      <AppNavigator />
    </UserContext.Provider>
  );
};

export default App;
