import React, { useRef } from 'react';
import {
  View,
  Image,
  ScrollView,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Animated,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Typography } from '@/components/typography';
import { Colors } from '@/theme/colors';
import { MainScreenNames } from '../../navigations/main-screen-names';
import { StatsLeft, SettingsRight } from '@/components/StatsBar/StatsBar';
import { MysteryPet } from '@/components/MysteryPet/MysteryPet';
import { JOURNEYS, JourneyItem } from '../../data/data';
import { styles } from './styles';

const icons = {
  pet: require('@/assets/icons/pet01.png'),
};

type NavProp = NativeStackNavigationProp<any>;

// ─── Journey Card ──────────────────────────────────────────────────────────────
const JourneyCard = ({ item }: { item: JourneyItem }) => {
  const navigation = useNavigation<NavProp>();
  const scale = useRef(new Animated.Value(1)).current;
  const isLocked = item.state === 'locked';
  const isCompleted = item.state === 'completed';
  const pct = item.total > 0 ? (item.progress / item.total) * 100 : 0;

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <Pressable
        onPress={() => {
          if (isLocked) return;
          navigation.navigate(MainScreenNames.JourneyDetailScreen as any, {
            id: item.id,
            name: item.name,
            color: item.color,
            softColor: item.softColor,
            darkColor: item.darkColor,
            progress: item.progress,
            total: item.total,
            petReward: item.petReward,
            petName: item.petName,
          });
        }}
        onPressIn={() =>
          Animated.spring(scale, { toValue: 0.97, useNativeDriver: true }).start()
        }
        onPressOut={() =>
          Animated.spring(scale, { toValue: 1, useNativeDriver: true }).start()
        }
        style={[styles.card, { borderColor: item.color + '44' }]}
      >
        {/* Top */}
        <View style={[styles.cardTop, { backgroundColor: item.softColor }]}>
          <View style={{ flex: 1 }}>
            <Typography
              variant="subtitle"
              weight="bold"
              color={item.darkColor}
              style={{ letterSpacing: 1, marginBottom: 2 }}
            >
              {item.name}
            </Typography>
            <Typography variant="caption" color={item.color}>
              {item.subtitle}
            </Typography>
            {!isLocked && (
              <View style={[styles.progTrack, { marginTop: 8 }]}>
                <View
                  style={[
                    styles.progFill,
                    { width: `${pct}%` as any, backgroundColor: item.color },
                  ]}
                />
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

          {isLocked && (
            <View style={StyleSheet.absoluteFill} pointerEvents="none" />
          )}
        </View>

        {/* Bottom */}
        <View style={[styles.cardBottom, { backgroundColor: item.color }]}>
          <Typography
            variant="caption"
            color="rgba(255,255,255,0.8)"
            style={{ fontStyle: 'italic' }}
          >
            {isCompleted ? item.petName : 'Chinh phục để khám phá'}
          </Typography>
          <View style={[styles.badge, { backgroundColor: item.darkColor }]}>
            <Typography variant="caption" weight="bold" color={Colors.white}>
              {item.badge}
            </Typography>
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
};

// ─── Screen ────────────────────────────────────────────────────────────────────
const JourneyScreen = () => (
  <SafeAreaView style={styles.container}>
    <StatusBar backgroundColor={Colors.purple800} barStyle="light-content" />

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
          <Typography
            variant="caption"
            weight="bold"
            color={Colors.purple200}
            style={{ letterSpacing: 2, fontSize: 10 }}
          >
            HÀNH TRÌNH CỦA BẠN
          </Typography>
          <Typography variant="title" weight="bold" color={Colors.white}>
            WordTamer
          </Typography>
        </View>
      </View>
    </View>

    <ScrollView
      style={{ flex: 1 }}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={{ height: 12 }} />
      {JOURNEYS.map(item => (
        <JourneyCard key={item.id} item={item} />
      ))}
      <View style={{ height: 24 }} />
    </ScrollView>
  </SafeAreaView>
);

export default JourneyScreen;