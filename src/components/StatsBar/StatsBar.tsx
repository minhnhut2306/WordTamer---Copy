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
      <Image source={icons.diamond} style={[styles.statIcon, { tintColor: '#67E8F9' }]} />
      <Typography variant="caption" weight="bold" color={Colors.textOnDark}>
        1,250
      </Typography>
    </View>
    <View style={styles.statPill}>
      <Image source={icons.lightning} style={[styles.statIcon, { tintColor: Colors.gold }]} />
      <Typography variant="caption" weight="bold" color={Colors.textOnDark}>
        45
      </Typography>
    </View>
  </View>
);

export const SettingsRight = () => (
  <Pressable style={styles.settingsBtn}>
    <Image source={icons.settings} style={[styles.settingsIcon, { tintColor: 'rgba(255,255,255,0.85)' }]} />
  </Pressable>
);

// Variant for light-background screens (JourneyDetailScreen, etc.)
export const StatsLeftLight = () => (
  <View style={styles.statsLeft}>
    <View style={styles.statPillLight}>
      <Image source={icons.diamond} style={[styles.statIcon, { tintColor: '#67E8F9' }]} />
      <Typography variant="caption" weight="bold" color={Colors.textDark}>
        1,250
      </Typography>
    </View>
    <View style={styles.statPillLight}>
      <Image source={icons.lightning} style={[styles.statIcon, { tintColor: Colors.gold }]} />
      <Typography variant="caption" weight="bold" color={Colors.textDark}>
        45
      </Typography>
    </View>
  </View>
);

export const SettingsRightLight = () => (
  <Pressable style={styles.settingsBtnLight}>
    <Image source={icons.settings} style={[styles.settingsIcon, { tintColor: Colors.purple500 }]} />
  </Pressable>
);

const styles = StyleSheet.create({
  statsLeft: {
    flexDirection: 'row',
    gap: 8,
  },

  // Dark variant (for headers on purple gradient bg)
  statPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
  },
  settingsBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.22)',
  },

  // Light variant (for white/light bg screens)
  statPillLight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: Colors.white,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    shadowColor: Colors.purple500,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  settingsBtnLight: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.purple500,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },

  statIcon: { width: 14, height: 14 },
  settingsIcon: { width: 18, height: 18 },
});