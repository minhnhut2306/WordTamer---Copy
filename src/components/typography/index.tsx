import React from 'react';
import { Text } from 'react-native';
import { TypographyProps } from './typography.types';
import { TYPOGRAPHY_VARIANTS, FONT_FAMILY } from './typography.config';
import { Colors } from '@/theme/colors';

export const Typography: React.FC<TypographyProps> = ({
  variant = 'body',
  weight = 'regular',
  color = Colors.black,
  textAlign = 'left',
  style,
  id,
  children,
}) => {
  return (
    <Text
      key={id}
      style={[
        TYPOGRAPHY_VARIANTS[variant],
        {
          fontFamily: FONT_FAMILY[weight],
          color,
          textAlign,
        },
        style,
      ]}
    >
      {children}
    </Text>
  );
};
