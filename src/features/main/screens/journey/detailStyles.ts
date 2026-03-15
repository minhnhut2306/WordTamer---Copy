import { StyleSheet } from 'react-native';
import { Colors } from '@/theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  // Header
  header: {
    backgroundColor: Colors.purple800,
    borderBottomWidth: 0,
  },
  headerStrip: {
    height: 32,
    backgroundColor: Colors.purple800,
  },

  // Scroll
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    gap: 16,
    paddingBottom: 16,
  },
  sectionLabel: {
    letterSpacing: 2,
  },

  // Mystery card — overlaps header
  mystCard: {
    borderRadius: 22,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginTop: -24,
    backgroundColor: Colors.purple800,
    shadowColor: Colors.purple900,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 8,
  },
  progTrack: {
    height: 5,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progFill: {
    height: '100%',
    backgroundColor: Colors.gold,
    borderRadius: 3,
  },

  // Word list
  wordList: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1.5,
    borderColor: Colors.purple100,
    shadowColor: Colors.purple500,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
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
    borderBottomColor: Colors.purple50,
  },
  speakerBtn: {
    width: 34,
    height: 34,
    borderRadius: 10,
    backgroundColor: Colors.purple100,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  // Bottom bar
  bottomBar: {
    paddingHorizontal: 16,
    paddingBottom: 28,
    paddingTop: 12,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderColor: Colors.purple100,
  },
  ctaBtn: {
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.purple700,
    shadowColor: Colors.purple900,
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  checkCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
});