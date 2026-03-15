import {
  View,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  ScrollView,
  RefreshControl,
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
  rightComponent?: ReactNode;
  backTo?: () => void;
  onRefresh?: () => void;
  refreshing?: boolean;
};

const ScrollViewLayout = ({
  children,
  background,
  footer,
  backTo,
  rightComponent,
  showBack,
  title,
  onRefresh,
  refreshing = false,
}: Props) => {
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      style={styles.keyboard}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={insets.top}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <SafeAreaView
          edges={['top']}
          style={[styles.safeArea, { backgroundColor: background || Colors.white }]}
        >
          <Header
            title={title}
            showBack={showBack}
            backTo={backTo}
            rightComponent={rightComponent}
          />

          <View
            style={[
              styles.container,
              { paddingBottom: Platform.OS === 'ios' ? 0 : insets.bottom },
            ]}
          >
            <ScrollView
              style={styles.children}
              contentContainerStyle={{ flexGrow: 1 }}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              refreshControl={
                onRefresh ? (
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    colors={['blue']}
                    tintColor="blue"
                  />
                ) : undefined
              }
            >
              {children}
            </ScrollView>

            {footer && <View style={styles.footer}>{footer}</View>}
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ScrollViewLayout;
