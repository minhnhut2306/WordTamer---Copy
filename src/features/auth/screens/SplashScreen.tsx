import React, { useEffect, useRef } from 'react';
import { View, Image, StyleSheet, SafeAreaView, Animated } from 'react-native';
import { Typography } from '@/components/typography';
import { Colors } from '@/theme/colors';
import LinearGradient from 'react-native-linear-gradient';

const SplashScreen = () => {
  const logoScale   = useRef(new Animated.Value(0)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const subOpacity  = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.spring(logoScale,   { toValue: 1, friction: 5, tension: 100, useNativeDriver: true }),
        Animated.timing(logoOpacity, { toValue: 1, duration: 500, useNativeDriver: true }),
      ]),
      Animated.timing(titleOpacity, { toValue: 1, duration: 400, delay: 100, useNativeDriver: true }),
      Animated.timing(subOpacity,   { toValue: 1, duration: 400, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <LinearGradient
      colors={[Colors.purple900, Colors.purple800, Colors.purple600]}
      start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      {/* Decorative circles */}
      <View style={[styles.decorCircle, { width: 300, height: 300, top: -100, right: -80, opacity: 0.08 }]} />
      <View style={[styles.decorCircle, { width: 200, height: 200, bottom: 50, left: -60, opacity: 0.06 }]} />

      {/* Star dots */}
      {Array.from({ length: 20 }).map((_, i) => (
        <View
          key={i}
          style={[styles.starDot, {
            top:  `${Math.random() * 100}%` as any,
            left: `${Math.random() * 100}%` as any,
            width:  Math.random() * 4 + 2,
            height: Math.random() * 4 + 2,
            opacity: Math.random() * 0.4 + 0.1,
          }]}
        />
      ))}

      <View style={styles.center}>
        {/* Logo */}
        <Animated.View style={[styles.logoWrap, { transform: [{ scale: logoScale }], opacity: logoOpacity }]}>
          <View style={styles.logoRing1} />
          <View style={styles.logoRing2} />
          <View style={styles.logoInner}>
            <Image
              source={require('@/assets/icons/pet.png')}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>
        </Animated.View>

        {/* Title */}
        <Animated.View style={{ opacity: titleOpacity, alignItems: 'center' }}>
          <Typography variant="h1" weight="bold" color={Colors.white} style={styles.title}>
            WordTamer
          </Typography>
          <View style={styles.titleUnderline} />
        </Animated.View>

        {/* Tagline */}
        <Animated.View style={{ opacity: subOpacity }}>
          <Typography variant="bodySmall" color={Colors.purple300} style={styles.tagline}>
            Thu thập từ vựng · Chinh phục sinh vật
          </Typography>
        </Animated.View>
      </View>

      {/* Bottom mystery badge */}
      <Animated.View style={[styles.bottomBadge, { opacity: subOpacity }]}>
        <View style={styles.mystDot} />
        <Typography variant="caption" color={Colors.purple300}>
          Sinh vật bí ẩn đang chờ bạn khám phá...
        </Typography>
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  decorCircle: {
    position: 'absolute', borderRadius: 999,
    backgroundColor: Colors.white,
  },
  starDot: {
    position: 'absolute', borderRadius: 99,
    backgroundColor: Colors.purple300,
  },
  center: {
    flex: 1, alignItems: 'center', justifyContent: 'center', gap: 20,
  },
  logoWrap: { alignItems: 'center', justifyContent: 'center', position: 'relative', marginBottom: 8 },
  logoRing1: {
    position: 'absolute', width: 130, height: 130, borderRadius: 65,
    borderWidth: 1.5, borderColor: 'rgba(196,181,253,0.3)',
  },
  logoRing2: {
    position: 'absolute', width: 160, height: 160, borderRadius: 80,
    borderWidth: 1, borderColor: 'rgba(196,181,253,0.15)',
  },
  logoInner: {
    width: 110, height: 110, borderRadius: 55,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: 'rgba(196,181,253,0.3)',
  },
  logo: { width: 70, height: 70 },
  title: { letterSpacing: 2, marginBottom: 8 },
  titleUnderline: {
    width: 60, height: 2, borderRadius: 1,
    backgroundColor: Colors.gold, opacity: 0.8,
  },
  tagline: {
    textAlign: 'center', fontStyle: 'italic',
    letterSpacing: 0.5, marginTop: 4,
  },
  bottomBadge: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    justifyContent: 'center', paddingBottom: 36,
  },
  mystDot: {
    width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.gold, opacity: 0.7,
  },
});

export default SplashScreen;