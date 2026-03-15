import React, { useRef, useEffect } from 'react';
import { View, Image, StyleSheet, Animated, Easing } from 'react-native';
import { Typography } from '@/components/typography';
import { Colors } from '@/theme/colors';

type Props = {
  petImage: any;
  isCompleted: boolean;
  isActive?: boolean;
  color: string;
  progress: number;
  total: number;
  /** Size của circle (default 52) */
  size?: number;
};

export const MysteryPet = ({
  petImage,
  isCompleted,
  isActive = true,
  color,
  progress,
  total,
  size = 52,
}: Props) => {
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!isActive || isCompleted) return;
    const anim = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1800,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );
    anim.start();
    return () => anim.stop();
  }, [isActive, isCompleted]);

  const ringScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.7] });
  const ringOpacity = pulse.interpolate({
    inputRange: [0, 0.4, 1],
    outputRange: [0.5, 0.2, 0],
  });

  const imgSize = size * 0.65;

  return (
    <View style={styles.wrap}>
      <View style={[styles.petZone, { width: size + 8, height: size + 8 }]}>
        {isActive && !isCompleted && (
          <Animated.View
            style={[
              styles.ring,
              {
                width: size,
                height: size,
                borderRadius: size / 2,
                borderColor: color,
                transform: [{ scale: ringScale }],
                opacity: ringOpacity,
              },
            ]}
          />
        )}
        <View
          style={[
            styles.circle,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              backgroundColor: isCompleted ? color + '22' : Colors.bgMystery,
              borderColor: isCompleted ? color + 'AA' : 'rgba(192,132,252,0.45)',
            },
          ]}
        >
          {isCompleted ? (
            <Image source={petImage} style={{ width: imgSize, height: imgSize }} />
          ) : (
            <>
              <Image
                source={petImage}
                style={[
                  styles.shadow,
                  { width: imgSize, height: imgSize, tintColor: color },
                ] as any}
              />
              <Typography style={styles.qqq}>???</Typography>
            </>
          )}
        </View>
      </View>

      <View
        style={[
          styles.badge,
          {
            backgroundColor: isCompleted ? Colors.successSoft : color + '22',
            borderColor: isCompleted ? Colors.success + '66' : color + '55',
          },
        ]}
      >
        <Typography
          style={[
            styles.badgeText,
            { color: isCompleted ? Colors.success : color },
          ]}
        >
          {isCompleted ? 'Đã mở' : `${progress}/${total} từ`}
        </Typography>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    gap: 5,
  },
  petZone: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ring: {
    position: 'absolute',
    borderWidth: 1.5,
  },
  circle: {
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  shadow: {
    position: 'absolute',
    opacity: 0.25,
  },
  qqq: {
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 2,
    color: Colors.textPlaceholder,
  },
  badge: {
    borderRadius: 7,
    paddingHorizontal: 7,
    paddingVertical: 2,
    borderWidth: 1,
  },
  badgeText: {
    fontSize: 9,
    fontWeight: '900',
  },
});