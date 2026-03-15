import { StyleSheet } from 'react-native';
import { Colors } from '@/theme/colors';

export const detailStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgPeach,
  },

  // --- Dotted background ---
  dotBackground: {
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    zIndex: 0,
  },
  dotRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 7,
  },
  dot: {
    width: 3, height: 3, borderRadius: 1.5,
    backgroundColor: Colors.pinkDot,
  },

  statsHeader: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    paddingHorizontal: 12,
    height: 60,
  },

  titleHeader: {
    height: 56,
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  backIcon: { width: 20, height: 20 },
  titlePill: {
    flex: 1,
    height: 42,
    borderRadius: 21,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 8,
  },
  titlePillText: { letterSpacing: 2 },

  scroll: { flex: 1, zIndex: 1 },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 12,
    gap: 16,
  },

  goalCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    borderWidth: 2,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  goalPetWrap: {
    width: 72, height: 72, borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  goalPetImg: { width: 48, height: 48 },
  goalPetLabel: {},
  goalInfo: { flex: 1, gap: 6 },
  goalBadge: {
    alignSelf: 'flex-start',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  goalMsg: { marginTop: 2 },
  goalTrack: {
    height: 8, borderRadius: 4,
    backgroundColor: Colors.trackBeige,
    overflow: 'hidden',
  },
  goalFill: {
    height: 8, borderRadius: 4,
  },

  wordList: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  wordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.rowDivider,
  },
  speakerBtn: {
    width: 44, height: 44, borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  speakerIcon: { width: 18, height: 18 },
  wordText: { flex: 1, gap: 2 },
  checkCircle: {
    width: 28, height: 28, borderRadius: 14,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkIcon: { width: 14, height: 14 },

  bottomBar: {
    position: 'absolute',
    bottom: 0, left: 0, right: 0,
    paddingHorizontal: 16,
    paddingBottom: 24,
    paddingTop: 8,
    backgroundColor: 'transparent',
    zIndex: 1,
  },
  ctaBtn: {
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  ctaText: { letterSpacing: 1 },
});