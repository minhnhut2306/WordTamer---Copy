import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from '@/theme/colors';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bgPeach,
  },
  dotBackground: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 0,
  },
  dotRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 7,
  },
  dot: {
    width: 3,
    height: 3,
    borderRadius: 1.5,
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
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  backIcon: {
    width: 20,
    height: 20,
  },

  content: {
    flex: 1,
    paddingHorizontal: 16,
    zIndex: 1,
  },

  // Progress Bar
  progressBar: {
    height: 4,
    backgroundColor: Colors.white,
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 8,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 1,
  },
  progressFill: {
    height: '100%',
    backgroundColor: Colors.pink,
    borderRadius: 2,
  },
  progressLabel: {
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: 0.5,
  },

  // Instruction
  instruction: {
    textAlign: 'center',
    fontStyle: 'italic',
    marginBottom: 16,
    zIndex: 1,
  },

  // Timer
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    zIndex: 1,
  },
  timerIcon: {
    width: 20,
    height: 20,
    marginRight: 6,
  },

  // Word Card
  wordCard: {
    backgroundColor: Colors.white,
    borderRadius: 20,
    borderWidth: 1,
    paddingVertical: 28,
    paddingHorizontal: 20,
    marginBottom: 20,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 5,
    zIndex: 1,
  },
  wordTranslation: {
    marginBottom: 20,
    fontStyle: 'italic',
  },
  wordText: {
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 16,
  },
  speakerBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  speakerIcon: {
    width: 22,
    height: 22,
  },
  textInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: Colors.textGray,
    fontFamily: 'Roboto-Regular',
    borderBottomWidth: 1.5,
    borderBottomColor: Colors.inputBorder,
    paddingHorizontal: 4,
  },

  // Check Button
  checkBtn: {
    borderRadius: 28,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    zIndex: 1,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  checkBtnContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkBtnIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
    tintColor: Colors.white,
  },
  checkBtnText: {
    letterSpacing: 1,
  },
});
