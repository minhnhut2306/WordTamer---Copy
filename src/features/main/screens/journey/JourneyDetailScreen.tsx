import React from 'react';
import {
  View,
  Image,
  ScrollView,
  Pressable,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Typography } from '@/components/typography';
import { Header } from '@/components/header/Header';
import { detailStyles as styles } from './detailStyles';
import { StatsLeft, SettingsRight } from '@/components/StatsBar/StatsBar';
import { JOURNEYS, WORDS_BY_JOURNEY, WordItem } from '../../data/data';
import { Colors } from '@/theme/colors';
import { MainScreenNames } from '../../navigations/main-screen-names';

const icons = {
  speaker: require('@/assets/icons/speaker.png'),
  check: require('@/assets/icons/check.png'),
  back: require('@/assets/icons/back.png'),
};

const getBgAndDotColor = (journeyId: string): { bgColor: string; dotColor: string } => {
  const colorMap: Record<string, { bgColor: string; dotColor: string }> = {
    station: { bgColor: Colors.bgPeach, dotColor: Colors.pinkDot },
    kitchen: { bgColor: '#F4F0FB', dotColor: '#E9D5FF' },
    forest: { bgColor: '#F0FDF4', dotColor: '#D1FAE5' },
  };
  return colorMap[journeyId] || { bgColor: Colors.bgPeach, dotColor: Colors.pinkDot };
};

type RootStackParamList = {
  ConquestScreen: {
    id: string; name: string; color: string; softColor: string;
    darkColor: string; bgColor: string; dotColor: string;
  };
};
type NavProp = NativeStackNavigationProp<RootStackParamList>;

const journey = JOURNEYS[0];
const words = WORDS_BY_JOURNEY[journey.id] ?? [];
const completedCount = words.filter(w => w.completed).length;

const { width, height } = Dimensions.get('window');
const DOT_COLS = Math.floor(width / 22);
const DOT_ROWS = Math.ceil(height / 17);

const DottedBackground = React.memo(() => (
  <View style={styles.dotBackground} pointerEvents="none">
    {Array.from({ length: DOT_ROWS }).map((_, r) => (
      <View key={r} style={styles.dotRow}>
        {Array.from({ length: DOT_COLS }).map((_, c) => (
          <View key={c} style={styles.dot} />
        ))}
      </View>
    ))}
  </View>
));

const WordRow = ({ item }: { item: WordItem }) => (
  <View style={styles.wordRow}>
    <Pressable style={[styles.speakerBtn, { backgroundColor: journey.color + '22' }]}>
      <Image source={icons.speaker} style={styles.speakerIcon} />
    </Pressable>

    <View style={styles.wordText}>
      <Typography variant="bodySmall" weight="bold" color={Colors.textDark}>
        {item.word}
      </Typography>
      <Typography variant="caption" color={Colors.textMid}>
        {item.translation}
      </Typography>
    </View>

    <View style={[
      styles.checkCircle,
      item.completed
        ? { backgroundColor: Colors.success, borderColor: Colors.success }
        : { backgroundColor: Colors.white, borderColor: Colors.borderBeige },
    ]}>
      {item.completed && (
        <Image source={icons.check} style={styles.checkIcon} />
      )}
    </View>
  </View>
);

const GoalBanner = () => {
  const pct = words.length > 0 ? (completedCount / words.length) * 100 : 0;
  const remaining = words.length - completedCount;

  return (
    <View style={[styles.goalCard, { borderColor: journey.color + '55' }]}>
      <View style={[styles.goalPetWrap, { backgroundColor: journey.softColor }]}>
        <Image source={journey.petReward} style={styles.goalPetImg} />
      </View>

      <View style={styles.goalInfo}>
        <View style={[styles.goalBadge, { backgroundColor: journey.color }]}>
          <Typography variant="caption" weight="bold" color={Colors.white}>MỤC TIÊU CỦA BẠN</Typography>
        </View>
        <Typography variant="bodySmall" weight="bold" color={Colors.textDark} style={styles.goalMsg}>
          {remaining === 0 ? 'Hoàn thành rồi!' : `Còn ${remaining} từ nữa thôi!`}
        </Typography>
        <View style={styles.goalTrack}>
          <View style={[styles.goalFill, { width: `${pct}%` as any, backgroundColor: journey.color }]} />
        </View>
        <Typography variant="caption" color={Colors.textMid}>Đang hé lộ...</Typography>
      </View>
    </View>
  );
};

const BackBtn = () => (
  <Pressable style={styles.backBtn}>
    <Image source={icons.back} style={[styles.backIcon, { tintColor: journey.color }]} />
  </Pressable>
);

const JourneyDetailScreen = () => {
  const navigation = useNavigation<NavProp>();
  const { bgColor, dotColor } = getBgAndDotColor(journey.id);

  const handleContinue = () => {
    navigation.navigate(MainScreenNames.ConquestScreen as any, {
      id: journey.id,
      name: journey.name,
      color: journey.color,
      softColor: journey.softColor,
      darkColor: journey.darkColor,
      bgColor,
      dotColor,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.bgPeach} barStyle="dark-content" />
      <DottedBackground />

        <Header
          showBack={false}
          leftComponent={<StatsLeft />}
          rightComponent={<SettingsRight />}
          style={styles.statsHeader}
        />

        <Header
          showBack={false}
          leftComponent={<BackBtn />}
          title={journey.name}
          titleStyle={[styles.headerTitle, { color: journey.darkColor }]}
          style={styles.titleHeader}
        />

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}>

          <GoalBanner />

          <View style={styles.wordList}>
            {words.map(item => (
              <WordRow key={item.id} item={item} />
            ))}
          </View>

          <View style={{ height: 90 }} />
        </ScrollView>

        <View style={styles.bottomBar}>
          <Pressable 
            style={[styles.ctaBtn, { backgroundColor: journey.color }]}
            onPress={handleContinue}
          >
            <Typography variant="subtitle" weight="bold" color={Colors.white} style={styles.ctaText}>
              TIẾP TỤC HỌC
            </Typography>
          </Pressable>
        </View>

      </SafeAreaView>
    );
};

export default JourneyDetailScreen;