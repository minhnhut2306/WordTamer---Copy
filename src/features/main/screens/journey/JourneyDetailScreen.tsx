import React from 'react';
import {
  View,
  Image,
  ScrollView,
  Pressable,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Typography } from '@/components/typography';
import { Colors } from '@/theme/colors';
import { Header } from '@/components/header/Header';
import { SettingsRight } from '@/components/StatsBar/StatsBar';
import { MemBadge } from '@/components/MemDots/MemBadge';
import { MysteryPet } from '@/components/MysteryPet/MysteryPet';
import { GoldTag } from '@/components/GameUI/GameUI';
import { MainScreenNames } from '../../navigations/main-screen-names';
import { JOURNEYS, WORDS_BY_JOURNEY, WordItem } from '../../data/data';
import { styles } from './detailStyles';

const icons = {
  check: require('@/assets/icons/check.png'),
  speaker: require('@/assets/icons/speaker.png'),
};

type NavProp = NativeStackNavigationProp<any>;

const journey = JOURNEYS[0];
const words = WORDS_BY_JOURNEY[journey.id] ?? [];
const completedCt = words.filter(w => w.completed).length;

// ─── Word Row ─────────────────────────────────────────────────────────────────
const WordRow = ({ item }: { item: WordItem }) => (
  <View style={styles.wordRow}>
    {/* Speaker button — left */}
    <Pressable style={styles.speakerBtn}>
      <Image
        source={icons.speaker}
        style={{ width: 16, height: 16, tintColor: Colors.purple400 } as any}
      />
    </Pressable>

    {/* Word info — center */}
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 8, marginBottom: 3 }}>
        <Typography variant="bodySmall" weight="bold" color={Colors.purple900}>
          {item.word}
        </Typography>
        <Typography variant="caption" color={Colors.purple400} style={{ fontStyle: 'italic' }}>
          {item.phonetic}
        </Typography>
      </View>
      <Typography variant="caption" weight="bold" color={Colors.textMid} style={{ marginBottom: 6 }}>
        {item.translation}
      </Typography>
      <MemBadge level={item.memoryLevel} />
    </View>

    {/* Check icon — right */}
    <View style={item.completed ? null : [styles.checkCircle, { borderColor: Colors.purple200 }]}>
      {item.completed && (
        <Image
          source={icons.check}
          style={{ width: 30, height: 30 } as any}
        />
      )}
    </View>
  </View>
);

// ─── Mystery Card ─────────────────────────────────────────────────────────────
const MysteryCard = () => {
  const pct = words.length > 0 ? (completedCt / words.length) * 100 : 0;
  const remaining = words.length - completedCt;

  const msgIdx = pct === 0 ? 0 : pct < 40 ? 1 : pct < 80 ? 2 : pct < 100 ? 3 : 4;
  const msgs = [
    { title: 'Sinh vật đang ngủ sâu...', sub: 'Chinh phục đủ từ để hé lộ' },
    { title: 'Bóng dáng mờ hiện ra...', sub: 'Tiếp tục đi, gần rồi' },
    { title: 'Nó đang thức giấc!', sub: 'Chỉ còn ít nữa thôi' },
    { title: `Còn ${remaining} từ nữa`, sub: 'Gần lắm rồi, cố lên!' },
    { title: 'Đã mở khóa!', sub: 'Chào mừng người bạn mới' },
  ];

  return (
    <View style={styles.mystCard}>
      <MysteryPet
        petImage={journey.petReward}
        isCompleted={pct >= 100}
        color={journey.color}
        progress={completedCt}
        total={words.length}
        size={60}
      />
      <View style={{ flex: 1 }}>
        <GoldTag label="Phần thưởng bí ẩn" />
        <View style={{ height: 4 }} />
        <Typography variant="bodySmall" weight="bold" color={Colors.white} style={{ marginBottom: 2 }}>
          {msgs[msgIdx].title}
        </Typography>
        <Typography
          variant="caption"
          color={Colors.purple200}
          style={{ fontStyle: 'italic', marginBottom: 10 }}
        >
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
      <StatusBar backgroundColor={Colors.purple800} barStyle="light-content" />

      <Header
        title={journey.name}
        showBack
        backTo={() => navigation.goBack()}
        rightComponent={<SettingsRight />}
        style={styles.header}
        titleStyle={{ color: Colors.white, letterSpacing: 2 }}
      />
      <View style={styles.headerStrip} />

      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <MysteryCard />

        <Typography
          variant="caption"
          weight="bold"
          color={Colors.purple700}
          style={styles.sectionLabel}
        >
          Từ vựng trong chặng
        </Typography>

        <View style={styles.wordList}>
          {words.map(item => (
            <WordRow key={item.id} item={item} />
          ))}
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>

      <View style={styles.bottomBar}>
        <Pressable
          style={styles.ctaBtn}
          onPress={() =>
            navigation.navigate(MainScreenNames.ConquestScreen as any, {
              id: journey.id,
              name: journey.name,
              color: journey.color,
              softColor: journey.softColor,
              darkColor: journey.darkColor,
              petReward: journey.petReward,
            })
          }
        >
          <Typography variant="subtitle" weight="bold" color={Colors.white} style={{ letterSpacing: 1 }}>
            Tiếp tục hành trình
          </Typography>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default JourneyDetailScreen;