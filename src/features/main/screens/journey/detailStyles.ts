import { StyleSheet } from 'react-native';
import { Colors } from '@/theme/colors';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bgPage },

  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 16, height: 56,
    borderBottomWidth: 1, borderColor: Colors.borderLight,
  },
  headerTitle: { letterSpacing: 2 },
  backBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: Colors.purple100,
    alignItems: 'center', justifyContent: 'center',
  },
  backIcon: { width: 18, height: 18 },

  statsRow: {
    paddingHorizontal: 16, paddingVertical: 8,
  },

  scroll: { flex: 1 },
  scrollContent: { paddingHorizontal: 16, paddingTop: 16, gap: 16 },

  sectionLabel: { letterSpacing: 2, marginTop: 4 },

  // Mystery card
  mystCard: {
    borderRadius: 22, padding: 16,
    flexDirection: 'row', alignItems: 'center', gap: 14,
    shadowColor: Colors.purple700,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35, shadowRadius: 16, elevation: 8,
  },
  mystSilBox: {
    width: 66, height: 66, alignItems: 'center', justifyContent: 'center',
    position: 'relative',
  },
  mystSilInner: {
    width: 54, height: 54, borderRadius: 27,
    backgroundColor: 'rgba(196,181,253,0.2)',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1.5, borderColor: 'rgba(196,181,253,0.3)',
    zIndex: 1,
  },
  mystSilQ: { fontSize: 24, fontWeight: '900', color: 'rgba(255,255,255,0.35)' },
  mystPetImg: { width: 38, height: 38 },
  mystRing: {
    position: 'absolute', width: 64, height: 64, borderRadius: 32,
    borderWidth: 1.5, borderColor: 'rgba(196,181,253,0.35)',
  },
  mystTagRow: { flexDirection: 'row', marginBottom: 4 },
  mystTag: {
    backgroundColor: 'rgba(245,158,11,0.2)',
    borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2,
    borderWidth: 1, borderColor: Colors.gold + '44',
  },
  mystProgTrack: {
    height: 6, backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 3, overflow: 'hidden',
  },
  mystProgFill: {
    height: '100%', backgroundColor: Colors.gold, borderRadius: 3,
  },

  // Word list
  wordList: {
    backgroundColor: Colors.white, borderRadius: 20, overflow: 'hidden',
    shadowColor: Colors.purple500,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08, shadowRadius: 10, elevation: 4,
    borderWidth: 1, borderColor: Colors.borderPurple,
  },
  wordRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: 14, paddingVertical: 14, gap: 12,
    borderBottomWidth: 1, borderBottomColor: Colors.borderLight,
  },
  speakerBtn: {
    width: 40, height: 40, borderRadius: 12,
    alignItems: 'center', justifyContent: 'center',
  },
  speakerIcon: { width: 16, height: 16 },
  memDot: {
    width: 9, height: 9, borderRadius: 5,
  },
  memLabel: {
    borderRadius: 6, paddingHorizontal: 6, paddingVertical: 2,
  },
  checkCircle: {
    width: 28, height: 28, borderRadius: 14,
    borderWidth: 2, alignItems: 'center', justifyContent: 'center',
  },
  checkIcon: { width: 12, height: 12 },

  // Bottom
  bottomBar: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    paddingHorizontal: 16, paddingBottom: 28, paddingTop: 12,
    backgroundColor: Colors.bgPage,
    borderTopWidth: 1, borderColor: Colors.borderPurple,
  },
  ctaBtn: {
    height: 54, borderRadius: 27,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: Colors.purple700,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4, shadowRadius: 12, elevation: 6,
  },
  ctaText: { letterSpacing: 1.5 },
});