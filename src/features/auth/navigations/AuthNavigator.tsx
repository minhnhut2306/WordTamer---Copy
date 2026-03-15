import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthScreenNames } from './auth-screen-names';
import LoginScreen from '../screens/login/LoginScreen';

const AuthNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name={AuthScreenNames.LoginScreen}
        component={LoginScreen}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
