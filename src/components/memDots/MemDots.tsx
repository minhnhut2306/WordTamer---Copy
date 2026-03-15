import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors } from '@/theme/colors';

type Props = {
  level: number;
  size?: number;
};

export const MemDots = ({ level, size = 9 }: Props) => (
  <View style={styles.row}>
    {Array.from({ length: 5 }).map((_, i) => (
      <View
        key={i}
        style={[
          styles.dot,
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor:
              i < level
                ? Colors.purple500
                : i === level
                ? Colors.gold
                : Colors.purple100,
          },
        ]}
      />
    ))}
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: 4,
  },
  dot: {
    // width/height/borderRadius set dynamically via size prop
  },
});