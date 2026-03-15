import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from '@/components/typography';
import { Colors } from '@/theme/colors';

// ─── XP Pill ─────────────────────────────────────────────────────────────────
type XPPillProps = {
  xp: number;
  variant?: 'dark' | 'light';
};

export const XPPill = ({ xp, variant = 'dark' }: XPPillProps) => (
  <View style={[styles.xpPill, variant === 'light' && styles.xpPillLight]}>
    <Typography variant="caption" weight="bold" color={Colors.gold}>
      {xp} XP
    </Typography>
  </View>
);

// ─── Combo Badge ──────────────────────────────────────────────────────────────
type ComboBadgeProps = {
  count: number;
};

export const ComboBadge = ({ count }: ComboBadgeProps) => {
  if (count <= 0) return null;
  return (
    <View style={styles.comboBadge}>
      <Typography variant="caption" weight="bold" color={Colors.goldDark}>
        {count} liên tiếp
      </Typography>
    </View>
  );
};

// ─── Gold Tag (label nhỏ vàng) ────────────────────────────────────────────────
type GoldTagProps = {
  label: string;
};

export const GoldTag = ({ label }: GoldTagProps) => (
  <View style={styles.goldTag}>
    <Typography variant="caption" weight="bold" color={Colors.goldDark}>
      {label}
    </Typography>
  </View>
);

const styles = StyleSheet.create({
  xpPill: {
    backgroundColor: 'rgba(245,158,11,0.18)',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: Colors.gold + '55',
  },
  xpPillLight: {
    backgroundColor: Colors.goldSoft,
    borderColor: Colors.gold,
  },
  comboBadge: {
    backgroundColor: Colors.goldSoft,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1.5,
    borderColor: Colors.gold,
  },
  goldTag: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.goldSoft,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: Colors.gold + '55',
  },
});