import React from 'react';
import { View, StyleSheet, Pressable, Image } from 'react-native';
import { Typography } from '@/components/typography';
import { Colors } from '@/theme/colors';

const icons = {
  diamond: require('@/assets/icons/diamond.png'),
  lightning: require('@/assets/icons/lightning.png'),
  settings: require('@/assets/icons/setting.png'),
};

export const StatsLeft = () => (
  <View style={styles.statsLeft}>
    <View style={styles.statPill}>
      <Image source={icons.diamond} style={styles.statIcon} />
      <Typography variant="caption" weight="bold" color={Colors.textBrown}>1,250</Typography>
    </View>
    <View style={styles.statPill}>
      <Image source={icons.lightning} style={styles.statIcon} />
      <Typography variant="caption" weight="bold" color={Colors.textBrown}>45</Typography>
    </View>
  </View>
);

export const SettingsRight = () => (
  <Pressable style={styles.settingsBtn}>
    <Image source={icons.settings} style={styles.settingsIcon} />
  </Pressable>
);

const styles = StyleSheet.create({
  statsLeft: { flexDirection: 'row', gap: 8 },
  statPill: {
    flexDirection: 'row', alignItems: 'center', gap: 4,
    backgroundColor: Colors.white, borderRadius: 20,
    paddingHorizontal: 10, paddingVertical: 6,
    shadowColor: Colors.pink, shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12, shadowRadius: 4, elevation: 2,
  },
  statIcon: { width: 16, height: 16 },
  settingsBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: Colors.white, alignItems: 'center', justifyContent: 'center',
    shadowColor: Colors.pink, shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.12, shadowRadius: 4, elevation: 2,
  },
  settingsIcon: { width: 20, height: 20 },
});
