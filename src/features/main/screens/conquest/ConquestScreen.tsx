import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  View, Image, TextInput, Pressable, SafeAreaView,
  StatusBar, StyleSheet, Animated, Easing, Text,
  KeyboardAvoidingView, Platform, ScrollView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Typography } from '@/components/typography';
import { Colors } from '@/theme/colors';
import { WORDS_BY_JOURNEY, getMemoryLabel } from '../../data/data';

const icons = {
  back:    require('@/assets/icons/back.png'),
  speaker: require('@/assets/icons/speaker.png'),
  check:   require('@/assets/icons/check.png'),
};

const INITIAL_TIME = 42;

// ─── Shake timer icon ─────────────────────────────────────────────────────────
const ShakeTimerIcon = ({ timeLeft, color }: { timeLeft: number; color: string }) => {
  const shakeX = useRef(new Animated.Value(0)).current;
  const anim   = useRef<Animated.CompositeAnimation | null>(null);

  useEffect(() => {
    anim.current?.stop();
    shakeX.setValue(0);
    if (timeLeft <= 0) return;

    if (timeLeft <= 20) {
      const intensity = timeLeft <= 10 ? 5   : 2.5;
      const speed     = timeLeft <= 10 ? 50  : 100;
      const pause     = timeLeft <= 10 ? 80  : 250;
      anim.current = Animated.loop(
        Animated.sequence([
          Animated.timing(shakeX, { toValue:  intensity, duration: speed, useNativeDriver: true, easing: Easing.linear }),
          Animated.timing(shakeX, { toValue: -intensity, duration: speed, useNativeDriver: true, easing: Easing.linear }),
          Animated.timing(shakeX, { toValue:  intensity, duration: speed, useNativeDriver: true, easing: Easing.linear }),
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
    <Animated.View style={[ST.iconWrap, { backgroundColor: color + '22', transform: [{ translateX: shakeX }] }]}>
      <Image
        source={require('@/assets/icons/timer.png')}
        style={{ width: 18, height: 18, tintColor: color } as any}
      />
    </Animated.View>
  );
};

const ST = StyleSheet.create({
  iconWrap:  { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
  timerText: { fontSize: 22, fontWeight: '900', letterSpacing: 2, minWidth: 66, fontFamily: 'Nunito-Bold' },
});
const MemDots = ({ level }: { level: number }) => (
  <View style={{ flexDirection: 'row', gap: 5 }}>
    {Array.from({ length: 5 }).map((_, i) => (
      <View key={i} style={[S.memDot, {
        backgroundColor:
          i < level ? '#A855F7' :
          i === level ? '#F59E0B' :
          '#E9D5FF',
      }]} />
    ))}
  </View>
);

// ─── Mystery pet ───────────────────────────────────────────────────────────────
const MysteryPet = ({ petImage, isCompleted, color, progress, total }: {
  petImage: any; isCompleted: boolean; color: string; progress: number; total: number;
}) => {
  const pulse = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (isCompleted) return;
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 1800, easing: Easing.out(Easing.ease), useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 0, useNativeDriver: true }),
      ])
    ).start();
  }, [isCompleted]);
  const ringScale   = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.6] });
  const ringOpacity = pulse.interpolate({ inputRange: [0, 0.4, 1], outputRange: [0.45, 0.15, 0] });

  return (
    <View style={{ alignItems: 'center', gap: 6 }}>
      <View style={{ width: 62, height: 62, alignItems: 'center', justifyContent: 'center' }}>
        {!isCompleted && (
          <Animated.View style={[P.ring, { borderColor: color, transform: [{ scale: ringScale }], opacity: ringOpacity }]} />
        )}
        <View style={[P.circle, {
          backgroundColor: isCompleted ? color + '20' : '#12062A',
          borderColor:     isCompleted ? color + 'AA' : 'rgba(192,132,252,0.5)',
        }]}>
          {isCompleted
            ? <Image source={petImage} style={{ width: 38, height: 38 }} />
            : <>
                <Image source={petImage} style={{ width: 36, height: 36, position: 'absolute', tintColor: color, opacity: 0.22 } as any} />
                <Text style={{ fontSize: 14, fontWeight: '900', color: '#E9D5FF', letterSpacing: 2 }}>???</Text>
              </>
          }
        </View>
      </View>
      <View style={[P.pill, {
        backgroundColor: isCompleted ? '#D1FAE5' : color + '1A',
        borderColor:     isCompleted ? '#10B981AA' : color + '44',
      }]}>
        <Text style={{ fontSize: 9, fontWeight: '800', color: isCompleted ? '#065F46' : color }}>
          {isCompleted ? 'Da mo' : `${progress}/${total} tu`}
        </Text>
      </View>
    </View>
  );
};
const P = StyleSheet.create({
  ring:   { position: 'absolute', width: 56, height: 56, borderRadius: 28, borderWidth: 1.5 },
  circle: { width: 54, height: 54, borderRadius: 27, borderWidth: 1.5, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  pill:   { borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3, borderWidth: 1 },
});

// ─── Result overlay ────────────────────────────────────────────────────────────
const ResultOverlay = ({ visible, isCorrect, correctAnswer, combo, xp, onNext, petImage }: {
  visible: boolean; isCorrect: boolean; correctAnswer: string;
  combo: number; xp: number; onNext: () => void; petImage: any;
}) => {
  const opacity = useRef(new Animated.Value(0)).current;
  const slideY  = useRef(new Animated.Value(40)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(opacity, { toValue: 1, duration: 220, useNativeDriver: true }),
        Animated.spring(slideY, { toValue: 0, friction: 7, useNativeDriver: true }),
      ]).start();
    } else {
      opacity.setValue(0);
      slideY.setValue(40);
    }
  }, [visible]);

  if (!visible) return null;

  const msgs = ['Bạn giỏi quá!', 'Tuyệt quá!', 'Chính xác!', 'Hoàn hảo', 'Mê quá!'];

  return (
    <Animated.View style={[R.bg, { opacity }]}>
      <Animated.View style={{ transform: [{ translateY: slideY }], width: '100%' }}>
        <View style={[R.card, { backgroundColor: isCorrect ? '#6B21A8' : '#3B0764' }]}>
          {/* Top color strip */}
          <View style={[R.strip, { backgroundColor: isCorrect ? '#A855F7' : '#6D28D9' }]} />

          <View style={{ padding: 28, alignItems: 'center' }}>
            {/* Correct = check icon, Wrong = mystery circle */}
            {isCorrect ? (
              <View style={[R.iconCircle, { backgroundColor: 'rgba(168,85,247,0.2)' }]}>
                <View style={[R.iconInner, { backgroundColor: '#A855F7' }]}>
                  <Image source={icons.check} style={{ width: 22, height: 22, tintColor: '#fff' } as any} />
                </View>
              </View>
            ) : (
              <View style={R.mystCircle}>
                <Image source={petImage} style={{ width: 52, height: 52, position: 'absolute', tintColor: '#A855F7', opacity: 0.22 } as any} />
                <View style={{ ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(18,6,42,0.55)', borderRadius: 40 }} />
                <Text style={{ fontSize: 16, fontWeight: '900', color: '#E9D5FF', letterSpacing: 2 }}>???</Text>
              </View>
            )}

            <Typography variant="title" weight="bold" color="#fff" style={{ marginBottom: 6, textAlign: 'center' }}>
              {isCorrect ? msgs[combo % msgs.length] : 'Chưa đúng...'}
            </Typography>

            {isCorrect ? (
              <View style={R.xpRow}>
                <View style={R.xpBadge}>
                  <Typography variant="caption" weight="bold" color="#F59E0B">+{xp} XP</Typography>
                </View>
                <View style={R.comboBadge}>
                  <Typography variant="caption" weight="bold" color="#92400E">{combo} lien tiep</Typography>
                </View>
              </View>
            ) : (
              <View style={R.wrongCard}>
                <Typography variant="caption" color="#C4B5FD" style={{ marginBottom: 4 }}>Đáp án đúng</Typography>
                <Typography variant="subtitle" weight="bold" color="#fff">{correctAnswer}</Typography>
              </View>
            )}

            <Pressable onPress={onNext} style={R.nextBtn}>
              <Typography variant="subtitle" weight="bold" color="#7E22CE">
                {isCorrect ? 'Từ tiếp theo' : 'Tiếp tục nào'}
              </Typography>
            </Pressable>
          </View>
        </View>
      </Animated.View>
    </Animated.View>
  );
};
const R = StyleSheet.create({
  bg:         { ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(20,5,40,0.88)', zIndex: 20, alignItems: 'center', justifyContent: 'center', padding: 20 },
  card:       { width: '100%', borderRadius: 24, overflow: 'hidden' },
  strip:      { height: 5, width: '100%' },
  iconCircle: { width: 72, height: 72, borderRadius: 36, alignItems: 'center', justifyContent: 'center', marginBottom: 16, marginTop: 4 },
  mystCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#12062A', borderWidth: 2, borderColor: 'rgba(192,132,252,0.45)', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', marginBottom: 16, marginTop: 4 },
  iconInner:  { width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center' },
  xpRow:      { flexDirection: 'row', gap: 8, marginBottom: 20 },
  xpBadge:    { backgroundColor: 'rgba(245,158,11,0.2)', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 7, borderWidth: 1.5, borderColor: '#F59E0B66' },
  comboBadge: { backgroundColor: '#FEF3C7', borderRadius: 10, paddingHorizontal: 14, paddingVertical: 7 },
  wrongCard:  { backgroundColor: 'rgba(255,255,255,0.08)', borderRadius: 14, padding: 16, alignItems: 'center', marginBottom: 20, width: '100%' },
  nextBtn:    { backgroundColor: '#fff', borderRadius: 18, paddingHorizontal: 36, paddingVertical: 14 },
});

// ─── Screen ────────────────────────────────────────────────────────────────────
const ConquestScreen = ({ route }: any) => {
  const nav          = useNavigation();
  const journeyId    = route?.params?.id        || 'station';
  const journeyName  = route?.params?.name      || 'STATION';
  const journeyColor = route?.params?.color     || '#A855F7';
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

  const handleTimeUp  = () => { setLastOk(false); setCombo(0); setShowResult(true); };
  const handleNext    = () => { setShowResult(false); setWordIdx(i => (i + 1) % allWords.length); };
  const handleCheck   = useCallback(() => {
    if (!answer.trim() || showResult) return;
    if (timerRef.current) clearInterval(timerRef.current);
    const correct = currentWord.translation.toLowerCase();
    const userVal = answer.trim().toLowerCase();
    const ok = userVal.includes(correct.split(' ')[0]) || (correct.includes(userVal) && userVal.length > 1);
    setLastOk(ok);
    if (ok) { setCombo(c => c + 1); setDoneCount(d => Math.min(d + 1, TOTAL)); setTotalXP(x => x + 20 + combo * 5); }
    else setCombo(0);
    setShowResult(true);
  }, [answer, currentWord, combo, showResult]);

  const fmt        = (s: number) => `${String(Math.floor(s/60)).padStart(2,'0')}:${String(s%60).padStart(2,'0')}`;
  const timerColor = useMemo(() => timeLeft <= 10 ? '#EF4444' : timeLeft <= 20 ? '#F59E0B' : '#C084FC', [timeLeft]);
  const progPct    = TOTAL > 0 ? (doneCount / TOTAL) * 100 : 0;
  const isEmpty    = answer.trim().length === 0;

  const msgIdx   = progPct === 0 ? 0 : progPct < 40 ? 1 : progPct < 80 ? 2 : 3;
  const mystMsgs = [
    { title: 'Sinh vật đang ngủ sâu...', sub: 'Trả lời đúng để đánh thức nó' },
    { title: 'Bóng dáng mờ hiện ra...', sub: 'Cái gì đó đang nhúc nhích!' },
    { title: 'Nó đang thức giấc!', sub: 'Gần lắm rồi' },
    { title: 'Sắp mở khóa rồi!', sub: 'Cố lên nào' },
  ];

  const memLabel = getMemoryLabel(currentWord?.memoryLevel ?? 0);
  const memBg    = memLabel === 'Thành thạo' ? '#D1FAE5' : memLabel === 'Đang học' ? '#FEF3C7' : '#EDE9FE';
  const memColor = memLabel === 'Thành thạo' ? '#065F46' : memLabel === 'Đang học' ? '#92400E' : '#6D28D9';

  return (
    <SafeAreaView style={S.container}>
      <StatusBar backgroundColor="#1E0B36" barStyle="light-content" />

      {/* ── HEADER ── */}
      <View style={S.header}>
        <View style={S.headerTop}>
          <Pressable style={S.backBtn} onPress={() => nav.goBack()}>
            <Image source={icons.back} style={{ width: 16, height: 16, tintColor: '#fff' } as any} />
          </Pressable>
          <View style={{ flexDirection: 'row', gap: 8 }}>
            {combo > 0 && (
              <View style={S.comboBadge}>
                <Typography variant="caption" weight="bold" color="#92400E">{combo} lien tiep</Typography>
              </View>
            )}
            <View style={S.xpPill}>
              <Typography variant="caption" weight="bold" color="#F59E0B">{totalXP} XP</Typography>
            </View>
          </View>
        </View>

        <View style={{ alignItems: 'center', marginBottom: 12 }}>
          <Typography variant="caption" color="rgba(216,180,254,0.7)" style={{ fontSize: 10, letterSpacing: 2, marginBottom: 4 }}>
            Đang học cùng bạn
          </Typography>
          <Typography variant="subtitle" weight="bold" color="#fff" style={{ letterSpacing: 1.5 }}>
            {journeyName}
          </Typography>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <View style={S.progTrack}>
            <View style={[S.progFill, { width: `${progPct}%` as any }]} />
          </View>
          <Text style={{ fontSize: 11, fontWeight: '800', color: 'rgba(216,180,254,0.9)' }}>{doneCount}/{TOTAL}</Text>
        </View>
      </View>

      {/* ── MYSTERY CARD ── */}
      <View style={S.mystCard}>
        <MysteryPet
          petImage={journeyPet}
          isCompleted={doneCount >= TOTAL}
          color={journeyColor}
          progress={doneCount}
          total={TOTAL}
        />
        <View style={{ flex: 1 }}>
          <View style={S.goldTag}>
            <Typography variant="caption" weight="bold" color="#92400E">Phan thuong bi an</Typography>
          </View>
          <Typography variant="bodySmall" weight="bold" color="#1E0B36" style={{ marginBottom: 3 }}>
            {mystMsgs[msgIdx].title}
          </Typography>
          <Typography variant="caption" color="#7C3AED" style={{ fontStyle: 'italic', marginBottom: 8 }}>
            {mystMsgs[msgIdx].sub}
          </Typography>
          <View style={{ flexDirection: 'row', gap: 3 }}>
            {Array.from({ length: TOTAL }).map((_, i) => (
              <View key={i} style={[S.navDot, {
                backgroundColor:
                  i < doneCount ? journeyColor :
                  i === doneCount ? '#F59E0B' :
                  '#E9D5FF',
              }]} />
            ))}
          </View>
        </View>
      </View>

      {/* ── CONTENT — KeyboardAvoidingView chỉ bọc phần này ── */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={S.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Timer row */}
          <View style={S.timerRow}>
            <ShakeTimerIcon timeLeft={timeLeft} color={timerColor} />
            <Text style={[ST.timerText, { color: timerColor }]}>{fmt(timeLeft)}</Text>
            <View style={S.timerTrack}>
              <View style={[S.timerFill, { width: `${(timeLeft/INITIAL_TIME)*100}%` as any, backgroundColor: timerColor }]} />
            </View>
          </View>

          {/* Word card */}
          <View style={S.wordCard}>
            <View style={S.memRow}>
              <View>
                <Text style={S.memEyebrow}>MUC GHI NHO</Text>
                <MemDots level={currentWord?.memoryLevel ?? 0} />
              </View>
              <View style={[S.memBadge, { backgroundColor: memBg }]}>
                <Text style={[S.memBadgeText, { color: memColor }]}>{memLabel}</Text>
              </View>
            </View>
            <View style={S.divider} />
            <View style={S.wordCenter}>
              <Typography variant="h1" weight="bold" color="#1E0B36" style={{ letterSpacing: 0.5, textAlign: 'center', marginBottom: 4 }}>
                {currentWord?.word}
              </Typography>
              <Typography variant="caption" color="#9333EA" style={{ fontStyle: 'italic', marginBottom: 20 }}>
                {currentWord?.partOfSpeech} · {currentWord?.phonetic}
              </Typography>
              <Pressable style={S.soundBtn}>
                <Image source={icons.speaker} style={{ width: 18, height: 18, tintColor: '#A855F7' } as any} />
              </Pressable>
            </View>
            <View style={S.inputWrap}>
              <TextInput
                style={S.input}
                value={answer}
                onChangeText={setAnswer}
                placeholder="Viết nghĩa tiếng Việt"
                placeholderTextColor="#C4B5FD"
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="done"
                onSubmitEditing={handleCheck}
              />
            </View>
          </View>

          {/* CTA */}
          <Pressable onPress={handleCheck} disabled={isEmpty}>
            <View>
              <Typography variant="subtitle" weight="bold" color={isEmpty ? '#7C3AED' : '#fff'} style={{ letterSpacing: 1 }}>
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
      />
    </SafeAreaView>
  );
};

export default ConquestScreen;

// ─── Styles ────────────────────────────────────────────────────────────────────
const S = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F4FF' },

  // Header
  header:      { paddingHorizontal: 18, paddingTop: 10, paddingBottom: 36, zIndex: 2, backgroundColor: '#4A0E8F' },
  headerTop:   { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 },
  backBtn:     { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.2)' },
  comboBadge:  { backgroundColor: '#FEF3C7', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5, borderWidth: 1.5, borderColor: '#F59E0B' },
  xpPill:      { backgroundColor: 'rgba(245,158,11,0.18)', borderRadius: 10, paddingHorizontal: 10, paddingVertical: 5, borderWidth: 1, borderColor: 'rgba(245,158,11,0.4)' },
  progTrack:   { flex: 1, height: 6, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 3, overflow: 'hidden' },
  progFill:    { height: '100%', backgroundColor: '#F59E0B', borderRadius: 3 },

  // Mystery card
  mystCard:  {
    marginHorizontal: 16, marginTop: -20,
    backgroundColor: '#fff',
    borderRadius: 20, borderWidth: 1, borderColor: '#E9D5FF',
    padding: 14, flexDirection: 'row', alignItems: 'center', gap: 13,
    zIndex: 5,
    shadowColor: '#7E22CE', shadowOffset: { width: 0, height: 6 }, shadowOpacity: 0.12, shadowRadius: 18, elevation: 8,
  },
  goldTag:   { backgroundColor: '#FEF3C7', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3, alignSelf: 'flex-start', borderWidth: 1, borderColor: '#F59E0B55', marginBottom: 5 },
  navDot:    { flex: 1, maxWidth: 22, height: 4, borderRadius: 2 },

  // Content
  content:     { paddingHorizontal: 16, paddingTop: 14, paddingBottom: 24, gap: 12 },

  // Timer
  timerRow:    { flexDirection: 'row', alignItems: 'center', gap: 12 },
  timerTrack:  { flex: 1, height: 5, backgroundColor: '#EDE9FE', borderRadius: 3, overflow: 'hidden' },
  timerFill:   { height: '100%', borderRadius: 3 },

  // Word card
  wordCard:    {
    minHeight: 240, backgroundColor: '#fff',
    borderRadius: 22, borderWidth: 1, borderColor: '#EDE9FE',
    padding: 18,
    shadowColor: '#9333EA', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.07, shadowRadius: 10, elevation: 3,
  },
  memRow:       { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 },
  memEyebrow:   { fontSize: 9, fontWeight: '800', color: '#C4B5FD', letterSpacing: 2, marginBottom: 6 },
  memDot:       { width: 11, height: 11, borderRadius: 6 },
  memBadge:     { borderRadius: 8, paddingHorizontal: 10, paddingVertical: 4 },
  memBadgeText: { fontSize: 10, fontWeight: '800' },
  divider:      { height: 1, backgroundColor: '#F3E8FF', marginBottom: 14 },
  wordCenter:   { flex: 1, alignItems: 'center', justifyContent: 'center' },
  soundBtn:     { width: 40, height: 40, borderRadius: 20, backgroundColor: '#F3E8FF', alignItems: 'center', justifyContent: 'center' },
  inputWrap:    { marginTop: 16, borderBottomWidth: 2, borderBottomColor: '#E9D5FF', paddingBottom: 6 },
  input:        { fontSize: 16, fontFamily: 'Nunito-SemiBold', color: '#1E0B36', textAlign: 'center', paddingVertical: 4 },

  // CTA
  ctaBtn:      { height: 54, borderRadius: 27, alignItems: 'center', justifyContent: 'center', shadowColor: '#7E22CE', shadowOffset: { width: 0, height: 5 }, shadowOpacity: 0.28, shadowRadius: 12, elevation: 6 },
});