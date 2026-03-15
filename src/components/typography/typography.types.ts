import { ReactNode } from "react";
import { StyleProp, TextStyle } from "react-native";

export type Variant =
  | 'h1'
  | 'h2'
  | 'title'
  | 'subtitle'
  | 'body'
  | 'bodySmall'
  | 'caption';

export type Weight = 'regular' | 'medium' | 'bold';

export type TextAlign = 'left' | 'right' | 'center';

export interface TypographyProps {
  variant?: Variant;
  weight?: Weight;
  color?: string;
  textAlign?: TextAlign;
  style?: StyleProp<TextStyle>;
  id?: string;
  children: ReactNode;
}
