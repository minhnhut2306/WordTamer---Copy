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
import { SettingsRight } from '@/components/StatsBar/StatsBar';
import { JOURNEYS, WORDS_BY_JOURNEY, WordItem, getMemoryLabel } from '../../data/data';

const icons = {
  check: require('@/assets/icons/check.png'),
  back:  require('@/assets/icons/back.png'),
};

type NavProp = NativeStackNavigationProp<any>;

const journey     = JOURNEYS[0];
const words       = WORDS_BY_JOURNEY[journey.id] ?? [];
const completedCt = words.filter(w => w.completed).length;

// ─── Memory dots ───────────────────────────────────────────────────────────────
const MemDots = ({ level }: { level: number }) => (
  <View style={{ flexDirection: 'row', gap: 4 }}>
    {Array.from({ length: 5 }).map((_, i) => (
      <View key={i} style={[styles.dot, {
        backgroundColor: i < level ? Colors.purple500 : i === level ? Colors.gold : Colors.purple100,
      }]} />
    ))}
  </View>
);

// ─── Word row ─────────────────────────────────────────────────────────────────
const WordRow = ({ item }: { item: WordItem }) => {
  const label      = getMemoryLabel(item.memoryLevel);
  const labelColor = label === 'Thành thạo' ? Colors.success    : label === 'Đang học' ? Colors.goldDark  : Colors.purple600;
  const labelBg    = label === 'Thành thạo' ? Colors.successSoft : label === 'Đang học' ? Colors.goldSoft : Colors.purple100;

  return (
    <View style={styles.wordRow}>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8, marginBottom: 3 }}>
          <Typography variant="bodySmall" weight="bold" color={Colors.purple900}>{item.word}</Typography>
          <Typography variant="caption" color={Colors.purple400} style={{ fontStyle: 'italic' }}>{item.phonetic}</Typography>
        </View>
        <Typography variant="caption" weight="bold" color={Colors.textMid} style={{ marginBottom: 6 }}>
          {item.translation}
        </Typography>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <MemDots level={item.memoryLevel} />
          <View style={[styles.memTag, { backgroundColor: labelBg }]}>
            <Typography style={{ fontSize: 9, fontWeight: '900', color: labelColor }}>{label}</Typography>
          </View>
        </View>
      </View>
      <View style={[styles.checkCircle,
        item.completed
          ? { backgroundColor: Colors.purple500, borderColor: Colors.purple500 }
          : { backgroundColor: Colors.white, borderColor: Colors.purple200 }
      ]}>
        {item.completed && <Image source={icons.check} style={{ width: 12, height: 12, tintColor: Colors.white } as any} />}
      </View>
    </View>
  );
};

// ─── Mystery card ──────────────────────────────────────────────────────────────
const MysteryCard = () => {
  const pct       = words.length > 0 ? (completedCt / words.length) * 100 : 0;
  const remaining = words.length - completedCt;
  const pulse     = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (pct >= 100) return;
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 1800, easing: Easing.out(Easing.ease), useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 0, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  const ringScale   = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.65] });
  const ringOpacity = pulse.interpolate({ inputRange: [0, 0.4, 1], outputRange: [0.5, 0.2, 0] });

  const msgIdx = pct === 0 ? 0 : pct < 40 ? 1 : pct < 80 ? 2 : pct < 100 ? 3 : 4;
  const msgs = [
    { title: 'Sinh vat dang ngu sau...', sub: 'Chinh phuc du tu de he lo' },
    { title: 'Bong dang mo hien ra...', sub: 'Tiep tuc di, gan roi' },
    { title: 'No dang thuc giac!',      sub: 'Chi con it nua thoi' },
    { title: `Con ${remaining} tu nua`, sub: 'Gan lam roi, co len!' },
    { title: 'Da mo khoa!',             sub: 'Chao mung nguoi ban moi' },
  ];

  return (
    <View style={styles.mystCard}>
      {/* Silhouette */}
      <View style={{ alignItems: 'center', gap: 5 }}>
        <View style={{ width: 72, height: 72, alignItems: 'center', justifyContent: 'center' }}>
          {pct < 100 && (
            <Animated.View style={[styles.mystRing, { borderColor: journey.color, transform: [{ scale: ringScale }], opacity: ringOpacity }]} />
          )}
          <View style={styles.mystCircle}>
            {pct >= 100
              ? <Image source={journey.petReward} style={{ width: 48, height: 48 }} />
              : <>
                  <Image source={journey.petReward} style={{ width: 44, height: 44, position: 'absolute', tintColor: journey.color, opacity: 0.22 } as any} />
                  <Typography style={{ fontSize: 14, fontWeight: '900', color: '#E9D5FF', letterSpacing: 2 }}>???</Typography>
                </>
            }
          </View>
        </View>
        <View style={styles.mystBadge}>
          <Typography style={{ fontSize: 9, fontWeight: '900', color: Colors.gold }}>{completedCt}/{words.length} tu</Typography>
        </View>
      </View>

      {/* Text */}
      <View style={{ flex: 1 }}>
        <View style={styles.goldTag}>
          <Typography variant="caption" weight="bold" color={Colors.goldDark}>Phan thuong bi an</Typography>
        </View>
        <Typography variant="bodySmall" weight="bold" color={Colors.white} style={{ marginBottom: 2 }}>
          {msgs[msgIdx].title}
        </Typography>
        <Typography variant="caption" color="rgba(221,214,254,0.8)" style={{ fontStyle: 'italic', marginBottom: 10 }}>
          {msgs[msgIdx].sub}
        </Typography>
        <View style={styles.progTrack}>
          <View style={[styles.progFill, { width: `${pct}%` as any }]} />
        </View>
      </View>
    </View>
  );
};

// ─── Screen ────────────────────────────────────────────────────────────────────
const JourneyDetailScreen = () => {
  const navigation = useNavigation<NavProp>();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#4A0E8F" barStyle="light-content" />

      <View style={styles.header}>
        <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
          <Image source={icons.back} style={{ width: 18, height: 18, tintColor: Colors.white } as any} />
        </Pressable>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Typography variant="caption" weight="bold" color="rgba(240,171,252,0.8)" style={{ letterSpacing: 2, fontSize: 10 }}>CHANG HOC</Typography>
          <Typography variant="subtitle" weight="bold" color={Colors.white} style={{ letterSpacing: 2 }}>{journey.name}</Typography>
        </View>
        <SettingsRight />
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <MysteryCard />

        <Typography variant="caption" weight="bold" color={Colors.purple700} style={styles.sectionLabel}>
          Tu vung trong chang
        </Typography>

        <View style={styles.wordList}>
          {words.map(item => <WordRow key={item.id} item={item} />)}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.bottomBar}>
        <Pressable
          style={styles.ctaBtn}
          onPress={() => navigation.navigate(MainScreenNames.ConquestScreen as any, {
            id: journey.id, name: journey.name, color: journey.color,
            softColor: journey.softColor, darkColor: journey.darkColor, petReward: journey.petReward,
          })}
        >
          <Typography variant="subtitle" weight="bold" color={Colors.white} style={{ letterSpacing: 1 }}>
            Tiep tuc hanh trinh
          </Typography>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default JourneyDetailScreen;

// ─── Styles ────────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container:    { flex: 1, backgroundColor: Colors.white },

  header:       { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingTop: 14, paddingBottom: 40, gap: 12, zIndex: 2, backgroundColor: '#4A0E8F' },
  backBtn:      { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.18)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.25)' },

  scrollContent:{ paddingHorizontal: 16, paddingTop: 8, gap: 16, paddingBottom: 16 },
  sectionLabel: { letterSpacing: 2 },

  // Mystery card
  mystCard:     { borderRadius: 22, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 14, marginTop: -24, backgroundColor: '#581C87', shadowColor: '#3B0764', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.3, shadowRadius: 16, elevation: 8 },
  mystRing:     { position: 'absolute', width: 68, height: 68, borderRadius: 34, borderWidth: 1.5 },
  mystCircle:   { width: 60, height: 60, borderRadius: 30, backgroundColor: '#12062A', borderWidth: 1.5, borderColor: 'rgba(192,132,252,0.45)', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  mystBadge:    { backgroundColor: 'rgba(245,158,11,0.25)', borderRadius: 7, paddingHorizontal: 8, paddingVertical: 3, borderWidth: 1, borderColor: 'rgba(245,158,11,0.4)' },
  goldTag:      { backgroundColor: 'rgba(245,158,11,0.2)', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3, alignSelf: 'flex-start', borderWidth: 1, borderColor: 'rgba(245,158,11,0.35)', marginBottom: 5 },
  progTrack:    { height: 5, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 3, overflow: 'hidden' },
  progFill:     { height: '100%', backgroundColor: Colors.gold, borderRadius: 3 },

  // Word list
  wordList:     { backgroundColor: Colors.white, borderRadius: 18, overflow: 'hidden', borderWidth: 1.5, borderColor: Colors.purple100, shadowColor: Colors.purple500, shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 },
  wordRow:      { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, gap: 12, borderBottomWidth: 1, borderBottomColor: Colors.purple50 },
  dot:          { width: 9, height: 9, borderRadius: 5 },
  memTag:       { borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2 },
  checkCircle:  { width: 28, height: 28, borderRadius: 14, borderWidth: 2, alignItems: 'center', justifyContent: 'center', flexShrink: 0 },

  // Bottom
  bottomBar:    { paddingHorizontal: 16, paddingBottom: 28, paddingTop: 12, backgroundColor: Colors.white, borderTopWidth: 1, borderColor: Colors.purple100 },
  ctaBtn:       { height: 54, borderRadius: 27, alignItems: 'center', justifyContent: 'center', backgroundColor: '#7E22CE', shadowColor: '#3B0764', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.3, shadowRadius: 12, elevation: 6 },
});