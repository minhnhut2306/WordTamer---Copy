import React, { memo } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  ViewStyle,
  TextStyle,
  StyleProp,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Typography } from '../typography';
import { styles } from './styles';

type Props = {
  title?: string;
  titleStyle?: StyleProp<TextStyle>;
  showBack?: boolean;
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  backTo?: () => void;
};

export const Header = memo(
  ({ title, titleStyle, showBack = true, leftComponent, rightComponent, style, backTo }: Props) => {
    const navigation = useNavigation();

    const back = () => {
      if (backTo) return backTo();
      return navigation.goBack();
    };

    return (
      <View style={[styles.container, style]}>
        <View style={styles.left}>
          {leftComponent
            ? leftComponent
            : showBack && (
                <TouchableOpacity onPress={back}>
                  <Image
                    source={require('@/assets/icons/back.png')}
                    style={{ width: 20, height: 20, tintColor: '#fff' } as any}
                  />
                </TouchableOpacity>
              )}
        </View>

        <View style={styles.center}>
          <Typography children={title} variant="subtitle" style={titleStyle} />
        </View>

        <View style={styles.right}>{rightComponent}</View>
      </View>
    );
  },
);