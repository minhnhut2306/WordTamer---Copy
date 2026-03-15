import { StyleSheet } from 'react-native';
import { FONT_FAMILY } from '../../typography/typography.config';

export const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  viewInput: {
    height: 48,
    borderRadius: 48,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 16,
  },
  forcus: {
    borderColor: 'blue'
  },
  error: {
    borderColor: 'red'
  },
  uneditable: {
    opacity: 0.6,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: FONT_FAMILY.regular,
    lineHeight: 20,
  },
  btnClear:{
    padding: 12
  }
});
