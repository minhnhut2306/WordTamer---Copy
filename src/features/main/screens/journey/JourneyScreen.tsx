import React, { useRef, useEffect } from 'react';
import {
  View, Image, ScrollView, Pressable, SafeAreaView,
  StatusBar, StyleSheet, Animated, Easing,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Typography } from '@/components/typography';
import { Colors } from '@/theme/colors';
import { MainScreenNames } from '../../navigations/main-screen-names';
import { StatsLeft, SettingsRight } from '@/components/StatsBar/StatsBar';
import { JOURNEYS, JourneyItem } from '../../data/data';

const icons = {
  play: require('@/assets/icons/play.png'),
  lock: require('@/assets/icons/lock.png'),
  pet:  require('@/assets/icons/pet01.png'),
};

type NavProp = NativeStackNavigationProp<any>;

// ─── Mystery silhouette ────────────────────────────────────────────────────────
const MysteryPet = ({
  petImage, isCompleted, isActive, color, progress, total,
}: {
  petImage: any; isCompleted: boolean; isActive: boolean;
  color: string; progress: number; total: number;
}) => {
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!isActive || isCompleted) return;
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 1800, easing: Easing.out(Easing.ease), useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 0, useNativeDriver: true }),
      ])
    ).start();
  }, [isActive, isCompleted]);

  const ringScale   = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.7] });
  const ringOpacity = pulse.interpolate({ inputRange: [0, 0.4, 1], outputRange: [0.5, 0.2, 0] });

  return (
    <View style={sil.wrap}>
      {isActive && !isCompleted && (
        <Animated.View style={[sil.ring, { borderColor: color, transform: [{ scale: ringScale }], opacity: ringOpacity }]} />
      )}
      <View style={[sil.circle, {
        backgroundColor: isCompleted ? color + '22' : '#12062A',
        borderColor:     isCompleted ? color + 'AA' : 'rgba(192,132,252,0.45)',
      }]}>
        {isCompleted
          ? <Image source={petImage} style={sil.petImg} />
          : <>
              <Image source={petImage} style={[sil.shadow, { tintColor: color, opacity: 0.25 }]} />
              <Typography style={[sil.qqq, { color: '#E9D5FF' }]}>???</Typography>
            </>
        }
      </View>
      <View style={[sil.badge, {
        backgroundColor: isCompleted ? Colors.successSoft : color + '22',
        borderColor:     isCompleted ? Colors.success + '66' : color + '55',
      }]}>
        <Typography style={[sil.badgeText, { color: isCompleted ? Colors.success : color }]}>
          {isCompleted ? 'Da mo' : `${progress}/${total} tu`}
        </Typography>
      </View>
    </View>
  );
};

const sil = StyleSheet.create({
  wrap:      { alignItems: 'center', gap: 5 },
  ring:      { position: 'absolute', width: 52, height: 52, borderRadius: 26, borderWidth: 1.5 },
  circle:    { width: 52, height: 52, borderRadius: 26, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  petImg:    { width: 34, height: 34 },
  shadow:    { width: 34, height: 34, position: 'absolute' },
  qqq:       { fontSize: 12, fontWeight: '900', letterSpacing: 2 },
  badge:     { borderRadius: 7, paddingHorizontal: 7, paddingVertical: 2, borderWidth: 1 },
  badgeText: { fontSize: 9, fontWeight: '900' },
});

// ─── Journey Card ──────────────────────────────────────────────────────────────
const JourneyCard = ({ item }: { item: JourneyItem }) => {
  const navigation = useNavigation<NavProp>();
  const scale      = useRef(new Animated.Value(1)).current;
  const isLocked   = item.state === 'locked';
  const isCompleted= item.state === 'completed';
  const pct        = item.total > 0 ? (item.progress / item.total) * 100 : 0;

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPress={() => {
          if (isLocked) return;
          navigation.navigate(MainScreenNames.JourneyDetailScreen as any, {
            id: item.id, name: item.name, color: item.color,
            softColor: item.softColor, darkColor: item.darkColor,
            progress: item.progress, total: item.total,
            petReward: item.petReward, petName: item.petName,
          });
        }}
        onPressIn={() => Animated.spring(scale, { toValue: 0.97, useNativeDriver: true }).start()}
        onPressOut={() => Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start()}
        style={[styles.card, { borderColor: item.color + '44' }]}
      >
        {/* Top */}
        <View style={[styles.cardTop, { backgroundColor: item.softColor }]}>
          <View style={{ flex: 1 }}>
            <Typography variant="subtitle" weight="bold" color={item.darkColor} style={{ letterSpacing: 1, marginBottom: 2 }}>
              {item.name}
            </Typography>
            <Typography variant="caption" color={item.color}>{item.subtitle}</Typography>
            {!isLocked && (
              <View style={[styles.progTrack, { marginTop: 8 }]}>
                <View style={[styles.progFill, { width: `${pct}%` as any, backgroundColor: item.color }]} />
              </View>
            )}
          </View>
          <MysteryPet
            petImage={item.petReward}
            isCompleted={isCompleted}
            isActive={!isLocked}
            color={item.color}
            progress={item.progress}
            total={item.total}
          />
          {isLocked && <View style={StyleSheet.absoluteFill} pointerEvents="none" />}
        </View>

        {/* Bottom */}
        <View style={[styles.cardBottom, { backgroundColor: item.color }]}>
          <Typography variant="caption" color="rgba(255,255,255,0.8)" style={{ fontStyle: 'italic' }}>
            {isCompleted ? item.petName : 'Chinh phuc de kham pha'}
          </Typography>
          <View style={[styles.badge, { backgroundColor: item.darkColor }]}>
            <Typography variant="caption" weight="bold" color={Colors.white}>{item.badge}</Typography>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
};

// ─── Screen ────────────────────────────────────────────────────────────────────
const JourneyScreen = () => (
  <SafeAreaView style={styles.container}>
    <StatusBar backgroundColor="#4A0E8F" barStyle="light-content" />

    <View style={styles.header}>
      <View style={styles.headerTop}>
        <StatsLeft />
        <SettingsRight />
      </View>
      <View style={styles.headerTitle}>
        <View style={styles.petCircle}>
          <Image source={icons.pet} style={{ width: 28, height: 28 }} />
        </View>
        <View style={{ flex: 1 }}>
          <Typography variant="caption" weight="bold" color="rgba(240,171,252,0.8)" style={{ letterSpacing: 2, fontSize: 10 }}>
            HANH TRINH CUA BAN
          </Typography>
          <Typography variant="title" weight="bold" color={Colors.white}>WordTamer</Typography>
        </View>
      </View>
    </View>

    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ height: 12 }} />
      {JOURNEYS.map(item => <JourneyCard key={item.id} item={item} />)}
      <View style={{ height: 24 }} />
    </ScrollView>
  </SafeAreaView>
);

export default JourneyScreen;

// ─── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container:     { flex: 1, backgroundColor: Colors.bgPage },

  header:        { paddingHorizontal: 18, paddingTop: 8, paddingBottom: 22, zIndex: 2, backgroundColor: '#4A0E8F' },
  headerTop:     { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  headerTitle:   { flexDirection: 'row', alignItems: 'center', gap: 12 },
  petCircle:     { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center', borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.25)' },

  scrollContent: { paddingHorizontal: 16, gap: 12 },

  card:          { borderRadius: 20, borderWidth: 1.5, overflow: 'hidden', shadowColor: '#7E22CE', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.12, shadowRadius: 12, elevation: 5 },
  cardTop:       { flexDirection: 'row', alignItems: 'center', gap: 14, paddingVertical: 16, paddingHorizontal: 16 },
  progTrack:     { height: 4, backgroundColor: 'rgba(0,0,0,0.08)', borderRadius: 2, overflow: 'hidden' },
  progFill:      { height: '100%', borderRadius: 2 },
  cardBottom:    { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 16 },
  badge:         { borderRadius: 10, paddingHorizontal: 10, paddingVertical: 4 },
});