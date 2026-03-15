import { TextStyle } from 'react-native';
import { Variant } from './typography.types';

export const FONT_FAMILY = {
  regular: 'Roboto-Regular',
  medium: 'Roboto-Medium',
  bold: 'Roboto-Bold',
};

export const TYPOGRAPHY_VARIANTS: Record<Variant, TextStyle> = {
  h1: {
    fontSize: 32,
    lineHeight: 40,
  },
  h2: {
    fontSize: 28,
    lineHeight: 36,
  },
  title: {
    fontSize: 20,
    lineHeight: 28,
  },
  subtitle: {
    fontSize: 18,
    lineHeight: 24,
  },
  body: {
    fontSize: 16,
    lineHeight: 22,
  },
  bodySmall: {
    fontSize: 14,
    lineHeight: 20,
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
  },
};