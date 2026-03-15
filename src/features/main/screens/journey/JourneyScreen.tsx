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
import { Colors } from '@/theme/colors';
import { styles } from './styles';
import { MainScreenNames } from '../../navigations/main-screen-names';
import { StatsLeft, SettingsRight } from '@/components/StatsBar/StatsBar';
import { JOURNEYS, JourneyItem } from '../../data/data';

const icons = {
  play: require('@/assets/icons/play.png'),
  lock: require('@/assets/icons/lock.png'),
  pet: require('@/assets/icons/pet.png'),
};

type RootStackParamList = {
  JourneyDetailScreen: {
    id: string; name: string; color: string; softColor: string;
    darkColor: string; progress: number; total: number;
    petReward: any; petName: string;
  };
};
type NavProp = NativeStackNavigationProp<RootStackParamList>;

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

const JourneyCard = ({ item }: { item: JourneyItem }) => {
  const navigation = useNavigation<NavProp>();
  const isLocked = item.state === 'locked';
  const isCompleted = item.state === 'completed';

  const handlePress = () => {
    if (isLocked) return;
    navigation.navigate(MainScreenNames.JourneyDetailScreen as any, {
      id: item.id, name: item.name, color: item.color,
      softColor: item.softColor, darkColor: item.darkColor,
      progress: item.progress, total: item.total,
      petReward: item.petReward, petName: item.petName,
    });
  };

  return (
    <Pressable onPress={handlePress} style={[styles.card, { borderColor: item.darkColor }]}>

      <View style={[styles.cardTopBand, { backgroundColor: item.softColor }]}>
        <View style={[styles.playBtn, { backgroundColor: item.color }]}>
          <Image source={isLocked ? icons.lock : icons.play} style={styles.playIcon} />
        </View>

        <View style={styles.cardTitleGroup}>
          <Typography variant="subtitle" weight="bold" color={item.darkColor} style={styles.cardName}>
            {item.name}
          </Typography>
          <Typography variant="caption" color={item.color}>
            {item.subtitle}
          </Typography>
        </View>

        <View style={[styles.petPreviewWrap, { borderColor: item.color, backgroundColor: isCompleted ? item.softColor : 'rgba(255,255,255,0.7)' }]}>
          {isCompleted
            ? <Image source={item.petReward} style={styles.petPreviewImg} />
            : <Typography style={styles.petPreviewEmoji}>?</Typography>
          }
        </View>

        {isLocked && <View style={styles.lockedOverlay} />}
      </View>

      <View style={[styles.cardBottom, { backgroundColor: item.color }]}>
        <View style={styles.petRewardRow}>
          <Image source={item.petReward} style={styles.petRewardImg} />
          <Typography variant="caption" color="rgba(255,255,255,0.9)" style={styles.petRewardLabel}>
            {isCompleted ? item.petName : '???'}
          </Typography>
        </View>

        <View style={[styles.badgePill, { backgroundColor: item.darkColor }]}>
          <Typography variant="caption" weight="bold" color={Colors.white}>
            {item.badge}
          </Typography>
        </View>
      </View>
    </Pressable>
  );
};

const Divider = () => (
  <View style={styles.dividerWrap}>
    <View style={styles.dividerLine} />
    <View style={styles.dividerLine} />
  </View>
);

const PetRewardBanner = () => {
  const completed = JOURNEYS.filter(j => j.state === 'completed').length;
  const total = JOURNEYS.length;
  const pct = Math.round((completed / total) * 100);

  return (
    <View style={styles.rewardCard}>
      <View style={styles.rewardPetWrap}>
        <View style={styles.rewardPetBlur}>
          <View style={styles.rewardPetQ}>
            <Typography style={styles.rewardPetQText}>?</Typography>
          </View>
        </View>
      </View>

      <View style={styles.rewardBody}>
        <Typography variant="bodySmall" weight="bold" color={Colors.magentaDark}>
          Pet bí ẩn đang chờ bạn!
        </Typography>
        <Typography variant="caption" color={Colors.magenta} style={styles.rewardSub}>
          Hoàn thành {total}/{total} chủ đề để mở khóa
        </Typography>
        <View style={styles.rewardProgressBg}>
          <View style={[styles.rewardProgressFill, { width: `${pct}%` as any }]} />
        </View>
        <Typography variant="caption" color={Colors.magenta} weight="bold">
          {completed}/{total} hoàn thành
        </Typography>
      </View>
    </View>
  );
};

const PetAvatar = () => (
  <View style={styles.petAvatarOuter}>
    <View style={styles.petAvatarInner}>
      <Image source={icons.pet} style={styles.petAvatarEmoji} />
    </View>
  </View>
);

const JourneyScreen = () => (
  <SafeAreaView style={styles.container}>
    <StatusBar backgroundColor={Colors.bgPink} barStyle="dark-content" />
    <DottedBackground />

    <Header
      showBack={false}
      leftComponent={<StatsLeft />}
      rightComponent={<SettingsRight />}
      style={styles.statsHeader}
    />

    <Header
      title="CHUYẾN ĐI"
      titleStyle={styles.bannerTitle}
      showBack={false}
      leftComponent={<PetAvatar />}
      style={styles.bannerHeader}
    />

    <Divider />

    <ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}>

      <PetRewardBanner />

      {JOURNEYS.map(item => (
        <JourneyCard key={item.id} item={item} />
      ))}
    </ScrollView>
  </SafeAreaView>
);

export default JourneyScreen;
