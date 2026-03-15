import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Typography } from '@/components/typography';
import { Colors } from '@/theme/colors';
import { MemDots } from './MemDots';

export type MemoryLabel = 'Mới học' | 'Đang học' | 'Thành thạo';

export const getMemoryLabel = (level: number): MemoryLabel => {
  if (level === 0) return 'Mới học';
  if (level >= 4) return 'Thành thạo';
  return 'Đang học';
};

type Props = {
  level: number;
  showDots?: boolean;
  showBadge?: boolean;
};

export const MemBadge = ({ level, showDots = true, showBadge = true }: Props) => {
  const label = getMemoryLabel(level);

  const labelColor =
    label === 'Thành thạo'
      ? Colors.success
      : label === 'Đang học'
      ? Colors.goldDark
      : Colors.purple600;

  const labelBg =
    label === 'Thành thạo'
      ? Colors.successSoft
      : label === 'Đang học'
      ? Colors.goldSoft
      : Colors.purple100;

  return (
    <View style={styles.row}>
      {showDots && <MemDots level={level} />}
      {showBadge && (
        <View style={[styles.badge, { backgroundColor: labelBg }]}>
          <Typography style={[styles.badgeText, { color: labelColor }]}>
            {label}
          </Typography>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  badge: {
    borderRadius: 6,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '900',
  },
});