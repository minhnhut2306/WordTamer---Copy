import React from 'react';
import { View, Image, StyleSheet, SafeAreaView } from 'react-native';

import { Typography } from '@/components/typography';
import { Colors } from '@/theme/colors';


const SplashScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image
          source={require('@/assets/icons/pet.png')}
          style={styles.logo}
        />
        <Typography variant="h1" weight="bold" color={Colors.white}>
          WordTamer
        </Typography>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.purpleDark,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 24,
    resizeMode: 'contain',
  },
});

export default SplashScreen;
