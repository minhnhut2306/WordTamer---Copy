import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from '@/features/auth/navigations/AuthNavigator';
import MainNavigator from '@/features/main/navigations/MainNavigator';
import SplashScreen from '@/features/auth/screens/SplashScreen';
import { RootNames } from './root-names';

const Stack = createNativeStackNavigator();

export const RootNavigator = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // simulate async startup work (token fetch, resources, etc.)
    const timer = setTimeout(() => {
      // after splash, always go into main flow (Journey) for now
      setIsLoggedIn(true);
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <SplashScreen />; // show splash while we decide where to go
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        <Stack.Screen name={RootNames.Main} component={MainNavigator} />
      ) : (
        <Stack.Screen name={RootNames.Auth} component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};
