import { StyleSheet } from 'react-native';
import { Colors } from '@/theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgPage,
  },

  // Header
  header: {
    paddingHorizontal: 18,
    paddingBottom: 36,
    zIndex: 2,
    backgroundColor: Colors.purple800,
  },
  headerInner: {
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
    paddingHorizontal: 0,
  },
  progTrack: {
    flex: 1,
    height: 6,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progFill: {
    height: '100%',
    backgroundColor: Colors.gold,
    borderRadius: 3,
  },

  // Mystery card
  mystCard: {
    marginHorizontal: 16,
    marginTop: -20,
    backgroundColor: Colors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: Colors.borderPurple,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 13,
    zIndex: 5,
    shadowColor: Colors.purple700,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 8,
  },
  navDot: {
    flex: 1,
    maxWidth: 22,
    height: 4,
    borderRadius: 2,
  },

  // Content scroll
  content: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 24,
    gap: 12,
  },

  // Timer
  timerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  timerTrack: {
    flex: 1,
    height: 5,
    backgroundColor: Colors.purple100,
    borderRadius: 3,
    overflow: 'hidden',
  },
  timerFill: {
    height: '100%',
    borderRadius: 3,
  },

  // Word card
  wordCard: {
    minHeight: 240,
    backgroundColor: Colors.white,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: Colors.borderPurple,
    padding: 18,
    shadowColor: Colors.purple500,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
    overflow: 'hidden',
  },
  cardBlob1: {
    position: 'absolute',
    top: -40,
    right: -40,
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: Colors.purple100,
    opacity: 0.6,
  },
  cardBlob2: {
    position: 'absolute',
    bottom: -30,
    left: -30,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.pinkSoft,
    opacity: 0.4,
  },
  memRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
    position: 'relative',
    zIndex: 1,
  },
  memBadge: {
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  memBadgeText: {
    fontSize: 10,
    fontWeight: '800',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginBottom: 14,
  },
  wordCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    zIndex: 1,
  },
  soundBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.purple100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputWrap: {
    marginTop: 16,
    borderBottomWidth: 2,
    borderBottomColor: Colors.purple200,
    paddingBottom: 6,
    position: 'relative',
    zIndex: 1,
  },
  input: {
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
    color: Colors.textDark,
    textAlign: 'center',
    paddingVertical: 4,
  },

  // CTA button
  ctaBtn: {
    height: 54,
    borderRadius: 27,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.purple700,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 14,
    elevation: 6,
  },
});

// ─── ResultOverlay styles ─────────────────────────────────────────────────────
export const overlayStyles = StyleSheet.create({
  bg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(20,5,40,0.88)',
    zIndex: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    width: '100%',
    borderRadius: 24,
    overflow: 'hidden',
  },
  strip: {
    height: 5,
    width: '100%',
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    marginTop: 4,
  },
  iconInner: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mystCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.bgMystery,
    borderWidth: 2,
    borderColor: Colors.purple400 + '72',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    marginBottom: 16,
    marginTop: 4,
  },
  mystText: {
    fontSize: 16,
    fontWeight: '900',
    color: Colors.textPlaceholder,
    letterSpacing: 2,
  },
  xpRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 20,
  },
  wrongCard: {
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderRadius: 14,
    padding: 16,
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  nextBtn: {
    backgroundColor: Colors.white,
    borderRadius: 18,
    paddingHorizontal: 36,
    paddingVertical: 14,
  },
});

// ─── ShakeTimerIcon styles ────────────────────────────────────────────────────
export const timerIconStyles = StyleSheet.create({
  iconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
});