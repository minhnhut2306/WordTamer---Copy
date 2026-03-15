import { StyleSheet } from 'react-native';
import { Colors } from '@/theme/colors';

export 
// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgPage,
  },

  // Header gradient
  headerGradient: {
    paddingTop: 8,
    paddingBottom: 24,
    paddingHorizontal: 18,
    zIndex: 2,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerTitleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  eyebrow: {
    letterSpacing: 2,
    fontSize: 10,
    marginBottom: 2,
  },
  headerTitle: {
    letterSpacing: 1,
  },
  petAvatarOuter: {
    width: 52, height: 52, borderRadius: 26,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center', justifyContent: 'center',
    position: 'relative',
  },
  petAvatarInner: {
    width: 42, height: 42, borderRadius: 21,
    backgroundColor: Colors.purple100,
    alignItems: 'center', justifyContent: 'center',
    zIndex: 1,
  },
  petRing: {
    position: 'absolute', inset: -4,
    width: 60, height: 60, borderRadius: 30,
    borderWidth: 1.5, borderColor: 'rgba(196,181,253,0.4)',
  },
  petImg: { width: 30, height: 30 },
  xpBadge: {
    backgroundColor: 'rgba(245,158,11,0.2)',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: Colors.gold + '55',
  },

  // Grand mystery banner
  grandBanner: {
    marginHorizontal: 16,
    marginTop: -14,
    borderRadius: 22,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    zIndex: 3,
    shadowColor: Colors.purple700,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 8,
  },
  grandSilBox: {
    width: 70, height: 70,
    alignItems: 'center', justifyContent: 'center',
    position: 'relative',
  },
  grandSilInner: {
    width: 58, height: 58, borderRadius: 29,
    backgroundColor: 'rgba(196,181,253,0.2)',
    alignItems: 'center', justifyContent: 'center',
    borderWidth: 1.5, borderColor: 'rgba(196,181,253,0.3)',
    zIndex: 1,
  },
  grandSilQ: {
    fontSize: 28, fontWeight: '900', color: 'rgba(255,255,255,0.35)',
  },
  grandRing: {
    position: 'absolute',
    width: 66, height: 66, borderRadius: 33,
    borderWidth: 1.5, borderColor: 'rgba(196,181,253,0.3)',
  },
  grandTagRow: { flexDirection: 'row', marginBottom: 4 },
  grandTag: {
    backgroundColor: 'rgba(245,158,11,0.2)',
    borderRadius: 8, paddingHorizontal: 8, paddingVertical: 2,
    borderWidth: 1, borderColor: Colors.gold + '44',
  },
  grandProgTrack: {
    height: 6, backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 3, overflow: 'hidden',
  },
  grandProgFill: {
    height: '100%',
    backgroundColor: Colors.gold,
    borderRadius: 3,
  },

  // Divider
  divider: {
    flexDirection: 'row', alignItems: 'center',
    marginHorizontal: 20, marginVertical: 16,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: Colors.borderPurple },
  dividerDot: {
    width: 6, height: 6, borderRadius: 3,
    backgroundColor: Colors.purple300, marginHorizontal: 8,
  },

  sectionLabel: {
    letterSpacing: 2, marginHorizontal: 16, marginBottom: 12,
  },

  scroll: { flex: 1 },
  scrollContent: {
    paddingBottom: 36,
    gap: 14,
  },

  // Card
  card: {
    marginHorizontal: 16,
    borderRadius: 22,
    borderWidth: 1.5,
    overflow: 'hidden',
    shadowColor: Colors.purple700,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 14,
    elevation: 6,
  },
  cardTop: {
    flexDirection: 'row', alignItems: 'center',
    gap: 12, paddingVertical: 16, paddingHorizontal: 14,
    position: 'relative',
  },
  playBtn: {
    width: 46, height: 46, borderRadius: 23,
    alignItems: 'center', justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4, elevation: 3,
  },
  playIcon: { width: 18, height: 18 },
  cardName: { letterSpacing: 1.5, marginBottom: 2 },
  miniProgTrack: {
    marginTop: 6, height: 4,
    backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: 2, overflow: 'hidden',
  },
  miniProgFill: { height: '100%', borderRadius: 2 },

  cardSilBox: {
    width: 46, height: 46, borderRadius: 14,
    borderWidth: 1.5, alignItems: 'center', justifyContent: 'center',
    position: 'relative', overflow: 'hidden',
  },
  silRing: {
    position: 'absolute', inset: -3,
    width: 52, height: 52, borderRadius: 17,
    borderWidth: 1.5,
  },
  cardSilQ: { fontSize: 20, fontWeight: '900', color: 'rgba(0,0,0,0.25)' },
  cardSilHint: { fontSize: 20 },
  cardSilImg: { width: 30, height: 30 },
  lockedOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },

  cardBottom: {
    flexDirection: 'row', alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10, paddingHorizontal: 14,
  },
  petPreviewRow: {
    flexDirection: 'row', alignItems: 'center', gap: 6,
    backgroundColor: 'rgba(0,0,0,0.15)',
    borderRadius: 12, paddingHorizontal: 8, paddingVertical: 4,
  },
  petPreviewImg: { width: 18, height: 18 },
  badgePill: {
    borderRadius: 12, paddingHorizontal: 10, paddingVertical: 4,
  },
});