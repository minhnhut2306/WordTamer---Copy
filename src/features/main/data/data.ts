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
}

export interface WordItem {
  id: string;
  word: string;
  translation: string;
  completed: boolean;
}

// ─── Journey list ─────────────────────────────────────────────────────────────
export const JOURNEYS: JourneyItem[] = [
  {
    id: 'station',
    name: 'STATION',
    subtitle: 'Từ vựng cơ bản',
    progress: 4,
    total: 10,
    color: Colors.pink,
    softColor: Colors.pinkSoft,
    darkColor: Colors.stationDark,
    state: 'active',
    badge: 'ĐANG MỞ',
    badgeEmoji: require('@/assets/icons/sparkle.png'),
    petReward: require('@/assets/icons/pet01.png'),
    petName: 'Mèo Đêm',
  },
  {
    id: 'kitchen',
    name: 'KITCHEN',
    subtitle: 'Phòng bếp & ẩm thực',
    progress: 0,
    total: 10,
    color: Colors.purple,
    softColor: Colors.purpleSoft,
    darkColor: Colors.purpleDark,
    state: 'active',
    badge: 'BÍ ẨN',
    badgeEmoji: require('@/assets/icons/mystery.png'),
    petReward: require('@/assets/icons/pet02.png'),
    petName: 'Cáo Lửa',
  },
  {
    id: 'forest',
    name: 'FOREST',
    subtitle: 'Thiên nhiên hoang dã',
    progress: 10,
    total: 10,
    color: Colors.forest,
    softColor: Colors.forestSoft,
    darkColor: Colors.forestDark,
    state: 'completed',
    badge: 'HOÀN THÀNH',
    badgeEmoji: require('@/assets/icons/star.png'),
    petReward: require('@/assets/icons/pet03.png'),
    petName: 'Sói Băng',
  },
];

// ─── Words per journey ────────────────────────────────────────────────────────
export const WORDS_BY_JOURNEY: Record<string, WordItem[]> = {
  station: [
    { id: '1',  word: 'Station',    translation: 'Nhà ga',      completed: true },
    { id: '2',  word: 'Ticket',     translation: 'Vé tàu',      completed: true },
    { id: '3',  word: 'Platform',   translation: 'Sân ga',      completed: true },
    { id: '4',  word: 'Train',      translation: 'Tàu hỏa',     completed: true },
    { id: '5',  word: 'Luggage',    translation: 'Hành lý',     completed: false },
    { id: '6',  word: 'Departure',  translation: 'Khởi hành',   completed: false },
    { id: '7',  word: 'Arrival',    translation: 'Đến nơi',     completed: false },
    { id: '8',  word: 'Conductor',  translation: 'Nhân viên',   completed: false },
    { id: '9',  word: 'Delay',      translation: 'Trễ giờ',     completed: false },
    { id: '10', word: 'Express',    translation: 'Tốc hành',    completed: false },
  ],
};
