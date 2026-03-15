import { StyleSheet } from 'react-native';
import { Colors } from '@/theme/colors';

export const styles = StyleSheet.create({
  container: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderColor: Colors.borderLight,
  },

  left: {
    width: 60,
  },

  center: {
    flex: 1,
    alignItems: 'center',
  },

  right: {
    width: 60,
    alignItems: 'flex-end',
  },

  title: {
    fontSize: 18,
    fontWeight: '600',
  },

  back: {
    fontSize: 16,
  },
});
