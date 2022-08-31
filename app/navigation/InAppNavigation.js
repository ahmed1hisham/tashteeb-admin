import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Home from '../screens/Home/Home';
import Profile from '../screens/Profile/Profile';
import {NavigationContainer} from '@react-navigation/native';
import Settings from '../screens/Settings/Settings';
import {asyncStorageGet} from '../utils/StorageManager';
import {chooseLanguage} from '../utils/TraslationManager';
import InitialLanguageChoice from '../screens/initialLanguageChoice/InitialLanguageChoice';
import ProfessionalsList from '../screens/ProfessionalsList/ProfessionalsList';
import BookingForm from '../screens/BookingForm/BookingForm';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {primary} from '../theme/colors';
import I18n from 'i18n-js';
import Requests from '../screens/Requests/Requests';
import RequestDetails from '../screens/RequestDetails/RequestDetails';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const InAppNavigation = props => {
  const [initalScreen, setInitialScreen] = useState('Home');

  // useEffect(() => {
  //   handleUserLanguage();
  // }, []);

  // const handleUserLanguage = async () => {
  //   const lang = await asyncStorageGet('language');
  //   if (lang) {
  //     await chooseLanguage(lang);
  //   } else {
  //     // await chooseLanguage('en');
  //     // setInitialScreen('InitialLanguageChoice');
  //     // props.navigation.navigate('InitialLanguageChoice');
  //   }
  // };

  return (
    <Tab.Navigator
      screenOptions={{headerShown: false, tabBarActiveTintColor: primary}}>
      <Tab.Screen
        name={I18n.t('navbar.requests')}
        component={HomeStack}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Icon name="dynamic-feed" size={28} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name={I18n.t('navbar.history')}
        component={Requests}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Icon name="history" size={28} color={color} />
          ),
        }}
      />
      {/* <Tab.Screen
        name={I18n.t('navbar.settings')}
        component={Settings}
        options={{
          tabBarIcon: ({focused, color}) => (
            <Icon name="settings" size={28} color={color} />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName={'Categories'}>
      <Stack.Screen
        name="Categories"
        component={Home}
        options={{headerTitle: 'Categories', headerShown: false}}
      />
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerTitle: 'Profile', headerShown: false}}
      />
      <Stack.Screen
        name="RequestDetails"
        component={RequestDetails}
        options={{headerTitle: 'RequestDetails', headerShown: false}}
      />
      <Stack.Screen
        name="ProfessionalsList"
        component={ProfessionalsList}
        options={{headerTitle: 'Professionals List', headerShown: false}}
      />
      <Stack.Screen
        name="BookingForm"
        component={BookingForm}
        options={{headerTitle: 'BookingForm', headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default InAppNavigation;
