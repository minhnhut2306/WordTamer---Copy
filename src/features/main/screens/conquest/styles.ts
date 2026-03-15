import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '@/theme/colors';

const { width, height } = Dimensions.get('window');

// ─── Styles ───────────────────────────────────────────────────────────────────
export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.bgPage },

  // Header
  header: {
    paddingHorizontal: 18, paddingTop: 10, paddingBottom: 36,
    zIndex: 2,
  },
  statsRow: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', marginBottom: 16,
  },
  backBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.22)',
  },
  backIcon: { width: 18, height: 18 },
  comboRow: { flexDirection: 'row', gap: 8, alignItems: 'center' },
  comboBadge: {
    backgroundColor: Colors.goldSoft,
    borderRadius: 12, paddingHorizontal: 10, paddingVertical: 5,
    borderWidth: 1.5, borderColor: Colors.gold,
  },
  xpPill: {
    backgroundColor: 'rgba(245,158,11,0.2)',
    borderRadius: 12, paddingHorizontal: 10, paddingVertical: 5,
    borderWidth: 1, borderColor: Colors.gold + '55',
  },
  titleRow: { alignItems: 'center', marginBottom: 14 },
  eyebrow: { letterSpacing: 2.5, fontSize: 10, marginBottom: 4 },
  journeyName: { letterSpacing: 2 },
  progRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  progTrack: { flex: 1, height: 7, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 4, overflow: 'hidden' },
  progFill: { height: '100%', backgroundColor: Colors.gold, borderRadius: 4 },

  // Mystery card (overlaps header)
  mystCard: {
    marginHorizontal: 16,
    marginTop: -22,
    backgroundColor: Colors.white,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: Colors.borderPurple,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    zIndex: 5,
    shadowColor: Colors.purple600,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.18,
    shadowRadius: 18,
    elevation: 10,
  },
  mystSilZone: {
    width: 58, height: 58,
    alignItems: 'center', justifyContent: 'center',
    position: 'relative',
  },
  mystSilInner: {
    width: 48, height: 48, borderRadius: 16,
    backgroundColor: Colors.purple100,
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 2, borderColor: Colors.purple200,
    zIndex: 1,
  },
  mystSilIcon: { fontSize: 24 },
  mystPulse1: {
    position: 'absolute', width: 56, height: 56, borderRadius: 20,
    borderWidth: 1.5, borderColor: Colors.purple300, opacity: 0.4,
  },
  mystPulse2: {
    position: 'absolute', width: 64, height: 64, borderRadius: 24,
    borderWidth: 1, borderColor: Colors.purple300, opacity: 0.2,
  },
  mystTagRow: { marginBottom: 4 },
  mystTag: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.goldSoft,
    borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2,
    borderWidth: 1, borderColor: Colors.gold + '55',
  },
  navPill: { flex: 1, maxWidth: 24, height: 5, borderRadius: 3 },

  // Content
  content: {
    flex: 1, paddingHorizontal: 16, paddingTop: 14,
    gap: 12,
  },

  // Timer
  timerRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  timerIconBox: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: Colors.purple100,
    alignItems: 'center', justifyContent: 'center',
  },
  timerIcon: { width: 16, height: 16 },
  timerDigits: { letterSpacing: 2, minWidth: 68 },
  timerTrack: { flex: 1, height: 5, backgroundColor: Colors.purple100, borderRadius: 3, overflow: 'hidden' },
  timerFill: { height: '100%', borderRadius: 3 },

  // Word card
  wordCard: {
    backgroundColor: Colors.white,
    borderRadius: 24,
    borderWidth: 1.5,
    borderColor: Colors.borderPurple,
    paddingVertical: 18, paddingHorizontal: 18,
    flex: 1,
    position: 'relative', overflow: 'hidden',
    shadowColor: Colors.purple500,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1, shadowRadius: 14, elevation: 5,
  },
  cardBlob1: {
    position: 'absolute', top: -40, right: -40,
    width: 110, height: 110, borderRadius: 55,
    backgroundColor: Colors.purple100, opacity: 0.6,
  },
  cardBlob2: {
    position: 'absolute', bottom: -30, left: -30,
    width: 80, height: 80, borderRadius: 40,
    backgroundColor: Colors.pinkSoft, opacity: 0.4,
  },

  memRow: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between', marginBottom: 14,
    position: 'relative', zIndex: 1,
  },
  memEyebrow: {
    fontSize: 9, letterSpacing: 2, marginBottom: 5,
  },
  memDot: { width: 11, height: 11, borderRadius: 6 },
  memBadge: {
    borderRadius: 8, paddingHorizontal: 8, paddingVertical: 3,
  },

  wordCenter: { alignItems: 'center', flex: 1, justifyContent: 'center', position: 'relative', zIndex: 1 },
  wordMain: { textAlign: 'center', letterSpacing: 0.5, marginBottom: 4 },
  wordPhonetic: { textAlign: 'center', fontStyle: 'italic', marginBottom: 16 },
  soundBtn: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: Colors.purple100,
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 8,
  },
  soundIcon: { width: 18, height: 18 },

  inputRow: {
    borderBottomWidth: 2, borderBottomColor: Colors.purple200,
    paddingBottom: 6, position: 'relative', zIndex: 1,
  },
  textInput: {
    fontSize: 16, fontFamily: 'Roboto-Regular',
    color: Colors.textDark, paddingVertical: 6,
    textAlign: 'center',
  },

  // CTA button
  ctaBtn: {
    height: 56, borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center', justifyContent: 'center', gap: 8,
    shadowColor: Colors.purple700,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4, shadowRadius: 14, elevation: 7,
  },
  ctaIcon: { width: 20, height: 20 },
  ctaText: { letterSpacing: 1.5 },

  // Result overlay
  overlayBg: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(30,11,94,0.92)',
    zIndex: 20,
    alignItems: 'center', justifyContent: 'center',
    padding: 24,
  },
  overlayCard: {
    width: '100%', borderRadius: 28,
    padding: 28, alignItems: 'center',
    shadowColor: Colors.purple900,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5, shadowRadius: 20, elevation: 10,
  },
  overlayEmoji: { fontSize: 72, marginBottom: 12 },
  overlayMsg: { textAlign: 'center', marginBottom: 16, letterSpacing: 0.5 },
  xpBadge: {
    backgroundColor: 'rgba(245,158,11,0.2)',
    borderRadius: 14, paddingHorizontal: 16, paddingVertical: 8,
    borderWidth: 1.5, borderColor: Colors.gold + '66',
    marginBottom: 20,
  },
  wrongAnswerBox: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 14, padding: 14,
    alignItems: 'center', marginBottom: 20, width: '100%',
  },
  nextBtn: {
    backgroundColor: Colors.white,
    borderRadius: 20, paddingHorizontal: 32, paddingVertical: 14,
    shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15, shadowRadius: 8, elevation: 5,
  },
});