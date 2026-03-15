import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import {
  View,
  Image,
  TextInput,
  Pressable,
  SafeAreaView,
  StatusBar,
  Alert,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Typography } from '@/components/typography';
import { Header } from '@/components/header/Header';
import { StatsLeft, SettingsRight } from '@/components/StatsBar/StatsBar';
import { Colors } from '@/theme/colors';
import { styles } from './styles';
import { WORDS_BY_JOURNEY } from '../../data/data';

const icons = {
  back: require('@/assets/icons/back.png'),
  timer: require('@/assets/icons/timer.png'),
  speaker: require('@/assets/icons/speaker.png'),
  check: require('@/assets/icons/check.png'),
};

const { width, height } = Dimensions.get('window');
const DOT_COLS = Math.floor(width / 22);
const DOT_ROWS = Math.ceil(height / 17);

const INITIAL_TIME = 42;

const DottedBackground = React.memo(({ dotColor }: { dotColor: string }) => (
  <View style={styles.dotBackground} pointerEvents="none">
    {Array.from({ length: DOT_ROWS }).map((_, rowIndex) => (
      <View key={rowIndex} style={styles.dotRow}>
        {Array.from({ length: DOT_COLS }).map((_, colIndex) => (
          <View key={colIndex} style={[styles.dot, { backgroundColor: dotColor }]} />
        ))}
      </View>
    ))}
  </View>
));

const BackBtn = ({ color }: { color: string }) => (
  <Pressable style={styles.backBtn}>
    <Image source={icons.back} style={[styles.backIcon, { tintColor: color }]} />
  </Pressable>
);

const ConquestScreen = ({ navigation, route }: any) => {
  const navInstance = useNavigation();
  const journeyId = route?.params?.id || 'station';
  const journeyName = route?.params?.name || 'CONQUEST';
  const journeyColor = route?.params?.color || Colors.pink;
  const journeyDarkColor = route?.params?.darkColor || Colors.stationDark;
  const bgColor = route?.params?.bgColor || Colors.bgPeach;
  const dotColor = route?.params?.dotColor || Colors.pinkDot;

  const words = WORDS_BY_JOURNEY[journeyId] || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const [timeLeft, setTimeLeft] = useState(INITIAL_TIME);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, []);

  useEffect(() => {
    startTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [startTimer, currentIndex]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleCheck = useCallback(() => {
    
  }, []);


  const isAnswerEmpty = answer.trim().length === 0;
  const currentWord = words[currentIndex];

  const timerColor = useMemo(() => {
    if (timeLeft <= 10) return Colors.timerRed;
    if (timeLeft <= 20) return Colors.timerOrange;
    return Colors.timerYellow;
  }, [timeLeft]);

  const progressPct = words.length > 0 ? ((currentIndex + 1) / words.length) * 100 : 0;

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <StatusBar backgroundColor={bgColor} barStyle="dark-content" />
      <DottedBackground dotColor={dotColor} />

      <Header
        showBack={false}
        leftComponent={<StatsLeft />}
        rightComponent={<SettingsRight />}
        style={styles.statsHeader}
      />

      <Header
        showBack={false}
        leftComponent={<BackBtn color={journeyColor} />}
        title={journeyName}
        titleStyle={[styles.headerTitle, { color: journeyDarkColor }]}
        style={styles.titleHeader}
      />

      <View style={styles.content}>
        {/* Progress Bar */}
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${progressPct}%` as any, backgroundColor: journeyColor }
            ]} 
          />
        </View>
        <Typography 
          variant="caption" 
          color={Colors.textMid}
          style={styles.progressLabel}
        >
          TỪ {currentIndex + 1}/{words.length}
        </Typography>

        {/* Instruction */}
        <Typography
          variant="bodySmall"
          color={Colors.textLight}
          textAlign="center"
          style={styles.instruction}>
          Viết lại từ đúng nhé!
        </Typography>

        {/* Timer */}
        <View style={styles.timerContainer}>
          <Image source={icons.timer} style={[styles.timerIcon, { tintColor: timerColor }]} />
          <Typography variant="subtitle" weight="bold" color={timerColor}>
            {formatTime(timeLeft)}
          </Typography>
        </View>

        {/* Word Card */}
        <View style={[styles.wordCard, { borderColor: journeyColor + '22' }]}>
          <Typography
            variant="h1"
            weight="bold"
            color={journeyDarkColor}
            textAlign="center"
            style={styles.wordText}>
            {currentWord?.word}
          </Typography>

          <Typography
            variant="bodySmall"
            color={Colors.textMid}
            textAlign="center"
            style={styles.wordTranslation}>
            {currentWord?.translation}
          </Typography>

          <View style={styles.inputRow}>
            <Pressable 
              style={[styles.speakerBtn, { backgroundColor: journeyColor + '22' }]} 
            >
              <Image source={icons.speaker} style={styles.speakerIcon} />
            </Pressable>
            <TextInput
              style={styles.textInput}
              value={answer}
              onChangeText={setAnswer}
              placeholder="Viết lại..."
              placeholderTextColor={Colors.textPlaceholder}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="done"
              onSubmitEditing={handleCheck}
            />
          </View>
        </View>

        {/* Check Button */}
        <Pressable
          style={[
            styles.checkBtn,
            { backgroundColor: isAnswerEmpty ? Colors.checkGreenDisabled : journeyColor }
          ]}
          disabled={isAnswerEmpty}
          android_ripple={{ color: 'rgba(0,0,0,0.1)' }}
        >
          <View style={styles.checkBtnContent}>
            <Image source={icons.check} style={styles.checkBtnIcon} />
            <Typography variant="subtitle" weight="bold" color={Colors.white} style={styles.checkBtnText}>
              KIỂM TRA
            </Typography>
          </View>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default ConquestScreen;
