import { Colors } from '@/theme/colors';

// ─── Types ────────────────────────────────────────────────────────────────────
export type JourneyState = 'active' | 'locked' | 'completed';

export interface JourneyItem {
  id: string;
  name: string;
  subtitle: string;
  progress: number;
  total: number;
  color: string;
  softColor: string;
  darkColor: string;
  state: JourneyState;
  badge: string;
  badgeEmoji: any;
  petReward: any;
  petName: string;
  // Mystery pet — silhouette hint shown before unlock
  mysteryHint: string; // emoji hint shown progressively: '?', '🐾', '👁', revealed
}

export interface WordItem {
  id: string;
  word: string;
  translation: string;
  phonetic: string;          // e.g. /ˈstеɪʃ(ə)n/
  partOfSpeech: string;      // e.g. 'danh từ'
  completed: boolean;
  memoryLevel: number;       // 0–5: 0=new, 5=mastered (drives dot display)
}

export type MemoryLabel = 'Mới học' | 'Đang học' | 'Thành thạo';
export const getMemoryLabel = (level: number): MemoryLabel => {
  if (level === 0) return 'Mới học';
  if (level >= 4)  return 'Thành thạo';
  return 'Đang học';
};

// ─── Journey list ─────────────────────────────────────────────────────────────
export const JOURNEYS: JourneyItem[] = [
  {
    id: 'station',
    name: 'STATION',
    subtitle: 'Nhà ga & hành trình',
    progress: 4,
    total: 10,
    color: Colors.stationColor,
    softColor: Colors.stationSoft,
    darkColor: Colors.stationDark,
    state: 'active',
    badge: 'ĐANG MỞ',
    badgeEmoji: require('@/assets/icons/sparkle.png'),
    petReward: require('@/assets/icons/pet01.png'),
    petName: 'Mèo Đêm',
    mysteryHint: '🐱',
  },
  {
    id: 'kitchen',
    name: 'KITCHEN',
    subtitle: 'Phòng bếp & ẩm thực',
    progress: 0,
    total: 10,
    color: Colors.kitchenColor,
    softColor: Colors.kitchenSoft,
    darkColor: Colors.kitchenDark,
    state: 'active',
    badge: 'BÍ ẨN',
    badgeEmoji: require('@/assets/icons/mystery.png'),
    petReward: require('@/assets/icons/pet02.png'),
    petName: 'Cáo Lửa',
    mysteryHint: '🦊',
  },
  {
    id: 'forest',
    name: 'FOREST',
    subtitle: 'Thiên nhiên hoang dã',
    progress: 10,
    total: 10,
    color: Colors.forestColor,
    softColor: Colors.forestSoft,
    darkColor: Colors.forestDark,
    state: 'completed',
    badge: 'HOÀN THÀNH',
    badgeEmoji: require('@/assets/icons/star.png'),
    petReward: require('@/assets/icons/pet03.png'),
    petName: 'Sói Băng',
    mysteryHint: '🐺',
  },
];

// ─── Words per journey ────────────────────────────────────────────────────────
export const WORDS_BY_JOURNEY: Record<string, WordItem[]> = {
  station: [
    { id: '1',  word: 'Station',   translation: 'Nhà ga',      phonetic: '/ˈsteɪʃ(ə)n/', partOfSpeech: 'danh từ', completed: true,  memoryLevel: 5 },
    { id: '2',  word: 'Ticket',    translation: 'Vé tàu',      phonetic: '/ˈtɪkɪt/',      partOfSpeech: 'danh từ', completed: true,  memoryLevel: 4 },
    { id: '3',  word: 'Platform',  translation: 'Sân ga',      phonetic: '/ˈplatfɔːm/',   partOfSpeech: 'danh từ', completed: true,  memoryLevel: 3 },
    { id: '4',  word: 'Train',     translation: 'Tàu hỏa',    phonetic: '/treɪn/',        partOfSpeech: 'danh từ', completed: true,  memoryLevel: 5 },
    { id: '5',  word: 'Luggage',   translation: 'Hành lý',    phonetic: '/ˈlʌɡɪdʒ/',     partOfSpeech: 'danh từ', completed: false, memoryLevel: 0 },
    { id: '6',  word: 'Departure', translation: 'Khởi hành',  phonetic: '/dɪˈpɑːtʃə/',   partOfSpeech: 'danh từ', completed: false, memoryLevel: 1 },
    { id: '7',  word: 'Arrival',   translation: 'Đến nơi',    phonetic: '/əˈraɪv(ə)l/',  partOfSpeech: 'danh từ', completed: false, memoryLevel: 2 },
    { id: '8',  word: 'Conductor', translation: 'Nhân viên',  phonetic: '/kənˈdʌktə/',   partOfSpeech: 'danh từ', completed: false, memoryLevel: 0 },
    { id: '9',  word: 'Delay',     translation: 'Trễ giờ',    phonetic: '/dɪˈleɪ/',      partOfSpeech: 'danh từ', completed: false, memoryLevel: 1 },
    { id: '10', word: 'Express',   translation: 'Tốc hành',   phonetic: '/ɪkˈsprɛs/',    partOfSpeech: 'tính từ', completed: false, memoryLevel: 3 },
  ],
};