import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  View,
  Image,
  TextInput,
  Pressable,
  SafeAreaView,
  StatusBar,
  Animated,
  Easing,
  Text,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Typography } from '@/components/typography';
import { Colors } from '@/theme/colors';
import { Header } from '@/components/header/Header';
import { MysteryPet } from '@/components/MysteryPet/MysteryPet';
import { MemDots } from '@/components/MemDots/MemDots';
import { MemBadge, getMemoryLabel } from '@/components/MemDots/MemBadge';
import { XPPill, ComboBadge, GoldTag } from '@/components/GameUI/GameUI';
import { WORDS_BY_JOURNEY } from '../../data/data';
import { styles, overlayStyles, timerIconStyles } from './styles';

const icons = {
  speaker: require('@/assets/icons/speaker.png'),
  check: require('@/assets/icons/check.png'),
  timer: require('@/assets/icons/timer.png'),
};

const INITIAL_TIME = 42;
const CORRECT_MSGS = ['Bạn giỏi quá!', 'Tuyệt quá!', 'Chính xác!', 'Hoàn hảo!', 'Mê quá!'];
const MYST_MSGS = [
  { title: 'Sinh vật đang ngủ sâu...', sub: 'Trả lời đúng để đánh thức nó' },
  { title: 'Bóng dáng mờ hiện ra...', sub: 'Cái gì đó đang nhúc nhích!' },
  { title: 'Nó đang thức giấc!', sub: 'Gần lắm rồi' },
  { title: 'Sắp mở khóa rồi!', sub: 'Cố lên nào' },
];

// ─── Shake Timer Icon ─────────────────────────────────────────────────────────
const ShakeTimerIcon = ({ timeLeft, color }: { timeLeft: number; color: string }) => {
  const shakeX = useRef(new Animated.Value(0)).current;
  const anim = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    anim.current?.stop();
    shakeX.setValue(0);
    if (timeLeft <= 0) return;
    if (timeLeft <= 20) {
      const intensity = timeLeft <= 10 ? 5 : 2.5;
      const speed = timeLeft <= 10 ? 50 : 100;
      const pause = timeLeft <= 10 ? 80 : 250;
      anim.current = Animated.loop(
        Animated.sequence([
          Animated.timing(shakeX, { toValue: intensity,  duration: speed, useNativeDriver: true, easing: Easing.linear }),
          Animated.timing(shakeX, { toValue: -intensity, duration: speed, useNativeDriver: true, easing: Easing.linear }),
          Animated.timing(shakeX, { toValue: intensity,  duration: speed, useNativeDriver: true, easing: Easing.linear }),
          Animated.timing(shakeX, { toValue: -intensity, duration: speed, useNativeDriver: true, easing: Easing.linear }),
          Animated.timing(shakeX, { toValue: 0,          duration: speed, useNativeDriver: true, easing: Easing.linear }),
          Animated.delay(pause),
        ])
      );
      anim.current.start();
    }
    return () => { anim.current?.stop(); };
  }, [timeLeft <= 10, timeLeft <= 20, timeLeft <= 0]);

  return (
    <Animated.View style={[timerIconStyles.iconWrap, { backgroundColor: color + '22', transform: [{ translateX: shakeX }] }]}>
      <Image source={icons.timer} style={{ width: 18, height: 18, tintColor: color } as any} />
    </Animated.View>
  );
};

// ─── Result Overlay ────────────────────────────────────────────────────────────
const ResultOverlay = ({
  visible, isCorrect, correctAnswer, combo, xp, onNext, petImage, journeyColor,
}: {
  visible: boolean;
  isCorrect: boolean;
  correctAnswer: string;
  combo: number;
  xp: number;
  onNext: () => void;
  petImage: any;
  journeyColor: string;
}) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const slideY  = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: 220, useNativeDriver: true }),
        Animated.spring(slideY,  { toValue: 0, friction: 7,  useNativeDriver: true }),
      ]).start();
    } else {
      opacity.setValue(0);
      slideY.setValue(40);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Animated.View style={[overlayStyles.bg, { opacity }]}>
      <Animated.View style={{ transform: [{ translateY: slideY }], width: '100%' }}>
        <View style={[overlayStyles.card, { backgroundColor: isCorrect ? Colors.purple700 : Colors.purple900 }]}>
          <View style={[overlayStyles.strip, { backgroundColor: isCorrect ? Colors.purple500 : Colors.purple700 }]} />

          <View style={{ padding: 28, alignItems: 'center' }}>
            {isCorrect ? (
              <View style={[overlayStyles.iconCircle, { backgroundColor: Colors.purple500 + '33' }]}>
                <View style={[overlayStyles.iconInner, { backgroundColor: Colors.purple500 }]}>
                  <Image source={icons.check} style={{ width: 22, height: 22, tintColor: Colors.white } as any} />
                </View>
              </View>
            ) : (
              <View style={overlayStyles.mystCircle}>
                <Image source={petImage} style={{ width: 52, height: 52, position: 'absolute', tintColor: journeyColor, opacity: 0.22 } as any} />
                <Text style={overlayStyles.mystText}>???</Text>
              </View>
            )}

            <Typography variant="title" weight="bold" color={Colors.white} style={{ marginBottom: 6, textAlign: 'center' }}>
              {isCorrect ? CORRECT_MSGS[combo % CORRECT_MSGS.length] : 'Chưa đúng...'}
            </Typography>

            {isCorrect ? (
              <View style={overlayStyles.xpRow}>
                <XPPill xp={xp} />
                <ComboBadge count={combo} />
              </View>
            ) : (
              <View style={overlayStyles.wrongCard}>
                <Typography variant="caption" color={Colors.purple200} style={{ marginBottom: 4 }}>
                  Đáp án đúng
                </Typography>
                <Typography variant="subtitle" weight="bold" color={Colors.white}>
                  {correctAnswer}
                </Typography>
              </View>
            )}

            <Pressable onPress={onNext} style={overlayStyles.nextBtn}>
              <Typography variant="subtitle" weight="bold" color={Colors.purple700}>
                {isCorrect ? 'Từ tiếp theo' : 'Tiếp tục nào'}
              </Typography>
            </Pressable>
          </View>
        </View>
      </Animated.View>
    </Animated.View>
  );
};

// ─── Screen ────────────────────────────────────────────────────────────────────
const ConquestScreen = ({ route }: any) => {
  const nav          = useNavigation();
  const journeyId    = route?.params?.id        || 'station';
  const journeyName  = route?.params?.name      || 'STATION';
  const journeyColor = route?.params?.color     || Colors.purple500;
  const journeyPet   = route?.params?.petReward || require('@/assets/icons/pet01.png');

  const allWords = WORDS_BY_JOURNEY[journeyId] || [];
  const TOTAL    = allWords.length;

  const [wordIdx,    setWordIdx]    = useState(0);
  const [doneCount,  setDoneCount]  = useState(allWords.filter(w => w.completed).length);
  const [answer,     setAnswer]     = useState('');
  const [timeLeft,   setTimeLeft]   = useState(INITIAL_TIME);
  const [combo,      setCombo]      = useState(0);
  const [totalXP,    setTotalXP]    = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [lastOk,     setLastOk]     = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentWord = allWords[wordIdx % allWords.length];

  useEffect(() => {
    setTimeLeft(INITIAL_TIME);
    setAnswer('');
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) { clearInterval(timerRef.current!); handleTimeUp(); return 0; }
        return prev - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [wordIdx]);

  const handleTimeUp = () => { setLastOk(false); setCombo(0); setShowResult(true); };
  const handleNext   = () => { setShowResult(false); setWordIdx(i => (i + 1) % allWords.length); };

  const handleCheck = useCallback(() => {
    if (!answer.trim() || showResult) return;
    if (timerRef.current) clearInterval(timerRef.current);
    const correct = currentWord.translation.toLowerCase();
    const userVal = answer.trim().toLowerCase();
    const ok = userVal.includes(correct.split(' ')[0]) || (correct.includes(userVal) && userVal.length > 1);
    setLastOk(ok);
    if (ok) {
      setCombo(c => c + 1);
      setDoneCount(d => Math.min(d + 1, TOTAL));
      setTotalXP(x => x + 20 + combo * 5);
    } else {
      setCombo(0);
    }
    setShowResult(true);
  }, [answer, currentWord, combo, showResult]);

  const fmt = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const timerColor = useMemo(
    () => timeLeft <= 10 ? Colors.timerDanger : timeLeft <= 20 ? Colors.timerWarn : Colors.timerGood,
    [timeLeft]
  );

  const progPct  = TOTAL > 0 ? (doneCount / TOTAL) * 100 : 0;
  const isEmpty  = answer.trim().length === 0;
  const msgIdx   = progPct === 0 ? 0 : progPct < 40 ? 1 : progPct < 80 ? 2 : 3;
  const memLabel = getMemoryLabel(currentWord?.memoryLevel ?? 0);

  const memBg =
    memLabel === 'Thành thạo' ? Colors.successSoft :
    memLabel === 'Đang học'   ? Colors.goldSoft     : Colors.purple100;

  const memColor =
    memLabel === 'Thành thạo' ? Colors.success  :
    memLabel === 'Đang học'   ? Colors.goldDark  : Colors.purple700;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={Colors.purple800} barStyle="light-content" />

      {/* ── Header ── */}
      <View style={styles.header}>
        <Header
          showBack
          backTo={() => nav.goBack()}
          style={styles.headerInner}
          rightComponent={
            <View style={{ flexDirection: 'row', gap: 8 }}>
              <ComboBadge count={combo} />
              <XPPill xp={totalXP} />
            </View>
          }
        />
        <View style={{ alignItems: 'center', marginBottom: 12 }}>
          <Typography variant="caption" color={Colors.purple200} style={{ fontSize: 10, letterSpacing: 2, marginBottom: 4 }}>
            Đang học cùng bạn
          </Typography>
          <Typography variant="subtitle" weight="bold" color={Colors.white} style={{ letterSpacing: 1.5 }}>
            {journeyName}
          </Typography>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <View style={styles.progTrack}>
            <View style={[styles.progFill, { width: `${progPct}%` as any }]} />
          </View>
          <Text style={{ fontSize: 11, fontWeight: '800', color: Colors.purple200 }}>
            {doneCount}/{TOTAL}
          </Text>
        </View>
      </View>

      {/* ── Mystery Card ── */}
      <View style={styles.mystCard}>
        <MysteryPet
          petImage={journeyPet}
          isCompleted={doneCount >= TOTAL}
          color={journeyColor}
          progress={doneCount}
          total={TOTAL}
          size={54}
        />
        <View style={{ flex: 1 }}>
          <GoldTag label="Phần thưởng bí ẩn" />
          <View style={{ height: 4 }} />
          <Typography variant="bodySmall" weight="bold" color={Colors.textDark} style={{ marginBottom: 3 }}>
            {MYST_MSGS[msgIdx].title}
          </Typography>
          <Typography variant="caption" color={Colors.purple600} style={{ fontStyle: 'italic', marginBottom: 8 }}>
            {MYST_MSGS[msgIdx].sub}
          </Typography>
          <View style={{ flexDirection: 'row', gap: 3 }}>
            {Array.from({ length: TOTAL }).map((_, i) => (
              <View
                key={i}
                style={[styles.navDot, {
                  backgroundColor:
                    i < doneCount  ? journeyColor :
                    i === doneCount ? Colors.gold   : Colors.purple100,
                }]}
              />
            ))}
          </View>
        </View>
      </View>

      {/* ── Content ── */}
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Timer row */}
          <View style={styles.timerRow}>
            <ShakeTimerIcon timeLeft={timeLeft} color={timerColor} />
            <Text style={{ fontSize: 22, fontWeight: '900', letterSpacing: 2, minWidth: 66, color: timerColor, fontFamily: 'Roboto-Bold' }}>
              {fmt(timeLeft)}
            </Text>
            <View style={styles.timerTrack}>
              <View style={[styles.timerFill, { width: `${(timeLeft / INITIAL_TIME) * 100}%` as any, backgroundColor: timerColor }]} />
            </View>
          </View>

          {/* Word card */}
          <View style={styles.wordCard}>
            <View style={styles.cardBlob1} />
            <View style={styles.cardBlob2} />

            <View style={styles.memRow}>
              <View>
                <Typography variant="caption" color={Colors.purple300} style={{ fontSize: 9, letterSpacing: 2, marginBottom: 6 }}>
                  MỨC GHI NHỚ
                </Typography>
                <MemDots level={currentWord?.memoryLevel ?? 0} />
              </View>
              <View style={[styles.memBadge, { backgroundColor: memBg }]}>
                <Text style={[styles.memBadgeText, { color: memColor }]}>{memLabel}</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.wordCenter}>
              <Typography variant="h1" weight="bold" color={Colors.textDark} style={{ letterSpacing: 0.5, textAlign: 'center', marginBottom: 4 }}>
                {currentWord?.word}
              </Typography>
              <Typography variant="caption" color={Colors.purple600} style={{ fontStyle: 'italic', marginBottom: 20 }}>
                {currentWord?.partOfSpeech} · {currentWord?.phonetic}
              </Typography>
              <Pressable style={styles.soundBtn}>
                <Image source={icons.speaker} style={{ width: 18, height: 18, tintColor: Colors.purple500 } as any} />
              </Pressable>
            </View>

            <View style={styles.inputWrap}>
              <TextInput
                style={styles.input}
                value={answer}
                onChangeText={setAnswer}
                placeholder="Viết nghĩa tiếng Việt"
                placeholderTextColor={Colors.textPlaceholder}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="done"
                onSubmitEditing={handleCheck}
              />
            </View>
          </View>

          {/* CTA */}
          <Pressable onPress={handleCheck} disabled={isEmpty}>
            <View style={[styles.ctaBtn, { backgroundColor: isEmpty ? Colors.purple100 : Colors.purple700 }]}>
              <Typography variant="subtitle" weight="bold" color={isEmpty ? Colors.purple400 : Colors.white} style={{ letterSpacing: 1 }}>
                Xem kết quả
              </Typography>
            </View>
          </Pressable>
        </ScrollView>
      </KeyboardAvoidingView>

      <ResultOverlay
        visible={showResult}
        isCorrect={lastOk}
        correctAnswer={currentWord?.translation ?? ''}
        combo={combo}
        xp={20 + combo * 5}
        onNext={handleNext}
        petImage={journeyPet}
        journeyColor={journeyColor}
      />
    </SafeAreaView>
  );
};

export default ConquestScreen;