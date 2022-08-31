import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import InAppNavigation from './InAppNavigation';
import {ActivityIndicator, Alert, View} from 'react-native';
import {asyncStorageGet} from '../utils/StorageManager';
import {chooseLanguage} from '../utils/TraslationManager';
import AuthNavigator from './AuthNavigator';
import {blue} from '../theme/colors';

const AppNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [noInitialLanguage, setNoInitialLanguage] = useState(false);

  useEffect(() => {
    initializeApp();
  }, []);

  // const checkIsUserLoggedIn = async () => {
  //   await handleUserLanguage();
  //   const token = await asyncStorageGet('accessToken');
  //   if (token) {
  //     refreshSession();
  //     setIsLoggedIn(true);
  //   }
  //   setIsLoading(false);
  // };

  const initializeApp = async () => {
    await handleUserLanguage();
    setIsLoading(false);
  };

  const handleUserLanguage = async () => {
    const lang = await asyncStorageGet('language');
    if (lang) {
      await chooseLanguage(lang);
    } else {
      // await chooseLanguage('en');
      setNoInitialLanguage(true);
    }
  };

  return (
    // <AuthContext.Provider value={{isLoggedIn, setIsLoggedIn}}>
    <NavigationContainer>
      {isLoading ? (
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color={blue} />
        </View>
      ) : (
        <InAppNavigation />
        // ) : isLoggedIn ? (
        //   <InAppNavigation />
        // ) : (
        //   <AuthNavigator initialRoute={'InitialLanguageChoice'} />
      )}
    </NavigationContainer>
    // </AuthContext.Provider>
  );
};

export default AppNavigator;
