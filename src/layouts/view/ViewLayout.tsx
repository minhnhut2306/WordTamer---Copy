import {
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import React, { ReactNode } from 'react';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { Header } from '@/components/header/Header';
import { Colors } from '@/theme/colors';
import { styles } from './styles';

type Props = {
  children: ReactNode;
  footer?: ReactNode;
  background?: string;
  title?: string;
  showBack?: boolean;
  rightComponent?: React.ReactNode;
  backTo?: () => void;
};

const Viewlayout = ({
  children,
  background,
  footer,
  backTo,
  rightComponent,
  showBack,
  title,
}: Props) => {
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={insets.top}
      style={styles.keyboard}
    >
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        accessible={true}
        style={styles.touchable}
      >
        <SafeAreaView
          edges={['top']}
          style={[styles.safeArea, { backgroundColor: background || Colors.white }]}
        >
          <Header
            backTo={backTo}
            rightComponent={rightComponent}
            showBack={showBack}
            title={title}
          />
          <View
            style={[
              styles.container,
              { paddingBottom: Platform.OS === 'ios' ? 0 : insets.bottom },
            ]}
          >
            <View style={styles.children}>{children}</View>
            {footer && <View style={styles.footer}>{footer}</View>}
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Viewlayout;
