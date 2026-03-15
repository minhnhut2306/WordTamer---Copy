import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/home/HomeScreen';
import ConquestScreen from '../screens/conquest/ConquestScreen';
import JourneyScreen from '../screens/journey/JourneyScreen';
import JourneyDetailScreen from '../screens/journey/JourneyDetailScreen';
import { MainScreenNames } from './main-screen-names';

const MainNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={MainScreenNames.JourneyScreen} component={JourneyScreen} />
      <Stack.Screen
        name={MainScreenNames.JourneyDetailScreen}
        component={JourneyDetailScreen}
        options={{ animationDuration: 200 }}
      />
      <Stack.Screen 
        name={MainScreenNames.ConquestScreen} 
        component={ConquestScreen}
        options={{ animationDuration: 200 }}
      />
      <Stack.Screen name={MainScreenNames.HomeScreen} component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
