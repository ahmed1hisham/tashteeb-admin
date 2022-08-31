import React, {useEffect, useState} from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import InitialLanguageChoice from '../screens/initialLanguageChoice/InitialLanguageChoice';

const AuthNavigator = props => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName={props.initialRoute}
      screenOptions={{headerShown: false}}>
      <Stack.Screen
        name="InitialLanguageChoice"
        component={InitialLanguageChoice}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
